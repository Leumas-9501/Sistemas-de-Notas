import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDEuPoXKuxjhyJoS4j57CGwD9PcA5bult0",
    authDomain: "tarefa1-pweb.firebaseapp.com",
    projectId: "tarefa1-pweb",
    storageBucket: "tarefa1-pweb.firebasestorage.app",
    messagingSenderId: "337614049001",
    appId: "1:337614049001:web:6353e4a27decb285776a78"
};

// Firebase principal
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Segunda instância para criar alunos sem trocar a sessão do professor
const appSecundario = initializeApp(firebaseConfig, "Secundario");

export const authSecundario = getAuth(appSecundario);