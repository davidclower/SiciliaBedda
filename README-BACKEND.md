# Contact Form Backend Setup

This backend handles contact form submissions from the Sicilia Bedda website.

## Features

- Multiple email service support (SendGrid, Mailgun, SMTP, Webhook)
- Form validation
- CORS support
- Error handling
- Serverless function compatible

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your configuration:

```bash
cp .env.example .env
```

Edit `.env` with your email service credentials.

### 3. Choose Your Email Service

#### Option A: SendGrid (Recommended)

1. Sign up at [SendGrid](https://sendgrid.com/)
2. Create an API key
3. Verify your sender email
4. Set in `.env`:
   ```
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=your_api_key_here
   SENDGRID_FROM_EMAIL=noreply@siciliabedda.com
   CONTACT_EMAIL=info@siciliabedda.com
   ```

#### Option B: Mailgun

1. Sign up at [Mailgun](https://www.mailgun.com/)
2. Get your API key and domain
3. Set in `.env`:
   ```
   EMAIL_SERVICE=mailgun
   MAILGUN_API_KEY=your_api_key_here
   MAILGUN_DOMAIN=your_domain.com
   MAILGUN_FROM_EMAIL=noreply@your_domain.com
   CONTACT_EMAIL=info@siciliabedda.com
   ```

#### Option C: SMTP (Gmail, Outlook, etc.)

1. Get SMTP credentials from your email provider
2. For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833)
3. Set in `.env`:
   ```
   EMAIL_SERVICE=smtp
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   SMTP_FROM="Sicilia Bedda Contact Form" <noreply@siciliabedda.com>
   CONTACT_EMAIL=info@siciliabedda.com
   ```

#### Option D: Webhook (Zapier, Make.com, etc.)

1. Create a webhook in Zapier or Make.com
2. Set in `.env`:
   ```
   EMAIL_SERVICE=webhook
   WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/your_webhook_id
   CONTACT_EMAIL=info@siciliabedda.com
   ```

#### Option E: Development Mode (Logging only)

For local development without email service:
```
EMAIL_SERVICE=log
CONTACT_EMAIL=info@siciliabedda.com
```

### Payments (Stripe) – Support Our Cause

Donations and Heritage Collection orders on the Support Our Cause page use **Stripe Checkout** (hosted, PCI-compliant; card data never touches your server).

1. **Stripe account**: Sign up at [stripe.com](https://stripe.com) and get your **Secret key** (Dashboard → Developers → API keys). Use test keys (`sk_test_...`) for development.
2. **Environment**: In `.env` set:
   ```
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   ```
   For production, use your live key (`sk_live_...`) and optionally:
   ```
   BASE_URL=https://yoursite.com
   ```
3. **Install**: Run `npm install` so the `stripe` dependency is installed.
4. **Flow**: When a user clicks "Donate Now" or "Complete Order" (Heritage Collection), the site calls `POST /api/create-checkout-session` and redirects to Stripe’s payment page. After payment or cancel, Stripe redirects back to the Support page with a success or canceled message.
5. **Important**: Payments only work when the Support page is opened **through the server** (e.g. `http://localhost:3000/support-cause.html`). Opening `support-cause.html` directly as a file will not reach the API; start the server with `npm run dev` and use the URL above.

### 4. Local Development

Run the local development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/contact`

### 5. Deployment

#### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Set environment variables in Vercel dashboard

#### Netlify

1. Create `netlify/functions/contact.js` (copy from `api/contact.js`)
2. Deploy to Netlify
3. Set environment variables in Netlify dashboard

#### AWS Lambda

1. Package the function
2. Upload to Lambda
3. Set environment variables in Lambda configuration
4. Configure API Gateway

#### Other Platforms

The `api/contact.js` file is a standard serverless function that should work with most platforms.

## API Endpoint

**POST** `/api/contact`

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 555-1234",
  "country": "US",
  "message": "Hello, I'm interested in..."
}
```

### Response

**Success (200):**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!"
}
```

**Error (400/500):**
```json
{
  "error": "Error message",
  "message": "User-friendly error message"
}
```

## Frontend Configuration

Update the `API_ENDPOINT` in `contact.html` to match your deployment:

```javascript
const API_ENDPOINT = '/api/contact'; // For same-domain deployment
// or
const API_ENDPOINT = 'https://your-api-domain.com/api/contact'; // For separate API
```

## Testing

Test the API locally:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "country": "US",
    "message": "Test message"
  }'
```

## Security Notes

- Never commit `.env` file to git
- Use environment variables for all sensitive data
- Consider adding rate limiting for production
- Add CAPTCHA for spam protection if needed
- Validate and sanitize all inputs
