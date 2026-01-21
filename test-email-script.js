// Script de test pour envoyer un email de confirmation
// Utilisation: node test-email-script.js

const fetch = require('node-fetch');

async function testEmail() {
  const email = 'scongodiscovery18@gmail.com';
  
  // URL de la fonction Netlify
  // En local avec netlify dev: http://localhost:8888
  // En production: URL relative (vide = même origine)
  const functionsBase = process.env.VITE_FUNCTIONS_BASE || 'http://localhost:8888';
  const functionsUrl = `${functionsBase}/.netlify/functions/test-email`;
  
  console.log('Envoi d\'un email de test à:', email);
  console.log('URL de la fonction:', functionsUrl);
  
  try {
    const response = await fetch(functionsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('\n✅ Email envoyé avec succès !');
      console.log('Message ID:', data.messageId || 'N/A');
      console.log('Vérifiez la boîte de réception de', email);
    } else {
      console.error('\n❌ Erreur:', data.error || 'Erreur inconnue');
      if (data.details) {
        console.error('Détails:', JSON.stringify(data.details, null, 2));
      }
    }
  } catch (error) {
    console.error('\n❌ Erreur de connexion:', error.message);
    console.error('\nAssurez-vous que:');
    console.error('1. netlify dev est en cours d\'exécution (npx netlify dev)');
    console.error('2. Les variables d\'environnement RESEND_API_KEY et RESEND_FROM_EMAIL sont configurées');
  }
}

testEmail();
