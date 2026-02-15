// Vercel serverless function for Stripe Checkout
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { items, currency, customerEmail, customerName, customerPhone, billingAddress, shippingAddress, recipientName, note } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Items array is required' });
        }

        if (!currency) {
            return res.status(400).json({ error: 'Currency is required' });
        }

        // Build line items for Stripe
        const lineItems = [];
        let totalAmount = 0;

        items.forEach(item => {
            if (item.type === 'collection') {
                const unitAmount = Math.round(item.eurAmount * 100); // Convert to cents
                const quantity = item.quantity || 1;
                
                lineItems.push({
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: item.displayName || `Heritage Collection ${item.id}`,
                            description: `Heritage Collection – Sicilia Bedda`,
                        },
                        unit_amount: currency.toLowerCase() === 'usd' 
                            ? Math.round(unitAmount * (parseFloat(process.env.EUR_TO_USD_RATE) || 1.08))
                            : unitAmount,
                    },
                    quantity: quantity,
                });
                
                totalAmount += item.eurAmount * quantity;
            } else if (item.type === 'donation') {
                const unitAmount = Math.round(item.eurAmount * 100); // Convert to cents
                
                lineItems.push({
                    price_data: {
                        currency: currency.toLowerCase(),
                        product_data: {
                            name: `${item.displayName || 'Donation'} – Sicilia Bedda`,
                            description: `Donation to support restoration work in Sicilian villages`,
                        },
                        unit_amount: currency.toLowerCase() === 'usd'
                            ? Math.round(unitAmount * (parseFloat(process.env.EUR_TO_USD_RATE) || 1.08))
                            : unitAmount,
                    },
                    quantity: 1,
                });
                
                totalAmount += item.eurAmount;
            }
        });

        if (lineItems.length === 0) {
            return res.status(400).json({ error: 'No valid items to process' });
        }

        // Build metadata for order tracking
        const metadata = {
            orderType: items.length > 1 ? 'cart' : (items[0].type === 'collection' ? 'collection' : 'donation'),
            itemCount: items.length.toString(),
        };

        // Add collection IDs and donation levels to metadata
        const collectionIds = items.filter(i => i.type === 'collection').map(i => i.id).join(',');
        const donationLevels = items.filter(i => i.type === 'donation').map(i => i.level).join(',');
        
        if (collectionIds) metadata.collectionIds = collectionIds;
        if (donationLevels) metadata.donationLevels = donationLevels;
        if (recipientName) metadata.recipientName = recipientName;
        if (note) metadata.note = note.substring(0, 500); // Stripe metadata limit

        // Build customer data
        const customerData = {};
        if (customerEmail) customerData.email = customerEmail;
        if (customerName) customerData.name = customerName;
        if (customerPhone) customerData.phone = customerPhone;

        // Build shipping address if provided
        const shippingAddressData = shippingAddress || billingAddress;
        const shipping = shippingAddressData ? {
            address: {
                line1: shippingAddressData.address,
                city: shippingAddressData.city,
                state: shippingAddressData.state,
                postal_code: shippingAddressData.postal,
                country: shippingAddressData.country === 'United States' ? 'US' : 
                         (shippingAddressData.country === 'Italy' ? 'IT' : shippingAddressData.country),
            },
            name: customerName || 'Customer',
        } : undefined;

        // Get site URL from environment or request
        const siteUrl = process.env.SITE_URL || 
                       (req.headers.origin || `https://${req.headers.host}`);

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${siteUrl}/support-cause.html?success=1`,
            cancel_url: `${siteUrl}/support-cause.html?canceled=1`,
            customer_email: customerEmail,
            metadata: metadata,
            shipping: shipping,
            billing_address_collection: 'auto',
        });

        res.json({ url: session.url, sessionId: session.id });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        res.status(500).json({ 
            error: 'Failed to create checkout session',
            message: error.message 
        });
    }
};
