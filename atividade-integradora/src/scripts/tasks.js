let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let formLogin = document.querySelector(".form_login");
let body = document.querySelector("body");
let btn = document.querySelector("#btn");

window.addEventListener("load", (e) => console.log(e));
const API_URL = "https://ctd-todo-api.herokuapp.com/v1";

function criarli() {
  let li = document.createElement("li");
  ul.appendChild(li);
  li.classList.add("erro");
  return li;
}

function configuracoes(method, body) {
  let configuracoes = {
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json",
    },
  };
  return configuracoes;
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

  fetch(`${API_URL}/users/login`, configuracoes("POST", body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

if (formLogin) {
  formLogin.addEventListener("submit", logarUsuario);
}

// Criar uma novo usuário e Validaçao dos campos de cadastro

let nome = document.querySelector("#nome");
let sobrenome = document.querySelector("#sobrenome");
let emailCadastro = document.querySelector("#email_cadastro");
let senhaCadastro = document.querySelector("#senha_cadastro");
let btnCriarConta = document.querySelector(".criarConta");
let formCadastro = document.querySelector(".form_cadastro");

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

  fetch(`${API_URL}/users`, configuracoes("POST", body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

if (formCadastro) {
  formCadastro.addEventListener("submit", criarUsuario);
}

// Criar uma nova tarefa

let novaTarefa = document.querySelector(".nova-tarefas");
let formNovaTarefas = document.querySelector(".form-tarefas");

function criarTarefa(e) {
  e.preventDefault();
  let body = {
    description: novaTarefa.value,
    completed: false,
  };

  fetch(`${API_URL}/tasks`, configuracoes("POST", body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

if (formNovaTarefas) {
  formNovaTarefas.addEventListener("submit", criarTarefa);
}

// Deleter tarefa

function deletarTarefa(id) {
  fetch(`${API_URL}/tasks{${id}}`)
    .then((r) => r.json())
    .then((r) => console.log(r));
}

// Atualizar uma tarefa existente

function AtualizarTarefa(id) {
  let body = {
    description: novaTarefa.value,
    completed: false,
  };

  fetch(`${API_URL}/tasks{${id}}`, configuracoes("PUT", body))
    .then((r) => r.json())
    .then((r) => console.log(r));
}

// Obter um determinada tarefa

function obterTarefa(id){
  fetch(`${API_URL}/tasks{${id}}`)
  .then((r) => r.json())
  .then((r) => console.log(r));
}

// Listar tatefas

function listarTarefas(){
  fetch(`${API_URL}/tasks`)
  .then((r) => r.json())
  .then((r) => console.log(r));
}

