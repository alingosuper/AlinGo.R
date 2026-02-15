import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let db;
const productList = document.getElementById('product-list');

// 1. Vercel سے کیز منگوانے اور ایپ شروع کرنے کا فنکشن
async function startApp() {
    try {
        // Vercel API سے کنفگریشن حاصل کریں
        const response = await fetch('/api/get-firebase-config');
        if (!response.ok) throw new Error("کیز لوڈ نہیں ہو سکیں");
        
        const firebaseConfig = await response.json();

        // Firebase شروع کریں
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        
        console.log("AlinGo Connected with Vercel Keys! ⚡");
        
        // ڈیٹا بیس سے اصلی پروڈکٹس لائیں
        fetchProducts(); 
        
    } catch (error) {
        console.error("Connection failed:", error);
        // اگر سرور یا کیز میں مسئلہ ہو تو ڈیمو دکھائیں (کچھ مٹانے کی ضرورت نہیں)
        console.log("Showing default demo products due to error.");
    }
}

// 2. فائر بیس سے پروڈکٹس لانے کا فنکشن
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        
        // اگر ڈیٹا بیس میں پروڈکٹس موجود ہیں، تب ہی ڈیمو مٹائیں
        if (!querySnapshot.empty) {
            productList.innerHTML = ""; // ڈیمو صاف کریں
            querySnapshot.forEach((doc) => {
                renderProduct(doc.data(), doc.id);
            });
        } else {
            console.log("Firebase empty, keeping demo products.");
        }
    } catch (error) {
        console.error("Firestore Error:", error);
    }
}

// 3. پروڈکٹ کارڈ رینڈر کرنے کا فنکشن
function renderProduct(data, id) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${data.image || '/public/logo.png'}" class="product-img">
        <div class="product-info">
            <h3>${data.name}</h3>
            <p class="price">Rs. ${data.price}</p>
            <button class="btn" onclick="location.href='login.html'">خریدیں ⚡</button>
        </div>
    `;
    productList.appendChild(card);
}

// ایپ کو رن کریں
startApp();
