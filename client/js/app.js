import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

// گلوبل ویری ایبلز
let db;
const productList = document.getElementById('product-list');
const DEFAULT_LOGO = "/logo.png"; // ورسل پر پبلک فولڈر کے لیے درست پاتھ

/**
 * ایپ کو شروع کرنے اور کنفگریشن حاصل کرنے کا فنکشن
 */
async function startApp() {
    try {
        // Vercel API سے کنفگریشن حاصل کریں
        const response = await fetch('/api/get-firebase-config');
        if (!response.ok) throw new Error("Firebase configuration could not be loaded.");
        
        const firebaseConfig = await response.json();

        // Firebase کی شروعات
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        
        console.log("AlinGo Connected Successfully! ⚡");
        
        // پروڈکٹس لوڈ کریں
        await fetchProducts(); 
        
    } catch (error) {
        console.error("Initialization Error:", error);
        // اگر کوئی مسئلہ ہو تو ڈیمو پروڈکٹس خود بخود نظر آتی رہیں گی
    }
}

/**
 * فائر بیس سے ڈیٹا لانے کا فنکشن
 */
async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        
        if (!querySnapshot.empty) {
            // صرف تب مٹائیں جب ڈیٹا مل جائے تاکہ سکرین خالی نہ رہے
            productList.innerHTML = ""; 
            querySnapshot.forEach((doc) => {
                renderProduct(doc.data(), doc.id);
            });
        } else {
            console.warn("No products found in Firestore. Showing demo data.");
        }
    } catch (error) {
        console.error("Firestore Fetch Error:", error);
    }
}

/**
 * پروڈکٹ کارڈ کو HTML میں رینڈر کرنے کا فنکشن
 */
function renderProduct(data, id) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // امیج پاتھ چیک کریں: اگر ڈیٹا میں نہیں ہے تو ڈیفالٹ لوگو دکھائیں
    const productImage = data.image || DEFAULT_LOGO;

    card.innerHTML = `
        <img src="${productImage}" class="product-img" alt="${data.name}">
        <div class="product-info">
            <h3>${data.name}</h3>
            <p class="price">Rs. ${data.price}</p>
            <button class="btn" onclick="location.href='login.html'">خریدیں ⚡</button>
        </div>
    `;
    productList.appendChild(card);
}

// ایپ لانچ کریں
startApp();
