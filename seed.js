const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/User');

async function seedAdmin() {
    // Check if admin already exists
    let admin = await User.findOne({ role: "admin" });
    if (!admin) {
        admin = new User({
            username: "admin",
            email: "admin@gmail.com",
            gender: "Other",
            role: "admin"
        });
        await User.register(admin, "admin@1601");
        console.log("Admin created successfully!");
    } else {
        console.log("Admin already exists.");
    }
    return admin;
}

const products = [
  {
    name: "iPhone 15 Pro",
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9", // Example: generic smartphone
    price: 135000,
    desc: "Apple iPhone 15 Pro with A17 Pro chip, 6.1-inch Super Retina XDR display, titanium design, and pro camera system."
  },
  {
    name: "MacBook Air M2",
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8", // Example: generic laptop
    price: 110000,
    desc: "Apple MacBook Air powered by M2 chip, with 13.6-inch Liquid Retina display, all-day battery life, and fanless design."
  },
  {
    name: "Apple Watch Series 9",
    img: "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd", // Example: generic smartwatch
    price: 45000,
    desc: "Apple Watch Series 9 with brighter display, advanced health sensors, crash detection, and double-tap gesture control."
  },
  {
    name: "iPad Pro 12.9-inch (M2)",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2", // Example: generic tablet
    price: 125000,
    desc: "iPad Pro 12.9-inch with M2 chip, Liquid Retina XDR display, ProMotion, Apple Pencil hover, and 5G connectivity."
  },
  {
    name: "AirPods Pro (2nd Gen)",
    img: "https://images.unsplash.com/photo-1511367461989-f85a21fda167", // Example: generic headphones/earbuds
    price: 24000,
    desc: "AirPods Pro (2nd generation) with Active Noise Cancellation, Adaptive Transparency, Personalized Spatial Audio, and MagSafe Charging Case."
  }
];

async function seedDB(){
    const admin = await seedAdmin(); // ensures admin exists
    const productsWithAuthor = products.map(p => ({ ...p, author: admin._id }));
    await Product.insertMany(productsWithAuthor);
    console.log("Products seeded successfully with admin as author!");
}

module.exports = seedDB;
