const { STRIPE_SECRET } = require('../util/config')
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()

router.post("/",async(req,res)=>{
    const {products} = req.body

    console.log(products, 'products')

    const lineItems = products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.productName,
                images:[product.productImage]
            },
            unit_amount:product.price
        },
        quantity:product.quantity
    }))

    console.log(lineItems, 'lineItems')

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
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