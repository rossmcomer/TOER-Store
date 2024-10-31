import { STRIPE_SECRET, STRIPE_WEBHOOK_SECRET } from '../util/config'
const stripe = require('stripe')(STRIPE_SECRET)
const router = require('express').Router()

router.post('/', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = request.headers['stripe-signature']

    let event

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET)
      } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`)
        return
      }
    
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            // Then define and call a function to handle the event checkout.session.completed
            break;
        case 'payment_intent.payment_failed':
            const paymentIntentPaymentFailed = event.data.object;
            // Then define and call a function to handle the event payment_intent.payment_failed
            break;
        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            // Then define and call a function to handle the event payment_intent.succeeded
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    
      console.log(`Unhandled event type ${event.type}`)
    
      // Return a 200 response to acknowledge receipt of the event
      response.send()

})

export default router