import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const productList = document.getElementById('product-list');
const DEFAULT_LOGO = "/logo.png"; 

async function startApp() {
    try {
        // سرور سے NEXTH_FIREBASE والی کنفگریشن حاصل کرنا
        const response = await fetch('/api/get-firebase-config');
        const config = await response.json();
        
        const app = initializeApp(config);
        const db = getFirestore(app);
        
        console.log("AlinGo Connected with NEXTH Config! ⚡");
        
        const querySnapshot = await getDocs(collection(db, "products"));
        if (productList) {
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
        }
    } catch (err) { 
        console.error("Firebase Connection Error:", err); 
    }
}
startApp();
