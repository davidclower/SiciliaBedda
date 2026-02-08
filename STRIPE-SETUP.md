# Stripe Payment Setup Guide for Sicilia Bedda

This guide will help you set up Stripe payments for the Support Our Cause page, which handles both Heritage Collection purchases and Donations.

## Overview

The website uses Stripe Checkout to process payments. The shopping cart functionality allows customers to:
- Add multiple Heritage Collections to their cart
- Add donations to their cart
- Purchase everything in a single transaction

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Access to your website's environment variables (`.env` file for local development, Vercel dashboard for production)

## Step 1: Create a Stripe Account

1. Go to https://stripe.com and sign up for an account
2. Complete the account setup (business information, bank account, etc.)
3. Verify your email address

## Step 2: Get Your Stripe API Keys

### For Testing (Development)

1. Log into your Stripe Dashboard
2. Make sure you're in **Test mode** (toggle in the top right)
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_...`)
5. Copy your **Secret key** (starts with `sk_test_...`) - click "Reveal test key"

### For Production

1. Switch to **Live mode** in Stripe Dashboard (toggle in top right)
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_live_...`)
4. Copy your **Secret key** (starts with `sk_live_...`) - click "Reveal live key"

⚠️ **Important**: Never commit your secret keys to Git or expose them in client-side code!

## Step 3: Configure Environment Variables

### Local Development (.env file)

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Stripe keys:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_test_secret_key_here
   EUR_TO_USD_RATE=1.08
   SITE_URL=http://localhost:3000
   ```

   **Note**: 
   - Use `sk_test_...` for development/testing
   - Use `sk_live_...` for production
   - `EUR_TO_USD_RATE` is optional (defaults to 1.08 if not set)
   - `SITE_URL` is optional (defaults to request origin if not set)

### Production (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

   | Name | Value | Environment |
   |------|-------|-------------|
   | `STRIPE_SECRET_KEY` | `sk_live_your_live_secret_key` | Production |
   | `EUR_TO_USD_RATE` | `1.08` (optional) | Production |
   | `SITE_URL` | `https://siciliabedda.com` | Production |

4. Click **Save** for each variable

## Step 4: Test the Payment Flow

### Local Testing

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3000/support-cause.html

3. Test the shopping cart:
   - Click "Add to Cart" on a Heritage Collection
   - Click a donation level, then "Add Donation to Cart"
   - Click the cart icon (🛒) in the header to view your cart
   - Click "Proceed to Checkout"

4. Use Stripe test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - Use any future expiry date (e.g., 12/34)
   - Use any 3-digit CVC (e.g., 123)
   - Use any ZIP code (e.g., 12345)

### Production Testing

1. Deploy your changes to Vercel
2. Visit your live site
3. Test with a small real transaction first
4. Verify the payment appears in your Stripe Dashboard

## Step 5: Configure Stripe Webhooks (Optional but Recommended)

Webhooks allow Stripe to notify your server about payment events (success, failure, refunds, etc.).

### Set Up Webhook Endpoint

1. In Stripe Dashboard, go to **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL:
   - Local: Use a tool like [ngrok](https://ngrok.com) to expose `http://localhost:3000/api/stripe-webhook`
   - Production: `https://yourdomain.com/api/stripe-webhook`
4. Select events to listen to:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_...`)

### Add Webhook Secret to Environment Variables

Add to your `.env` (local) or Vercel (production):
```env
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_signing_secret
```

## Step 6: Verify Payment Processing

### Check Stripe Dashboard

1. Go to **Payments** in Stripe Dashboard
2. You should see test payments (in Test mode) or real payments (in Live mode)
3. Each payment will show:
   - Customer email
   - Amount
   - Payment method
   - Status

### Check Payment Metadata

Stripe stores metadata with each payment:
- `orderType`: "cart", "collection", or "donation"
- `itemCount`: Number of items in the order
- `collectionIds`: Comma-separated collection IDs (if any)
- `donationLevels`: Comma-separated donation levels (if any)
- `recipientName`: Name for personalization (if provided)
- `note`: Customer note (if provided, truncated to 500 chars)

## Troubleshooting

### "Server error. Is the server running? Is STRIPE_SECRET_KEY set in .env?"

- Make sure your `.env` file exists and contains `STRIPE_SECRET_KEY`
- Restart your development server after adding environment variables
- Check that the key starts with `sk_test_` (test) or `sk_live_` (production)

### "No checkout URL received"

- Check your Stripe API key is correct
- Verify you're using the right key for the environment (test vs live)
- Check browser console for detailed error messages

### Payments not appearing in Stripe Dashboard

- Make sure you're looking at the correct mode (Test vs Live)
- Check that the API key matches the mode
- Verify the payment was actually completed (check browser redirect)

### Cart not working

- Make sure `shopping-cart.js` is loaded (check browser console)
- Verify `support-cause.html` includes: `<script src="shopping-cart.js"></script>`
- Check that cart modal HTML exists in the page

## Security Best Practices

1. **Never expose secret keys**: Only use `STRIPE_SECRET_KEY` on the server side
2. **Use HTTPS in production**: Stripe requires HTTPS for live payments
3. **Validate webhook signatures**: Always verify webhook requests come from Stripe
4. **Keep keys secure**: Rotate keys if compromised, use environment variables
5. **Monitor your account**: Regularly check Stripe Dashboard for suspicious activity

## Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

## Support

If you encounter issues:
1. Check the browser console for JavaScript errors
2. Check server logs for backend errors
3. Review Stripe Dashboard → **Logs** for API errors
4. Contact Stripe support: https://support.stripe.com
