let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let formLogin = document.querySelector(".form_login");
let body = document.querySelector("body");
let btn = document.querySelector("#btn");
let nome = document.querySelector("#nome");
let sobrenome = document.querySelector("#sobrenome");
let emailCadastro = document.querySelector("#email_cadastro");
let senhaCadastro = document.querySelector("#senha_cadastro");
let btnCriarConta = document.querySelector(".criarConta");
let formCadastro = document.querySelector(".form_cadastro");

window.addEventListener("load", (e) => console.log(e));
const API_URL = "https://ctd-todo-api.herokuapp.com/v1";

function criarli() {
  let li = document.createElement("li");
  ul.appendChild(li);
  li.classList.add("erro");
  return li;
}

// Logar usario dentro da api e validaçao dos campos de login e senha
let ul = document.createElement("ul");

function logarUsuario(e) {
  e.preventDefault();
  // console.log(e)
  ul.innerHTML = "";
  if (email) {
    formLogin.appendChild(ul);
    if (email.value === "") {
      criarli().innerText = "Email não preenchido";
    }
    if (senha.value === "") {
      criarli().innerText = "Senha não preenchida";
    }
  }
  let body = {
    email: email.value,
    password: senha.value,
  };

  fetch(`${API_URL}/users/login`, configuracoes(body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

if (formLogin) {
  formLogin.addEventListener("submit", logarUsuario);
}

// Criar uma novo usuário e Validaçao dos campos de cadastro

function configuracoes(body) {
  let configuracoes = {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  };
  return configuracoes;
}

function criarUsuario(e) {
  e.preventDefault();
  console.log(e);
  ul.innerHTML = "";
  if (emailCadastro) {
    formCadastro.appendChild(ul);
    if (nome.value === "") {
      criarli().innerText = "Nome não preenchido";
    }
    if (sobrenome.value === "") {
      criarli().innerText = "Sobrenome não preenchido";
    }
    if (emailCadastro.value === "") {
      criarli().innerText = "Email não preenchido";
    }
    if (senhaCadastro.value === "") {
      criarli().innerText = "Senha não preenchida";
    }
  }

  let body = {
    firstName: nome.value,
    lastName: sobrenome.value,
    email: emailCadastro.value,
    password: senhaCadastro.value,
  };

  fetch(`${API_URL}/users`, configuracoes(body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

if (formCadastro) {
  formCadastro.addEventListener("submit", criarUsuario);
}
