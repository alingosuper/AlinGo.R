// Firebase SDKs (CDN versions)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// Firebase Configuration
// نوٹ: Vercel پر ان کیز کو Environment Variables میں سیٹ کریں
const firebaseConfig = {
    apiKey: "YOUR_API_KEY", // یہاں اپنی کیز ڈالیں
    authDomain: "alingo-m.firebaseapp.com",
    projectId: "alingo-m",
    storageBucket: "alingo-m.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const productList = document.getElementById('product-list');

// 1. پروڈکٹس لوڈ کرنے کا فنکشن
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        productList.innerHTML = ""; // لوڈنگ ختم کریں

        if (querySnapshot.empty) {
            productList.innerHTML = "<p style='text-align:center;'>کوئی پروڈکٹ نہیں ملی۔</p>";
            return;
        }

        querySnapshot.forEach((doc) => {
            const product = doc.data();
            renderProduct(product, doc.id);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
        productList.innerHTML = "<p style='color:red;'>ڈیٹا لوڈ کرنے میں دشواری ہو رہی ہے۔</p>";
    }
}

// 2. پروڈکٹ کارڈ بنانے کا فنکشن (Electric Theme)
function renderProduct(data, id) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${data.image || '/public/logo.png'}" alt="${data.name}" class="product-img">
        <div class="product-info">
            <h3>${data.name}</h3>
            <p class="price">Rs. ${data.price}</p>
            <button class="btn buy-btn" onclick="orderNow('${id}')">خریدیں ⚡</button>
        </div>
    `;
    productList.appendChild(card);
}

// 3. آرڈر لاجک (گلوبل ونڈو کے لیے)
window.orderNow = (productId) => {
    alert("آرڈر کرنے کے لیے لاگ ان کریں! (OTP سسٹم جلد فعال ہوگا)");
    // یہاں ہم لاگ ان پیج پر ری ڈائریکٹ کر سکتے ہیں
};

// لوڈنگ شروع کریں
fetchProducts();



// ڈیمو ڈیٹا اگر ڈیٹا بیس خالی ہو
const demoProducts = [
    { name: "Motherboard", price: "15,000", image: "https://via.placeholder.com/150/000000/00FF00?text=Electronics" },
    { name: "Electric Scooter", price: "75,000", image: "https://via.placeholder.com/150/000000/00FF00?text=Scooter" },
    { name: "Gaming Headset", price: "8,000", image: "https://via.placeholder.com/150/000000/00FF00?text=Headset" },
    { name: "Power Bank", price: "4,500", image: "https://via.placeholder.com/150/000000/00FF00?text=PowerBank" }
];

// اگر Firebase سے ڈیٹا نہ ملے تو یہ دکھائیں
function showDemo() {
    demoProducts.forEach(p => renderProduct(p, 'demo'));
}
