// Local development server
// Run: npm run dev

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// Canonical pages - one file per page, clean URLs
const pages = [
  { file: 'index.html', routes: ['/', '/index.html'] },
  { file: 'about.html', routes: ['/about', '/about.html'] },
  { file: 'sicily.html', routes: ['/sicily', '/sicily.html'] },
  { file: 'parco-madonie.html', routes: ['/parco-madonie', '/parco-madonie.html'] },
  { file: 'isnello.html', routes: ['/isnello', '/isnello.html'] },
  { file: 'collesano.html', routes: ['/collesano', '/collesano.html'] },
  { file: 'castelbuono.html', routes: ['/castelbuono', '/castelbuono.html'] },
  { file: 'current-restoration.html', routes: ['/current-restoration', '/current-restoration.html'] },
  { file: 'support-cause.html', routes: ['/support', '/support-cause', '/support.html', '/support-cause.html'] },
  { file: 'contact.html', routes: ['/contact', '/contact.html'] }
];

pages.forEach(({ file, routes }) => {
  const filePath = path.join(__dirname, file);
  routes.forEach(route => app.get(route, (req, res) => res.sendFile(filePath)));
});

// Serve static files (images, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Import the contact handler and Stripe checkout
const contactHandler = require('./api/contact');
const stripeCheckout = require('./api/stripe-checkout');

// Stripe Checkout: create session for donations or Heritage Collection
app.post('/api/create-checkout-session', stripeCheckout.createCheckoutSession);

// Convert Express request to serverless function format
app.post('/api/contact', async (req, res) => {
    const event = {
        httpMethod: req.method,
        body: JSON.stringify(req.body),
        headers: req.headers
    };

    const context = {};

    try {
        const result = await contactHandler.handler(event, context);
        res.status(result.statusCode).set(result.headers).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Contact API server running on http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Contact endpoint: http://localhost:${PORT}/api/contact`);
});
