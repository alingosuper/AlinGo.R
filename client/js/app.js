import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let db;
const productList = document.getElementById('product-list');
const DEFAULT_LOGO = "/logoa.png"; // آپ کی فرمائش کے مطابق نام تبدیل کر دیا گیا

async function startApp() {
    try {
        const response = await fetch('/api/get-firebase-config');
        const firebaseConfig = await response.json();

        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        
        console.log("AlinGo Connected! ⚡");
        fetchProducts(); 
        
    } catch (error) {
        console.error("Initialization Error:", error);
    }
}

async function fetchProducts() {
    try {
        const querySnapshot = await getDocs(collection(db, "products"));
        if (!querySnapshot.empty) {
            productList.innerHTML = ""; 
            querySnapshot.forEach((doc) => {
                renderProduct(doc.data(), doc.id);
            });
        }
    } catch (error) {
        console.error("Firestore Error:", error);
    }
}

function renderProduct(data, id) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${data.image || DEFAULT_LOGO}" class="product-img" style="width:100%; height:120px; object-fit:cover; border-radius:10px 10px 0 0;">
        <div class="product-info" style="padding:10px;">
            <h3 style="font-size:0.9em; margin:5px 0;">${data.name}</h3>
            <p class="price" style="color:#39FF14; font-weight:bold;">Rs. ${data.price}</p>
            <button class="btn" onclick="location.href='login.html'">خریدیں ⚡</button>
        </div>
    `;
    productList.appendChild(card);
}

startApp();
