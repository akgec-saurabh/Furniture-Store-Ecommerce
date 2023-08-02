require("dotenv").config();
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_KEY);
const express = require("express");

const router = express.Router();

router.post("/checkout-session", async (req, res) => {
  const { userId, cart, shipping } = req.body;
  console.log(userId, cart);
  // TODO send email also
  const email = "test.test@gmail.com";

  const shipping_set_by_user = [
    {
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: shipping === 10 ? 1000 : 1900,
          currency: "usd",
        },
        display_name: shipping === 10 ? "Standard" : "Express",
        delivery_estimate: {
          minimum: {
            unit: "business_day",
            value: shipping === 10 ? 7 : 3,
          },
          maximum: {
            unit: "business_day",
            value: shipping === 10 ? 10 : 5,
          },
        },
      },
    },
  ];

  const line_items = cart.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.mainImage],
        description: product.desc,
      },

      unit_amount: product.price * 100,
    },

    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    phone_number_collection: {
      enabled: false,
    },
    invoice_creation: {
      enabled: true,
    },

    //SHIPPING DETAILS
    // shipping_address_collection: {
    //   allowed_countries: ["US", "CA"],
    // },
    shipping_options: shipping_set_by_user,

    mode: "payment",
    customer_email: email,
    payment_method_types: ["card"],
    // payment_method_types: ["apple_pay", "google_pay", "card", "klarna"],
    billing_address_collection: "required",
    success_url: `${process.env.YOUR_DOMAIN}/checkout/success`,
    cancel_url: `${process.env.YOUR_DOMAIN}/checkout`,
  });

  //   res.redirect(303, session.url);
  res.status(200).json({ url: session.url });
});

module.exports = router;
