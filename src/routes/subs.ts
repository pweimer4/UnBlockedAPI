const express = require("express")
import User from "../models/user";
import { checkAuth } from "../middleware/checkAuth";
import Article from "../models/article";
import { stripe } from "../utils/stripe";
import user from "../models/user"; 
import { access } from "fs";

const router = express.Router();

router.get("/prices", async (req, res) => {
  const prices = await stripe.prices.list({
    apiKey: process.env.STRIPE_SECRET_KEY,
  });

  return res.json(prices);
});

router.post("/session", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  const session = await stripe.checkout.sessions.create(
    {
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: req.body.priceId,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/articles",
      cancel_url: "http://localhost:3000/courses",
      customer: user.stripeCustomerId,
    },
    {
      apiKey: process.env.STRIPE_SECRET_KEY,
    }
  );

  return res.json(session);
});

export default router;