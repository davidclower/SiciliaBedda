// Contact form API – used by server.js (local) and Vercel (production)
const { runContact } = require('./contact-core');

// Vercel serverless: (req, res) handler
async function vercelHandler(req, res) {
    const event = {
        httpMethod: req.method,
        body: req.body ? JSON.stringify(req.body) : '{}'
    };
    const result = await runContact(event);
    const headers = result.headers || {};
    Object.keys(headers).forEach((key) => res.setHeader(key, headers[key]));
    res.status(result.statusCode).send(result.body);
}

// server.js and Netlify use .handler(event, context)
vercelHandler.handler = async (event, context) => runContact(event);

module.exports = vercelHandler;
