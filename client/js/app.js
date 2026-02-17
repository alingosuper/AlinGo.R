import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

async function startApp() {
    try {
        // Fetch config from our upgraded Node 24 API
        const response = await fetch('/api/get-firebase-config');
        const firebaseConfig = await response.json();
        
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        console.log("AlinGo.M connected to Firebase via Node 24 server.");

        // باقی فنکشنز یہاں آئیں گے...
    } catch (error) {
        console.error("Connection failed:", error);
    }
}

startApp();
