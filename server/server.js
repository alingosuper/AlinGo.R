const express = require('express');
const app = express();
app.use(express.json());

const otps = {}; // عارضی میموری

// OTP بھیجنے کا روٹ
app.post('/api/send-otp', (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[phone] = otp;
    res.json({ success: true, otp }); // ڈیمو کیلئے OTP واپس بھیج رہے ہیں
});

// آرڈر جنریشن
app.post('/api/create-order', (req, res) => {
    const orderId = "AL-" + Date.now();
    res.json({ success: true, orderId });
});

// فائر بیس کیز فراہم کرنا (Vercel Env سے)
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
