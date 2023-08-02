require("dotenv").config();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const route = express.Router();

route.post("/checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.YOUR_DOMAIN}/checkout/success`,
    cancel_url: `${process.env.YOUR_DOMAIN}/checkout`,
  });

  //   res.redirect(303, session.url);
  res.status(303).json({ url: session.url });
});

module.exports = router;
