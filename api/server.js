const express = require('express');
const app = express();

app.use(express.json());

// Firebase Config API
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

// Test Route to verify Node 24
app.get('/api/status', (req, res) => {
    res.json({ status: "Online", engine: "Node 24.x", project: "AlinGo.M" });
});

module.exports = app; // Vercel handles the listening part
