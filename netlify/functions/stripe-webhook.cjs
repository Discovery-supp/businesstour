const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const signature = event.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return { statusCode: 400, body: 'Missing Stripe signature or webhook secret' };
  }

  const payload = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64')
    : Buffer.from(event.body || '', 'utf8');

  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err);
    return { statusCode: 400, body: 'Invalid signature' };
  }

  try {
    if (stripeEvent.type === 'payment_intent.succeeded') {
      const paymentIntent = stripeEvent.data.object;

      await supabase
        .from('bookings')
        .update({
          payment_status: 'succeeded',
          paid_at: new Date().toISOString(),
        })
        .eq('payment_intent_id', paymentIntent.id);
    }

    if (stripeEvent.type === 'payment_intent.payment_failed') {
      const paymentIntent = stripeEvent.data.object;

      await supabase
        .from('bookings')
        .update({
          payment_status: 'failed',
        })
        .eq('payment_intent_id', paymentIntent.id);
    }

    return { statusCode: 200, body: 'ok' };
  } catch (err) {
    console.error('Stripe webhook handling failed:', err);
    return { statusCode: 500, body: 'Webhook handler failed' };
  }
};
