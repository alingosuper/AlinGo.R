// server/server.js
const express = require('express');
const app = express();

app.get('/api/get-firebase-config', (req, res) => {
    // صرف وہی کیز بھیجیں جن کی کلائنٹ کو ضرورت ہے
    const config = {
        apiKey: process.env.NEXTH_FIREBASE_API_KEY,
        authDomain: process.env.NEXTH_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXTH_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXTH_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXTH_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXTH_FIREBASE_APP_ID
    };
    
    // چیک کریں کہ کیز موجود ہیں یا نہیں
    if (!config.apiKey) {
        return res.status(500).json({ error: "Config not found on Vercel" });
    }
    
    res.json(config);
});

module.exports = app;
