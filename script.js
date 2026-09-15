import { auth, db } from "./firebase.js";

import {
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const formLogin = document.getElementById("formLogin");
const mensagem = document.getElementById("mensagem");

formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
        // Realiza o login no Firebase Authentication
        const usuario = await signInWithEmailAndPassword(
            auth,
            email,
            senha
        );

        // Busca os dados do usuário no Firestore
        const referencia = doc(
            db,
            "Usuarios",
            usuario.user.uid
        );

        const documento = await getDoc(referencia);

        if (!documento.exists()) {
            mensagem.textContent = "Usuário não encontrado.";
            return;
        }

        const dados = documento.data();

        // Verifica o tipo de usuário e direciona para sua página
        if (dados.Tipo === "professor") {
            window.location.href = "professor.html";
        } else if (dados.Tipo === "aluno") {
            window.location.href = "aluno.html";
        } else {
            mensagem.textContent = "Tipo de usuário inválido.";
        }

    } catch (erro) {
        // Exibe mensagem caso o login falhe
        mensagem.textContent = "E-mail ou senha incorretos.";
        console.error(erro);
    }
});