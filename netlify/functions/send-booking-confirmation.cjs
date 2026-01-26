const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const booking = JSON.parse(event.body || '{}');

    if (!booking.email || !booking.company_name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Construire les détails des tours
    let toursDetails = '';
    if (booking.is_multi_tour && booking.tours && booking.tours.length > 0) {
      toursDetails = booking.tours.map((tour, index) => {
        return `
          <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">${index + 1}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${tour.destination}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${tour.tour_type}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">${tour.month}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${tour.price?.toLocaleString() || 0}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${tour.amount_paid?.toLocaleString() || 0}</td>
            <td style="padding: 8px; border: 1px solid #ddd;">$${tour.remaining_amount?.toLocaleString() || 0}</td>
          </tr>
        `;
      }).join('');
    } else {
      toursDetails = `
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;">1</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${booking.destination || 'N/A'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${booking.tour_type || 'N/A'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">${booking.month || 'N/A'}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${booking.total_amount?.toLocaleString() || 0}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${booking.amount_paid?.toLocaleString() || 0}</td>
          <td style="padding: 8px; border: 1px solid #ddd;">$${booking.remaining_amount?.toLocaleString() || 0}</td>
        </tr>
      `;
    }

    const totalAmount = booking.is_multi_tour && booking.tours
      ? booking.tours.reduce((sum, tour) => sum + (tour.price || 0), 0)
      : booking.total_amount || 0;
    
    const totalPaid = booking.is_multi_tour && booking.tours
      ? booking.tours.reduce((sum, tour) => sum + (tour.amount_paid || 0), 0)
      : booking.amount_paid || 0;
    
    const totalRemaining = booking.is_multi_tour && booking.tours
      ? booking.tours.reduce((sum, tour) => sum + (tour.remaining_amount || 0), 0)
      : booking.remaining_amount || 0;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .info-box { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ec4899; }
            .info-row { margin: 10px 0; }
            .info-label { font-weight: bold; color: #6b7280; }
            .info-value { color: #111827; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; background: white; }
            th { background: #f3f4f6; padding: 12px; text-align: left; border: 1px solid #ddd; font-weight: bold; }
            td { padding: 8px; border: 1px solid #ddd; }
            .total-row { background: #f9fafb; font-weight: bold; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Confirmation de Réservation</h1>
              <p>Business Tours</p>
            </div>
            <div class="content">
              <p>Bonjour ${booking.company_name || 'Cher client'},</p>
              
              <p>Nous avons bien reçu votre réservation. Voici les détails :</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #ec4899;">Informations de Réservation</h3>
                <div class="info-row">
                  <span class="info-label">Entreprise :</span>
                  <span class="info-value">${booking.company_name || 'N/A'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email :</span>
                  <span class="info-value">${booking.email || 'N/A'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Téléphone :</span>
                  <span class="info-value">${booking.phone || 'N/A'}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Nombre de participants :</span>
                  <span class="info-value">${booking.num_participants || 1}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Mode de paiement :</span>
                  <span class="info-value">${booking.payment_method === 'cash' ? 'Cash' : 'Stripe (Paiement en ligne)'}</span>
                </div>
              </div>

              <h3 style="color: #ec4899;">Détails des Tours</h3>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Destination</th>
                    <th>Type</th>
                    <th>Mois</th>
                    <th>Prix Total</th>
                    <th>Payé (70%)</th>
                    <th>Reste (30%)</th>
                  </tr>
                </thead>
                <tbody>
                  ${toursDetails}
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="4" style="text-align: right;"><strong>Total :</strong></td>
                    <td><strong>$${totalAmount.toLocaleString()}</strong></td>
                    <td><strong>$${totalPaid.toLocaleString()}</strong></td>
                    <td><strong>$${totalRemaining.toLocaleString()}</strong></td>
                  </tr>
                </tfoot>
              </table>

              <div class="info-box">
                <h3 style="margin-top: 0; color: #ec4899;">Prochaines Étapes</h3>
                <p>${booking.payment_method === 'cash' 
                  ? 'Vous serez contacté prochainement pour finaliser le paiement en cash. La réservation sera confirmée après réception du paiement.' 
                  : booking.payment_status === 'succeeded' 
                    ? 'Votre paiement a été confirmé avec succès. Nous vous contacterons bientôt pour les détails de votre voyage.' 
                    : 'Votre réservation est en attente de confirmation. Nous vous contacterons sous peu.'}</p>
              </div>

              <div class="footer">
                <p>Merci de votre confiance !</p>
                <p>L'équipe Business Tours</p>
                <p style="font-size: 12px; margin-top: 20px;">
                  Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse suivante : 
                  <a href="mailto:contact@businesstours.org" style="color: #ec4899;">contact@businesstours.org</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Business Tours <noreply@businesstours.com>',
      to: booking.email,
      subject: 'Confirmation de Réservation - Business Tours',
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email', details: error }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: data?.id }),
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
