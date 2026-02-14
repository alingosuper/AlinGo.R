import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "alingo-m.firebaseapp.com",
    projectId: "alingo-m",
    storageBucket: "alingo-m.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 1. Recaptcha تیار کریں
window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    'size': 'invisible'
});

// 2. OTP بھیجنے کا فنکشن
document.getElementById('send-otp-btn').addEventListener('click', () => {
    const phone = "+92" + document.getElementById('phone-number').value;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            document.getElementById('phone-section').style.display = 'none';
            document.getElementById('otp-section').style.display = 'block';
            alert("OTP آپ کے نمبر پر بھیج دیا گیا ہے");
        }).catch((error) => {
            alert("خرابی: " + error.message);
        });
});

// 3. OTP ویریفائی کرنے کا فنکشن
document.getElementById('verify-otp-btn').addEventListener('click', () => {
    const code = document.getElementById('otp-code').value;
    confirmationResult.confirm(code).then((result) => {
        const user = result.user;
        alert("کامیاب لاگ ان!");
        window.location.href = "index.html"; // ہوم پیج پر بھیج دیں
    }).catch((error) => {
        alert("غلط کوڈ، دوبارہ کوشش کریں");
    });
});
