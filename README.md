# TOER Store
## E-commerce app integrated with Stripe for payments and Auth0 for SSO

Visit the app at https://toerstore.com

### HOW TO USE SIGN UP WITH AUTH0/OKTA

Start by signing up with the integrated Auth0 SaaS.  Click "Sign-in" in the navbar at the top right of the screen.  This will take you to the Auth0 sign-up page.
You can sign in with any e-mail address, google account, or facebook account.

After you have created an account you will automaticaly be returned to the home page.  The "Sign-in" button should now say "Sign-out."

### SHOPPING

You can view different products by clicking the image of the product or the "View Product" button.  Select a size if applicable and then click "Add to Cart" button.
You will see notifications tell you what you added to the cart each time.

Once you have selected a few products click the cart button at the top of the screen.

### CHECKOUT

In the cart page you can modify the quantity of each item in your cart.  You can click the "Continue Shopping" button to return to the main page or "Checkout" button to checkout.

Click the "Checkout" button and you will be redirected to the Stripe payments page.  The items in your cart will be listed on the Stripe checkout page.

To simulate a successful payment, use credit card number "4242424242424242".  After payment is confirmed you will be redirected to the success page.

To simulate a declined payment, use credit card number "4000000000009995".  After payment is declined you will be redirected to the payment cancelled page.

### VIEW PAST ORDERS

To view your past order you must complete an order with a valid account created with the sign-in portal.  Upon completing an order, visit the profile section from the menu in the top right of your screen.

Thank you for demoing my app!