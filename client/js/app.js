import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const productList = document.getElementById('product-list');
const DEFAULT_LOGO = "/logo.png"; [cite: 2026-02-14]

async function startApp() {
    try {
        const response = await fetch('/api/get-firebase-config');
        const config = await response.json();
        const app = initializeApp(config);
        const db = getFirestore(app);
        
        const querySnapshot = await getDocs(collection(db, "products"));
        productList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${data.image || DEFAULT_LOGO}" style="width:100%; border-radius:8px;">
                <h4>${data.name}</h4>
                <p style="color:var(--neon-green)">Rs. ${data.price}</p>
                <button class="btn" onclick="location.href='login.html'">Buy Now</button>
            `;
            productList.appendChild(card);
        });
    } catch (err) { console.error("App Error:", err); }
}
startApp();
