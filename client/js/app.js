import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let db;
const productList = document.getElementById('product-list');
const LOGO_PATH = "/logo.png";

async function startApp() {
    try {
        const response = await fetch('/api/get-firebase-config');
        const config = await response.json();
        const app = initializeApp(config);
        db = getFirestore(app);
        fetchProducts();
    } catch (err) { console.error("Error:", err); }
}

async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    productList.innerHTML = "";
    querySnapshot.forEach((doc) => {
        const data = doc.data();
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${data.image || LOGO_PATH}" style="width:100%; height:110px; object-fit:cover;">
            <div style="padding:8px;">
                <h4 style="margin:0; font-size:0.85rem;">${data.name}</h4>
                <p style="color:#39FF14; font-weight:bold; margin:4px 0;">Rs. ${data.price}</p>
                <button class="btn" onclick="orderNow('${doc.id}')">خریدیں ⚡</button>
            </div>`;
        productList.appendChild(card);
    });
}

window.orderNow = (id) => { location.href = `login.html?pid=${id}`; };
startApp();
