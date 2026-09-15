import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    getDoc,
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const nome = document.getElementById("nome");
const nota = document.getElementById("nota");
const sair = document.getElementById("sair");

// Verifica a sessão do usuário
onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Busca os dados do usuário pelo UID
    const referencia = doc(db, "Usuarios", usuario.uid);
    const documento = await getDoc(referencia);

    if (!documento.exists()) {
        nome.textContent = "Usuário não encontrado.";
        return;
    }

    const dados = documento.data();

    // Impede que o professor acesse a área do aluno
    if (dados.Tipo !== "aluno") {
        window.location.href = "professor.html";
        return;
    }

    // Mostra os dados do aluno
    nome.textContent = dados.Nome;
    nota.textContent = dados.Nota;
});

// Encerra a sessão
sair.addEventListener("click", async () => {
    await signOut(auth);

    window.location.href = "index.html";
});
