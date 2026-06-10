const express = require("express");
const { isLoggedIn } = require("../middleware");
const User = require("../models/User");
const Product = require("../models/product");
const router = express.Router();
const stripe = require('stripe')('sk_test_51P50QuSHzSBUbpG84Ahi15ERhrKZJ15ZCPljZaIdxBlgxEtcCgOPtHTlC54MMn2y0llmP9WgaNf0CbYpsxNVpvqB00LuCvQliy')


router.get("/user/cart", isLoggedIn, async (req, res) => {
  let userId = req.user._id;
  let user = await User.findById(userId).populate("cart");
  //   console.log(user, "sam");
  let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
  //   console.log(totalAmount);

  res.render("cart/cart", { user, totalAmount });
});

router.post("/user/:productId/add", isLoggedIn, async (req, res) => {
  let { productId } = req.params;
  let userId = req.user._id;
  let user = await User.findById(userId);
  //   console.log(user, "sam");
  let product = await Product.findById(productId);
  user.cart.push(product);
  await user.save();
  res.redirect("/user/cart");
});

// remove product from cart
router.post("/user/:productId/remove", isLoggedIn, async (req, res) => {
  try {
    let { productId } = req.params;
    let userId = req.user._id;

    // Use $pull to remove productId from cart array
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: productId }
    });

    req.flash("success", "Product removed from cart");
    res.redirect("/user/cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error removing product from cart");
  }
});


router.get("/checkout/:id", async (req, res) => {
  try {
    let userId = req.params.id;
    console.log(req.params);
    let user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).send("User not found");
    }
    console.log(user)
    let totalAmount = user.cart.reduce((sum, curr) => sum + curr.price, 0);
    console.log(user.cart);
    const lineItems = (user.cart).map(function (item){
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images:[item.img]
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      }
    })
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,//[
      //   {
      //     price_data: {
      //       currency: 'inr',
      //       product_data: {
      //         name: 'T-shirt',
      //         images:["https://images.unsplash.com/photo-1713288971605-92a285c20f56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8"]
      //       },
      //       unit_amount: totalAmount * 100,
      //     },
      //     quantity: user.cart.length,
      //   },
      // ],
      mode: 'payment',
      success_url: 'http://localhost:4242/success',
      cancel_url: 'http://localhost:4242/cancel',
    });
    res.redirect(303,session.url);
    // Send the session ID back to the client
    // res.json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Direct Buy Now Checkout for a single product
router.get("/buy/:productId", isLoggedIn, async (req, res) => {
  try {
    let { productId } = req.params;
    let product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              images: [product.img],
            },
            unit_amount: product.price * 100, // Stripe expects paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4242/success",
      cancel_url: "http://localhost:4242/cancel",
    });

    res.redirect(303, session.url);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
