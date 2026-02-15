import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let db;
const productList = document.getElementById('product-list');
const DEFAULT_LOGO = "/logo.png"; 

async function startApp() {
    try {
        const response = await fetch('/api/get-firebase-config');
        const config = await response.json();
        const app = initializeApp(config);
        db = getFirestore(app);
        fetchProducts();
    } catch (err) { console.error("Connection Error:", err); }
}

async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "products"));
    if (!querySnapshot.empty) {
        productList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            renderProduct(doc.data(), doc.id);
        });
    }
}

function renderProduct(data, id) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${data.image || DEFAULT_LOGO}" class="product-img">
        <div class="product-info">
            <h3>${data.name}</h3>
            <p class="price">Rs. ${data.price}</p>
            <button class="btn" onclick="location.href='login.html?pid=${id}'">Buy Now</button>
        </div>`;
    productList.appendChild(card);
}

startApp();
