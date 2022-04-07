let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let form = document.querySelector("form");
let body = document.querySelector("body");
let btn = document.querySelector("#btn");
let nome = document.querySelector("#nome");
let sobrenome = document.querySelector("#sobrenome");
let emailCadastro = document.querySelector("#email_cadastro");
let senhaCadastro = document.querySelector("#senha_cadastro");
let btnCriarConta = document.querySelector(".criarConta");
let formCadastro = document.querySelector(".form_cadastro");



window.addEventListener("load", (e) => console.log(e));

// Validaçao dos campos de login e senha
let ul = document.createElement("ul");
form.appendChild(ul);
function criarli() {
  let li = document.createElement("li");
  ul.appendChild(li);
  li.classList.add("erro");
  return li;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log(e)
  ul.innerHTML = "";
  if(email){
  if (email.value === "") {
    criarli().innerText = "Email não preenchido";
  }
  if (senha.value === "") {
    criarli().innerText = "Senha não preenchida";
  }}
});

const API_URL = "https://ctd-todo-api.herokuapp.com/v1";

// Criar uma novo usuário

function configuracoes(body){
let configuracoes = {
  method: "POST",
  body: JSON.stringify(body),
  headers: {
    "Content-type": "application/json",
  },
};
  return configuracoes}


function criarUsuario(e) {
  e.preventDefault();
  console.log(e)
  let body = {
    firstName: nome.value,
    lastName: sobrenome.value,
    email: emailCadastro.value,
    password: senhaCadastro.value,
  };

  fetch(`${API_URL}/users`,configuracoes(body))
    .then((r) => r.json())
    .then((r) => console.log(r))
}

formCadastro.addEventListener("submit", criarUsuario);







