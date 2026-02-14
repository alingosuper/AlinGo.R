import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "alingo-m.firebaseapp.com",
    projectId: "alingo-m",
    storageBucket: "alingo-m.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const productList = document.getElementById('product-list');

async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        
        // اگر ڈیٹا بیس میں پروڈکٹس موجود ہیں، تب ہی ڈیمو مٹائیں
        if (!querySnapshot.empty) {
            productList.innerHTML = ""; // صرف تب مٹائیں جب اصلی ڈیٹا مل جائے
            querySnapshot.forEach((doc) => {
                renderProduct(doc.data(), doc.id);
            });
        } else {
            console.log("Firebase is empty, showing demo products.");
            // یہاں کچھ مٹانے کی ضرورت نہیں، HTML والا ڈیمو نظر آتا رہے گا
        }
    } catch (error) {
        console.error("Error:", error);
        // ایرر کی صورت میں بھی ڈیمو غائب نہیں ہوگا
    }
}

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

fetchProducts();
