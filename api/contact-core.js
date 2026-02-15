// Shared contact form logic (used by server.js, Netlify, and Vercel)

async function runContact(event) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        const { name, email, phone, country, message } = body;

        if (!name || !email || !country) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Missing required fields',
                    message: 'Name, email, and country are required.'
                })
            };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Invalid email format' })
            };
        }

        const recipientEmail = process.env.CONTACT_EMAIL || 'info@siciliabedda.com';
        const emailService = process.env.EMAIL_SERVICE || 'log';

        const emailSubject = `New Contact Form Submission from ${name}`;
        const emailBody = `
New contact form submission from Sicilia Bedda website:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Country: ${country}
Message: ${message || 'No message provided'}

---
Submitted: ${new Date().toISOString()}
        `.trim();

        let emailResult;

        if (emailService === 'sendgrid') {
            emailResult = await sendViaSendGrid(recipientEmail, emailSubject, emailBody, name, email);
        } else if (emailService === 'mailgun') {
            emailResult = await sendViaMailgun(recipientEmail, emailSubject, emailBody, name, email);
        } else if (emailService === 'smtp') {
            emailResult = await sendViaSMTP(recipientEmail, emailSubject, emailBody, name, email);
        } else if (emailService === 'webhook') {
            emailResult = await sendViaWebhook(recipientEmail, emailSubject, emailBody, body);
        } else {
            console.log('Email would be sent:', { to: recipientEmail, subject: emailSubject, body: emailBody });
            emailResult = { success: true, method: 'log' };
        }

        if (emailResult.success) {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Thank you for your message. We will get back to you soon!'
                })
            };
        }
        throw new Error(emailResult.error || 'Failed to send email');
    } catch (error) {
        console.error('Contact form error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: 'There was an error processing your request. Please try again later.'
            })
        };
    }
}

async function sendViaSendGrid(recipientEmail, subject, body, fromName, fromEmail) {
    const sgMail = require('@sendgrid/mail');
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) return { success: false, error: 'SendGrid API key not configured' };
    sgMail.setApiKey(apiKey);
    const msg = {
        to: recipientEmail,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@siciliabedda.com',
        replyTo: fromEmail,
        subject,
        text: body,
        html: body.replace(/\n/g, '<br>')
    };
    try {
        await sgMail.send(msg);
        return { success: true };
    } catch (error) {
        console.error('SendGrid error:', error);
        return { success: false, error: error.message };
    }
}

async function sendViaMailgun(recipientEmail, subject, body, fromName, fromEmail) {
    const formData = require('form-data');
    const Mailgun = require('mailgun.js');
    const apiKey = process.env.MAILGUN_API_KEY;
    const domain = process.env.MAILGUN_DOMAIN;
    if (!apiKey || !domain) return { success: false, error: 'Mailgun API key or domain not configured' };
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({ username: 'api', key: apiKey });
    const messageData = {
        from: process.env.MAILGUN_FROM_EMAIL || `Contact Form <noreply@${domain}>`,
        to: recipientEmail,
        subject,
        text: body,
        'h:Reply-To': fromEmail
    };
    try {
        await client.messages.create(domain, messageData);
        return { success: true };
    } catch (error) {
        console.error('Mailgun error:', error);
        return { success: false, error: error.message };
    }
}

async function sendViaSMTP(recipientEmail, subject, body, fromName, fromEmail) {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || `"${fromName}" <${process.env.SMTP_USER}>`,
            to: recipientEmail,
            replyTo: fromEmail,
            subject,
            text: body,
            html: body.replace(/\n/g, '<br>')
        });
        return { success: true };
    } catch (error) {
        console.error('SMTP error:', error);
        return { success: false, error: error.message };
    }
}

async function sendViaWebhook(recipientEmail, subject, body, formData) {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) return { success: false, error: 'Webhook URL not configured' };
    const https = require('https');
    const http = require('http');
    const url = require('url');
    return new Promise((resolve) => {
        const parsedUrl = url.parse(webhookUrl);
        const postData = JSON.stringify({
            recipientEmail,
            subject,
            body,
            formData,
            timestamp: new Date().toISOString()
        });
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? https : http;
        const options = {
            hostname: parsedUrl.hostname,
            port: parsedUrl.port || (isHttps ? 443 : 80),
            path: parsedUrl.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        const req = client.request(options, (res) => {
            let responseData = '';
            res.on('data', (chunk) => { responseData += chunk; });
            res.on('end', () => {
                resolve(res.statusCode >= 200 && res.statusCode < 300
                    ? { success: true }
                    : { success: false, error: `Webhook returned status ${res.statusCode}` });
            });
        });
        req.on('error', (error) => resolve({ success: false, error: error.message }));
        req.write(postData);
        req.end();
    });
}

module.exports = { runContact };
