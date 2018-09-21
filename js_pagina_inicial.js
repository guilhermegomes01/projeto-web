(function () {
    var corpo = document.querySelector("#corpo"); //ID do BODY do código
    var btn_header = document.querySelector("#btn-header"); //Botão com o nome "Quadros" na navbar
    var form_cadastrar_quadro = document.querySelector("#cadastrarQuadro"); //Formulário para adicionar quadro que fica dentro do modal
    var linha_quadros = document.querySelector("#linha"); //Linha que ficam os quadros adicionados na tela de "Bem vindo"
    var btnAdicionarQuadro = document.querySelector("#criarQuadro");
    var containerQuadros = document.querySelector("#containerQuadros");
    var containerListas = document.querySelector("#containerListas");
    var texto_nomequadro = document.querySelector("#texto_nomequadro");
    var nomeQuadro;
    var campo_addLista = document.querySelector("#campo_addLista");
    var linha_addLista = document.querySelector("#linha_addLista");
    var div_quadro = document.querySelector("#div_quadro");
    var span_nomeQuadro = document.querySelector("#span_nomeQuadro");
    var quadros;
    var btn_renomear_board = document.querySelector("#new-board-name");
    var form_addList = document.querySelector("#form_addList");
    var form_renomear_board = document.querySelector("#renomear_board");
    var form_alterar_cor = document.querySelector("#alterar_cor");
    var btn_alterar_cor = document.querySelector("#btn_alterar_cor");
    var modal_list = document.querySelector("#modal_list");
    var btn_excluir_list = document.querySelector("#btn_excluir_list");
    var renomear_list = document.querySelector("#renomear_list");
    var form_alterar_list = document.querySelector("#form_alterar_list");
    var form_excluir_list = document.querySelector("#excluir_list");

    btn_header.addEventListener("click", function (e) {
        containerQuadros.style.display = "block";
        containerListas.style.display = "none";
        corpo.style.backgroundColor = "#0079BF";
    });

    //Botão de Criar quadro que está no Modal
    btnAdicionarQuadro.addEventListener("click", function clique(e) {
        var criarDiv = document.createElement("div"); //Cria um div no container, embaixo do texto de Boas vindas
        criarDiv.className = "col-md-4 col-sm-4 col-xs-12"; //Definiu a classe da div
        criarDiv.setAttribute("id", "quadros"); //Setou um atributo ID para a div
        //Criar um Board com formData
        e.preventDefault();
        var n_token = localStorage.getItem("token");
        var url = "http://www.henriquesantos.pro.br:8080/api/trello/boards/new";
        var formData = new FormData(form_cadastrar_quadro);
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                teste = JSON.parse(this.responseText);
            }
        }

        request.open("POST", url);
        request.setRequestHeader('Content-Type', 'application/json');

        var name = formData.get("name");
        var cor = formData.get("color");

        request.send(`{"name":"${name}", "token": "${n_token}", "color": "${cor}" }`);

        nomeQuadro = name; //nomeQuadro recebe o nome do Quadro
        criarDiv.style.backgroundColor = cor; //Muda o background do quadro de acordo com a cor desejada

        linha_quadros.appendChild(criarDiv);
        var spanTexto = document.createElement("span");
        var texto = document.createTextNode(nomeQuadro);
        spanTexto.appendChild(texto);
        spanTexto.setAttribute("id", "texto_nomeQuadro");
        criarDiv.appendChild(spanTexto);


        //Captura todos os quadros e faz um evento no clique do quadro
        quadros = document.querySelectorAll("#quadros");
        for (var i = 0; i < quadros.length; ++i) {
            var nome_do_quadro = (quadros[i].textContent);
            var quadro_id;
            quadros[i].addEventListener("click", function (e) {
                console.log(quadros);
                console.log(quadros[i]);
                e.stopImmediatePropagation();
                corpo.style.backgroundColor = cor;
                containerQuadros.style.display = "none";
                containerListas.style.display = "block";
                quadro_id = JSON.parse(request.responseText).id;
                console.log(quadro_id);
                texto_nomequadro.innerHTML = nome_do_quadro;
            });

            btn_renomear_board.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var url_rename = "http://www.henriquesantos.pro.br:8080/api/trello/boards/rename";
                var formData = new FormData(form_renomear_board);
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        var teste = JSON.parse(this.responseText);
                    }
                }

                request.open("PATCH", url_rename);
                request.setRequestHeader('Content-Type', 'application/json');

                var novo_name = formData.get("new-board-name");
                request.send(`{"name":"${novo_name}", "token": "${n_token}", "board_id": "${quadro_id}" }`);
                texto_nomequadro.innerHTML = novo_name;

                var texto_nome_Quadro = document.querySelector("#texto_nomeQuadro");
                texto_nome_Quadro.innerHTML = novo_name;

                // quadros[i].textContent = novo_name;
                nome_do_quadro = novo_name;
            });

            btn_alterar_cor.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopImmediatePropagation();
                var url_newcolor = "http://www.henriquesantos.pro.br:8080/api/trello/boards/newcolor";
                var formData = new FormData(form_alterar_cor);
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (this.readyState === 4 && this.status === 200) {
                        var teste = JSON.parse(this.responseText);
                        // console.log(teste);
                    }
                }

                request.open("PATCH", url_newcolor);
                request.setRequestHeader('Content-Type', 'application/json');

                var cor = formData.get("color");
                request.send(`{"color":"${cor}", "token": "${n_token}", "board_id": "${quadro_id}" }`);

                corpo.style.backgroundColor = cor;
                quadros[i].style.backgroundColor = cor;
            });

            //Local para Adicionar listas
            campo_addLista.addEventListener("click", function click(e) {
                e.preventDefault();
                this.style.backgroundColor = "white";
                this.placeholder = "Insira o nome da Lista aqui...";
                var criarButton = document.createElement("button");
                criarButton.setAttribute("class", "btn btn-success");
                criarButton.setAttribute("id", "btn_addLista");

                form_addList.appendChild(criarButton); //Acrescentando o button ao lado do input "Adicionar Lista"
                var nomeButton = document.createTextNode("Adicionar Lista"); //Criando o texto dentro do button
                criarButton.appendChild(nomeButton); //Colocando  o nome dentro do button
                this.removeEventListener('click', click);

                var btn_addLista = document.querySelector("#btn_addLista");

                btn_addLista.addEventListener("click", function (e) {
                    var criarColuna = document.createElement("div");
                    criarColuna.className = "col-md-3 col-sm-3 col-xs-12";
                    linha_addLista.appendChild(criarColuna); //Colocando a coluna dentro da div
                    var criarLista = document.createElement("div"); //Criando o Panel
                    criarLista.className = "panel panel-default"; //Colocando a classe
                    var panelHead = document.createElement("div"); //Criando o cabeçalho do panel
                    var panelBody = document.createElement("div"); //Corpo do Panel
                    // Definindo a classe do Panel
                    panelHead.className = "panel-heading";
                    panelBody.className = "panel-body";
                    panelHead.setAttribute("data-toggle", "modal");
                    panelHead.setAttribute("data-target", "#modal_list");


                    criarColuna.appendChild(criarLista); //Colocando o panel na coluna col-md-3
                    criarLista.appendChild(panelHead); //Colocando o cabeçalho no Panel
                    criarLista.appendChild(panelBody); //Colocando o corpo no Panel

                    e.preventDefault();
                    var n_token = localStorage.getItem("token");
                    var url_newlist = "http://www.henriquesantos.pro.br:8080/api/trello/lists/new";
                    var formData = new FormData(form_addList);
                    var request = new XMLHttpRequest();
                    request.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            teste = JSON.parse(this.responseText);
                        }
                    }
                    request.open("POST", url_newlist);
                    request.setRequestHeader('Content-Type', 'application/json');

                    var name_list = formData.get("addLista");

                    request.send(`{"name":"${name_list}", "token": "${n_token}", "board_id": "${quadro_id}" }`);

                    console.log(quadro_id, name_list);
                    var nomeLista = document.createTextNode(name_list);
                    panelHead.appendChild(nomeLista);
                    var btn_addCartao = document.createElement("button");
                    btn_addCartao.className = "btn";
                    btn_addCartao.setAttribute("id", "btn_addCartao");
                    var textoButton = document.createTextNode("+ Adicionar um cartão");

                    panelBody.appendChild(btn_addCartao);
                    btn_addCartao.appendChild(textoButton);
                    campo_addLista.value = "";

                    var panel_head = document.querySelectorAll(".panel-heading");
                    for (var i = 0; i < panel_head.length; i++) {
                        panel_head[i].addEventListener("click", function (e) {
                            e.preventDefault();
                            list_id = JSON.parse(request.responseText).id;
                            var button_addCartao = document.querySelectorAll("#btn_addCartao");
                            for (var indice = 0; indice < button_addCartao.length; indice++) {
                                button_addCartao[indice].addEventListener("click", function (e) {
                                    e.preventDefault();
                                    e.stopImmediatePropagation();
                                    var input_cartao = document.createElement("input");
                                    var form_cartao = document.createElement("form");
                                    form_cartao.setAttribute("id", "form_addCartao"); //Colocando o atributo ID no form
                                    form_cartao.setAttribute("enctype", "application/json"); //Colocando o atributo ENCTYPE no form
                                    input_cartao.setAttribute("id", "input_addCartao"); //Colocando um ID para o input
                                    input_cartao.setAttribute("name", "name_cartao"); //Colocando um NAME no input
                                    var btn_confirmar = document.createElement("button"); //Button que confirma o add do cartão
                                    var textoButton = document.createTextNode("Adicionar");
                                    btn_confirmar.appendChild(textoButton);
                                    btn_confirmar.className = "btn btn-success";
                                    btn_confirmar.setAttribute("id", "btn_confirmar");

                                    panelBody.appendChild(form_cartao);
                                    form_cartao.appendChild(input_cartao);
                                    form_cartao.appendChild(btn_confirmar);

                                    var form_addCartao = document.querySelector("#form_addCartao"); //Capturando o form no javascript

                                    var btn_confirmar = document.querySelector("#btn_confirmar");
                                    btn_confirmar.addEventListener("click", function (e) {
                                        e.preventDefault();
                                        var n_token = localStorage.getItem("token");
                                        var url_newcard = "http://www.henriquesantos.pro.br:8080/api/trello/cards/new";
                                        var formData = new FormData(form_addCartao);
                                        var request = new XMLHttpRequest();
                                        request.onreadystatechange = function () {
                                            if (this.readyState === 4 && this.status === 200) {
                                                teste = JSON.parse(this.responseText);
                                            }
                                        }
                                        request.open("POST", url_newcard);
                                        request.setRequestHeader('Content-Type', 'application/json');
                                        var name_card = formData.get("name_cartao");

                                        request.send(`{"name":"${name_card}", "token": "${n_token}", "list_id":"${list_id}"`);

                                        var nomeCartao = document.createTextNode(name_card);
                                        var btn_nome_cartao = document.createElement("button");
                                        btn_nome_cartao.className = "btn btn-default";
                                        btn_nome_cartao.setAttribute("id", "btn_nome_cartao");
                                        btn_nome_cartao.setAttribute("draggable", "true");
                                        btn_nome_cartao.appendChild(nomeCartao);

                                        panelBody.insertBefore(btn_nome_cartao, panelBody.childNodes[0]);
                                        panelBody.removeChild(form_addCartao);
                                    });
                                });

                            }

                            renomear_list.addEventListener("click", function (e) {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                //Renomear um List
                                var url_rename_list = "http://www.henriquesantos.pro.br:8080/api/trello/lists/rename";
                                var formData = new FormData(form_alterar_list);
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function () {
                                    if (this.readyState === 4 && this.status === 200) {
                                        var teste = JSON.parse(this.responseText);
                                    }
                                }

                                request.open("PATCH", url_rename_list);
                                request.setRequestHeader('Content-Type', 'application/json');

                                var list_name = formData.get("rename_list");
                                request.send(`{"name":"${list_name}", "token": "${n_token}", "list_id": "${list_id}" }`);

                                nomeLista = list_name;
                                panel_head[i - 1].textContent = list_name;
                            });

                            btn_excluir_list.addEventListener("click", function (e) {
                                e.preventDefault();
                                e.stopImmediatePropagation();
                                //Excluir um list
                                var url_excluir_list = "http://www.henriquesantos.pro.br:8080/api/trello/lists/delete";
                                var formData = new FormData(form_alterar_list);
                                var request = new XMLHttpRequest();
                                request.onreadystatechange = function () {
                                    if (this.readyState === 4 && this.status === 200) {
                                        var teste = JSON.parse(this.responseText);
                                    }
                                }

                                request.open("DELETE", url_excluir_list);
                                request.setRequestHeader('Content-Type', 'application/json');

                                request.send(`{"token": "${n_token}", "list_id": "${list_id}" }`);
                            });

                        });

                        // var button_addCartao = document.querySelector("#btn_addCartao");
                        // button_addCartao.addEventListener("click", function (e) {
                        //     var input_cartao = document.createElement("input");
                        //     var form_cartao = document.createElement("form");
                        //     form_cartao.setAttribute("id", "form_addCartao"); //Colocando o atributo ID no form
                        //     form_cartao.setAttribute("enctype", "application/json"); //Colocando o atributo ENCTYPE no form
                        //     input_cartao.setAttribute("id", "input_addCartao");
                        //     input_cartao.setAttribute("name", "name_cartao");
                        //     var btn_confirmar = document.createElement("button"); //Button que confirma o add do cartão
                        //     var textoButton = document.createTextNode("Adicionar");
                        //     btn_confirmar.appendChild(textoButton);
                        //     btn_confirmar.className = "btn btn-success";
                        //     btn_confirmar.setAttribute("id", "btn_confirmar");

                        //     panelBody.appendChild(form_cartao);
                        //     form_cartao.appendChild(input_cartao);
                        //     form_cartao.appendChild(btn_confirmar);

                        //     var form_addCartao = document.querySelector("#form_addCartao"); //Capturando o form no javascript

                        //     var btn_confirmar = document.querySelector("#btn_confirmar");
                        //     btn_confirmar.addEventListener("click", function (e) {
                        //         e.preventDefault();
                        //         var n_token = localStorage.getItem("token");
                        //         var url_newcard = "http://www.henriquesantos.pro.br:8080/api/trello/cards/new";
                        //         var formData = new FormData(form_addCartao);
                        //         var request = new XMLHttpRequest();
                        //         request.onreadystatechange = function () {
                        //             if (this.readyState === 4 && this.status === 200) {
                        //                 teste = JSON.parse(this.responseText);
                        //                 console.log(teste);
                        //             }
                        //         }
                        //         request.open("POST", url_newcard);
                        //         request.setRequestHeader('Content-Type', 'application/json');
                        //         var name_card = formData.get("name_cartao");
                        //         debugger;
                        //         request.send(`{"name":"${name_card}", "token": "${n_token}", "list_id":"${list_id}"`);

                        //         var nomeCartao = document.createTextNode(name_card);
                        //         panelBody.insertBefore(nomeCartao, panelBody.childNodes[0]);
                        //         console.log(list_id);
                        //     });
                        // });
                    }
                });
            });
        }
    });

    // function adicionarCartao() {
    //     var cartao = document.createElement("span");
    // }

    // recuperarBoard(form_renomear_board);
    // function recuperarBoard(form) {
    //     var url_recuperarBoard = "http://www.henriquesantos.pro.br:8080/api/trello/boards/" + n_token + "/" + quadro_id;
    //     var formData = new FormData(form);
    //     var request = new XMLHttpRequest();
    //     request.onreadystatechange = function () {
    //         if (this.readyState === 4 && this.status === 200) {
    //             var teste = JSON.parse(this.responseText);
    //             console.log(teste[0].name, teste[0].id);
    //         }
    //     }

    //     request.open("GET", url_recuperarBoard);
    //     request.setRequestHeader('Content-Type', 'application/json');

    //     request.send();
    // }
})();