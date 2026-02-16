import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function loadProducts() {
    try {
        const res = await fetch('/api/get-firebase-config');
        const config = await res.json();
        const app = initializeApp(config);
        const db = getFirestore(app);
        
        const snap = await getDocs(collection(db, "products"));
        const list = document.getElementById('product-list');
        list.innerHTML = "";
        snap.forEach(doc => {
            const p = doc.data();
            list.innerHTML += `
                <div class="product-card">
                    <img src="${p.image || '/logo.png'}" style="width:100%;border-radius:5px;">
                    <p>${p.name}</p>
                    <p style="color:#39FF14">Rs. ${p.price}</p>
                    <button class="btn" onclick="location.href='login.html'">Buy Now</button>
                </div>`;
        });
    } catch (e) { console.log(e); }
}
loadProducts();
