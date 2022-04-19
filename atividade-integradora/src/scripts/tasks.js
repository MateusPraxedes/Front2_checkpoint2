let email = document.querySelector("#email");
let senha = document.querySelector("#senha");
let formLogin = document.querySelector(".form_login");
let body = document.querySelector("body");
let btn = document.querySelector("#btn");

window.addEventListener("load", (e) => {
  const API_URL = "https://ctd-todo-api.herokuapp.com/v1";

  function messagemDeErro() {
    let li = document.createElement("li");
    ul.appendChild(li);
    li.classList.add("erro");
    return li;
  }

  function configuracoesSemJwt(method, body) {
    let configuracoes = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json",
      },
    };
    return configuracoes;
  }

  function configuracoesComJwt(method, body, token) {
    let configuracoes = {
      method: method,
      body: JSON.stringify(body),
      headers: {
        authorization: `${token}`,
        "Content-type": "application/json",
      },
    };
    return configuracoes;
  }

  // Logar usuário dentro da api e validaçao dos campos de login e senha
  let ul = document.createElement("ul");

  function logarUsuario(e) {
    e.preventDefault();
    ul.innerHTML = "";
    if (email) {
      formLogin.appendChild(ul);
      if (email.value === "") {
        messagemDeErro().innerText = "Email não preenchido";
      }
      if (senha.value === "") {
        messagemDeErro().innerText = "Senha não preenchida";
      }
    }
    let body = {
      email: email.value,
      password: senha.value,
    };

    fetch(`${API_URL}/users/login`, configuracoesSemJwt("POST", body))
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r == "Contraseña incorrecta") {
          alert("Senha incorreta");
          ul.innerHTML = "";
        } else if (r == "El usuario no existe") {
          alert("Usuario não encontrado");
          ul.innerHTML = "";
        } else if (r == "Error del servidor") {
          alert("Erro no servidor");
          ul.innerHTML = "";
        } else {
          console.log(r.jwt);
          sessionStorage.setItem("JWT", r.jwt);
          window.location.href = "tarefas.html";
        }
      });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", logarUsuario);
  }

  // Criar uma novo usuário e Validaçao dos campos de cadastro

  let nome = document.querySelector("#nome");
  let sobrenome = document.querySelector("#sobrenome");
  let emailCadastro = document.querySelector("#email_cadastro");
  let senhaCadastro = document.querySelector("#senha_cadastro");
  let formCadastro = document.querySelector(".form_cadastro");
  
  function criarUsuario(e) {
    e.preventDefault();
    console.log(e);
    ul.innerHTML = "";
    if (emailCadastro) {
      formCadastro.appendChild(ul);
      if (nome.value === "") {
        messagemDeErro().innerText = "Nome não preenchido";
      }
      if (sobrenome.value === "") {
        messagemDeErro().innerText = "Sobrenome não preenchido";
      }
      if (emailCadastro.value === "") {
        messagemDeErro().innerText = "Email não preenchido";
      }
      if (senhaCadastro.value === "") {
        messagemDeErro().innerText = "Senha não preenchida";
      }
    }

    let body = {
      firstName: nome.value,
      lastName: sobrenome.value,
      email: emailCadastro.value,
      password: senhaCadastro.value,
    };

    fetch(`${API_URL}/users`, configuracoesSemJwt("POST", body))
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (
          r == "El usuario ya se encuentra registrado" ||
          r == "Alguno de los datos requeridos está incompleto"
        ) {
          alert(
            "O usuário já está cadastrado/ Alguns dos dados necessários estão incompletos"
          );
        } else if (r == "Error del servidor") {
          alert("Erro de servidor");
        } else if (r.jwt) {
          alert("Usuário cadastrado com sucesso");
          window.location.href = "index.html";
        }
      });
  }

  if (formCadastro) {
    formCadastro.addEventListener("submit", criarUsuario);
  }

  // Criar uma nova tarefa

  let novaTarefa = document.querySelector(".nova-tarefas");
  let formNovaTarefas = document.querySelector(".form-tarefas");
  let tarefaPedentes = document.querySelector(".tarefas-pendentes");
  let tarefaConcluida = document.querySelector(".tarefas-terminadas");

  function escopoTarefaPendente(tarefa, id) {
    let div = document.createElement("div");
    div.classList.add("tarefa-pedente");
    let li = document.createElement("li");
    let btnRemover = document.createElement("button");
    btnRemover.classList.add("remover");
    let btnConcluida = document.createElement("button");
    btnConcluida.classList.add("concluida");
    btnRemover.innerText = "Remover";
    btnConcluida.innerText = "✔";
    tarefaPedentes.appendChild(div);
    div.appendChild(li);
    div.appendChild(btnConcluida);
    div.appendChild(btnRemover);
    li.innerText = tarefa;
    btnConcluida.addEventListener("click", function (e) {
      console.log(e);
      AtualizarTarefa(id, tarefa, true);
    });
    btnRemover.addEventListener("click", function (e) {
      deletarTarefa(id, sessionStorage.getItem("JWT"));
      e.target.remove();
      li.remove();
      btnConcluida.remove();
    });
  }

  function criarTarefa(e) {
    e.preventDefault();
    if (novaTarefa.value !== "") {
      let body = {
        description: novaTarefa.value,
        completed: false,
      };
      fetch(
        `${API_URL}/tasks`,
        configuracoesComJwt("POST", body, sessionStorage.getItem("JWT"))
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          escopoTarefaPendente(r.description);
          listarTarefas(sessionStorage.getItem("JWT"));
          novaTarefa.value = "";
        });
    }
  }

  if (formNovaTarefas) {
    formNovaTarefas.addEventListener("submit", criarTarefa);
  }

  // Atualizar uma tarefa existente

  function AtualizarTarefa(id, tarefa, estado) {
    let body = {
      description: tarefa,
      completed: estado,
    };

    fetch(
      `${API_URL}/tasks/${id}`,
      configuracoesComJwt("PUT", body, sessionStorage.getItem("JWT"))
    )
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        listarTarefas(sessionStorage.getItem("JWT"));
      });
  }

  // Obter um determinada tarefa

  function obterTarefa(id, token) {
    fetch(`${API_URL}/tasks/${id}`, {
      headers: {
        authorization: `${token}`,
        "Content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => console.log(r));
  }

  // Listar tarefas

  function listarTarefas(token) {
    tarefaPedentes.innerText = "";
    tarefaConcluida.innerText = "";
    fetch(`${API_URL}/tasks`, authorization(token))
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        r.forEach((tarefa) => {
          if (tarefa.completed == false) {
            escopoTarefaPendente(tarefa.description, tarefa.id);
          }
          if (tarefa.completed == true) {
            let div = document.createElement("div");
            div.classList.add("tarefa-concluida");
            let liConcluida = document.createElement("li");
            liConcluida.innerText = tarefa.description;
            let btnReverter = document.createElement("button");
            btnReverter.classList.add("reverter");
            btnReverter.innerText = "Reverter";
            tarefaConcluida.appendChild(div);
            div.appendChild(liConcluida);
            div.appendChild(btnReverter);
            btnReverter.addEventListener("click", () =>
              AtualizarTarefa(tarefa.id, tarefa.description, false)
            );
          }
        });
      });
  }

  if (formNovaTarefas) {
    listarTarefas(sessionStorage.getItem("JWT"));
  }

  // Obter informações de usuário

  let nomeUsuario = document.querySelector(".nome-usuario");
  let emailUsuario = document.querySelector(".email-usuario");
  function authorization(token) {
    let getMe = {
      headers: {
        authorization: `${token}`,
      },
    };
    return getMe;
  }

  function informacoesUsuario(token) {
    fetch(`${API_URL}/users/getMe`, authorization(token))
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        nomeUsuario.innerText = `${r.firstName} ${r.lastName}`;
        emailUsuario.innerText = `${r.email}`;
      });
  }

  if (formNovaTarefas) {
    informacoesUsuario(sessionStorage.getItem("JWT"));
  }

  // Deleter tarefa

  function deletarTarefa(id, token) {
    fetch(`${API_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `${token}`,
        "Content-type": "application/json",
      },
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        listarTarefas(sessionStorage.getItem("JWT"));
      });
  }
});
