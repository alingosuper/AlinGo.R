const express = require('express');
const app = express();
app.use(express.json());

const otps = {}; 

app.post('/api/send-otp', (req, res) => {
    const { phone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[phone] = otp;
    res.json({ success: true, otp }); 
});

app.post('/api/create-order', (req, res) => {
    const orderId = "AL-" + Date.now(); [cite: 2026-02-14]
    res.json({ success: true, orderId });
});

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
