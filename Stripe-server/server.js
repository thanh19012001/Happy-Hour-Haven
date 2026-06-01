require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

app.post("/checkout-session", async (req, res) => {
  try {
    const { cartItems, language = "en", currency = "NZD" } = req.body; // update language
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "NZD",
        product_data: {
          name: item.name,
          description: item.description || "No description available",
          images: item.place_holder_image ? [item.place_holder_image] : [],
        },
        unit_amount: Math.round(item.price * 100), //  cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      locale: language,
      success_url: `${FRONTEND_ORIGIN}/success_page?session_id={CHECKOUT_SESSION_ID}&lang=${language}&currency=${currency}`,
      cancel_url: `${FRONTEND_ORIGIN}/cancel_page?lang=${language}&currency=${currency}`,
    });

    res.json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
