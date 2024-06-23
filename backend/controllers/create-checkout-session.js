const { STRIPE_SECRET, DOMAIN_IP } = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()

router.post("/",async(req,res)=>{
    const {products} = req.body

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name: product.size ? `${product.name} (Size: ${product.size})` : product.name,
                images:[product.images[0].imageUrl],
            },
            unit_amount:Math.round(product.unitPrice*100)
        },
        quantity:product.quantity
    }))

    console.log(lineItems, 'lineItems')

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${DOMAIN_IP}/success`,
            cancel_url: `${DOMAIN_IP}/cancel`,
            automatic_tax: { enabled: true },
        });

        console.log(session, 'session');
        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router