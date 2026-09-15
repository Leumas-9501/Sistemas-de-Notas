import { auth, authSecundario, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";

const formAluno = document.getElementById("formAluno");
const mensagem = document.getElementById("mensagem");
const sair = document.getElementById("sair");

onAuthStateChanged(auth, async (usuario) => {

    if (!usuario) {
        window.location.href = "index.html";
        return;
    }

    // Busca o tipo do usuário no Firestore
    const referencia = doc(db, "Usuarios", usuario.uid);
    const documento = await getDoc(referencia);

    if (!documento.exists() || documento.data().Tipo !== "professor") {
        window.location.href = "aluno.html";
    }

});

// Cadastra o aluno
formAluno.addEventListener("submit", async (event) => {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const nota = Number(document.getElementById("nota").value);

    try {

        // Cria a conta do aluno no Firebase Authentication
        const usuario = await createUserWithEmailAndPassword(
            authSecundario,
            email,
            senha
        );

        // Salva os dados do aluno no Firestore
        await setDoc(doc(db, "Usuarios", usuario.user.uid), {
            Nome: nome,
            Email: email,
            Tipo: "aluno",
            Nota: nota
        });

        mensagem.textContent = "Aluno cadastrado com sucesso!";

        formAluno.reset();

    } catch (erro) {

        console.error(erro);
        mensagem.textContent = "Não foi possível cadastrar o aluno.";

    }

});

// Encerra a sessão do professor
sair.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "index.html";

});
