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
    const { email } = JSON.parse(event.body || '{}');

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' }),
      };
    }

    // Email de test avec des données d'exemple
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
              <p>Bonjour Test Company,</p>
              
              <p>Nous avons bien reçu votre réservation. Voici les détails :</p>
              
              <div class="info-box">
                <h3 style="margin-top: 0; color: #ec4899;">Informations de Réservation</h3>
                <div class="info-row">
                  <span class="info-label">Entreprise :</span>
                  <span class="info-value">Test Company</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Email :</span>
                  <span class="info-value">${email}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Téléphone :</span>
                  <span class="info-value">+1234567890</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Nombre de participants :</span>
                  <span class="info-value">2</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Mode de paiement :</span>
                  <span class="info-value">Stripe (Paiement en ligne)</span>
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
                  <tr>
                    <td>1</td>
                    <td>Turquie</td>
                    <td>VIP</td>
                    <td>Mars</td>
                    <td>$4,000</td>
                    <td>$2,800</td>
                    <td>$1,200</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr class="total-row">
                    <td colspan="4" style="text-align: right;"><strong>Total :</strong></td>
                    <td><strong>$4,000</strong></td>
                    <td><strong>$2,800</strong></td>
                    <td><strong>$1,200</strong></td>
                  </tr>
                </tfoot>
              </table>

              <div class="info-box">
                <h3 style="margin-top: 0; color: #ec4899;">Prochaines Étapes</h3>
                <p>Votre paiement a été confirmé avec succès. Nous vous contacterons bientôt pour les détails de votre voyage.</p>
              </div>

              <div class="footer">
                <p>Merci de votre confiance !</p>
                <p>L'équipe Business Tours</p>
                <p style="font-size: 12px; margin-top: 20px;">
                  Si vous avez des questions, n'hésitez pas à nous contacter à l'adresse suivante : 
                  <a href="mailto:contact@businesstours.com" style="color: #ec4899;">contact@businesstours.com</a>
                </p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Business Tours <noreply@businesstours.com>',
      to: email,
      subject: 'Test - Confirmation de Réservation - Business Tours',
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
      body: JSON.stringify({ 
        success: true, 
        message: 'Email de test envoyé avec succès',
        messageId: data?.id 
      }),
    };
  } catch (error) {
    console.error('Error sending test email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};
