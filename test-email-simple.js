// Script de test simple pour envoyer un email
const https = require('https');
const http = require('http');

const email = 'scongodiscovery18@gmail.com';
const functionsUrl = 'http://localhost:8888/.netlify/functions/test-email';

console.log('🚀 Test d\'envoi d\'email à:', email);
console.log('📡 URL:', functionsUrl);
console.log('');

const data = JSON.stringify({ email });

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const protocol = functionsUrl.startsWith('https') ? https : http;
const url = new URL(functionsUrl);

const req = protocol.request(url, options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      
      if (res.statusCode === 200) {
        console.log('✅ SUCCÈS !');
        console.log('📧 Email envoyé avec succès');
        console.log('🆔 Message ID:', result.messageId || 'N/A');
        console.log('');
        console.log('Vérifiez la boîte de réception de', email);
        console.log('(y compris le dossier spam)');
      } else {
        console.log('❌ ERREUR:', res.statusCode);
        console.log('📄 Réponse:', JSON.stringify(result, null, 2));
      }
    } catch (e) {
      console.log('❌ Erreur de parsing:', e.message);
      console.log('📄 Réponse brute:', responseData);
    }
  });
});

req.on('error', (error) => {
  console.log('❌ ERREUR DE CONNEXION');
  console.log('💡 Assurez-vous que "netlify dev" est en cours d\'exécution');
  console.log('   Commande: npx netlify dev');
  console.log('');
  console.log('Détails:', error.message);
});

req.write(data);
req.end();
