// Local development server for testing the contact API
// Run with: npm run dev

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Explicit route for Home page (so Home link always works)
const indexPath = path.join(__dirname, 'index.html');
app.get('/', (req, res) => res.sendFile(indexPath));
app.get('/index.html', (req, res) => res.sendFile(indexPath));

// Explicit routes for Support page (so it always loads)
const supportPath = path.join(__dirname, 'support-cause.html');
app.get('/support', (req, res) => res.sendFile(supportPath));
app.get('/support.html', (req, res) => res.sendFile(supportPath));
app.get('/support-cause', (req, res) => res.sendFile(supportPath));
app.get('/support-cause.html', (req, res) => res.sendFile(supportPath));

// Explicit routes for About page (so it always loads)
const aboutPath = path.join(__dirname, 'about.html');
app.get('/about', (req, res) => res.sendFile(aboutPath));
app.get('/about.html', (req, res) => res.sendFile(aboutPath));

// Explicit routes for Current Restorations page (filename has space)
const currentRestorationPath = path.join(__dirname, 'current-restoration 12.html');
app.get('/current-restoration', (req, res) => res.sendFile(currentRestorationPath));
app.get('/current-restoration.html', (req, res) => res.sendFile(currentRestorationPath));

// Serve static HTML, JS, CSS, and assets from current directory
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
