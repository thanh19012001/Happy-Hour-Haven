require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

app.post("/checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "NZD",
        product_data: {
          name: item.product_name,
          description: item.description || "No description available",
          images: item.image_url ? [item.image_url] : [],
        },
        unit_amount: Math.round(item.price * 100), // Chuyển sang cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success_page",
      cancel_url: "http://localhost:5173/cancel_page",
    });

    // Trả về cả id và url
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
