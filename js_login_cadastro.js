//Qual container mostrar de acordo com o Click
var btnCadastrar = document.querySelector("#btnCadastrar");
var btnLogin = document.querySelector("#btnLogin");
var btnHome = document.querySelector("#home");
var containerInicial = document.querySelector("#container-texto-inicial");
var container_cadastro = document.querySelector("#container-cadastro");
var container_login = document.querySelector("#container-login");

btnCadastrar.addEventListener("click", function () {
    container_cadastro.style.display = "block";
    containerInicial.style.display = "none";
    container_login.style.display = "none";
});

btnLogin.addEventListener("click", function () {
    container_login.style.display = "block";
    containerInicial.style.display = "none";
    container_cadastro.style.display = "none";
})

btnHome.addEventListener("click", function () {
    containerInicial.style.display = "block";
    container_cadastro.style.display = "none";
    container_login.style.display = "none";
});

// Cadastrar Usuário
var form_cadastrarUsuario = document.querySelector("#form_cadastrarUsuario");

form_cadastrarUsuario.addEventListener("submit", function (e) {
    e.preventDefault();

    var url = "http://www.henriquesantos.pro.br:8080/api/trello/users/new";
    var formData = new FormData(form_cadastrarUsuario);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.responseText);
        }
    }

    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');

    var name = formData.get("name");
    var username = formData.get("username");
    var password = formData.get("password");

    request.send(`{"name":"${name}", "username":"${username}", "password": "${password}" }`);
    console.log(name, username, password);
});

// Fazer Login
var form_login = document.querySelector("#form_login");

form_login.addEventListener("submit", function (e) {
    e.preventDefault();

    var url = "http://www.henriquesantos.pro.br:8080/api/trello/login";
    var formData = new FormData(form_login);
    var request = new XMLHttpRequest();
    var token_value;
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            token_value = JSON.parse(this.responseText).token;
            console.log(token_value);
            localStorage.setItem("token", token_value);
            window.open("pagina_inicial.html");
        }
    }

    request.open("POST", url);
    request.setRequestHeader('Content-Type', 'application/json');

    var username = formData.get("username");
    var password = formData.get("password");

    request.send(`{"username":"${username}", "password": "${password}" }`);

});