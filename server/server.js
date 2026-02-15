const express = require('express');
const app = express();
app.use(express.json());

// Temporary in-memory storage
const otps = {}; 
const orders = [];

// 📱 Route to send OTP (Demo Version)
app.post('/api/send-otp', (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone) return res.status(400).json({ success: false, message: "Phone number is required" });

        const otp = Math.floor(100000 + Math.random() * 900000);
        otps[phone] = otp;

        console.log(`OTP for ${phone}: ${otp}`); // Server console log
        res.json({ success: true, otp, message: "OTP sent successfully (Demo)" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 📦 Route to Create Order
app.post('/api/create-order', (req, res) => {
    try {
        const orderData = req.body;
        const orderId = "AL-" + Date.now(); // Unique Order ID [cite: 2026-02-14]
        
        const newOrder = {
            orderId: orderId,
            ...orderData,
            status: "Pending",
            timestamp: new Date()
        };

        orders.push(newOrder); // Store in memory
        res.json({ success: true, orderId, message: "Order placed successfully!" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 🔥 Firebase Configuration Route
app.get('/api/get-firebase-config', (req, res) => {
    res.json({
        apiKey: process.env.NEXTH_FIREBASE_API_KEY,
        authDomain: process.env.NEXTH_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXTH_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXTH_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXTH_FIREBASE_SENDER_ID,
        appId: process.env.NEXTH_FIREBASE_APP_ID
    });
});

module.exports = app;
