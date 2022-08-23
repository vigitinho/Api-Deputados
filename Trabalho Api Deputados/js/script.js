let Id = document.getElementById("Id");


function retornaDeputados() {

    let request = new XMLHttpRequest();

    Id.innerText = '';
    
                    
    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/deputados?nome=' + Id.value + '&ordem=ASC&ordenarPor=nome', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {
                alert('Sucesso ao abrir a requisição: ' + request.statusText);

                let jsonObj = request.response;

                var tbody = document.getElementById("apiTable").querySelector("tbody");

                for (let i = 0; i <= jsonObj.dados.length - 1; i++) { 
                    tbody.innerHTML += "<td>" + jsonObj.dados[i].id + "</td> <td>" + jsonObj.dados[i].nome + 
                    "</td> <td>" +  jsonObj.dados[i].siglaPartido + "</td> <td>"
                    + jsonObj.dados[i].siglaUf + "</td>"; 
                    
                
                }
            } 
        }
    };
    request.onerror = function(e){
        alert('Erro: ' + request.statusText);
    }
    request.responseType = 'json';
    request.send(null);
}

function retornaSigla() {

    let request = new XMLHttpRequest();

    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/deputados?siglaPartido=' + document.getElementById("Sigla").value + '&ordem=ASC&ordenarPor=nome', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {

                alert('Sucesso ao abrir a requisição: ' + request.statusText);

                let jsonObj = request.response;

                var tbody = document.getElementById("apiTable").querySelector("tbody");

                for (let i = 0; i <= jsonObj.dados.length - 1; i++) {
                    tbody.innerHTML += "<td>" + jsonObj.dados[i].id + "</td> <td>" + jsonObj.dados[i].nome + 
                    "</td> <td>" +  jsonObj.dados[i].siglaPartido + "</td> <td>"
                    + jsonObj.dados[i].siglaUf + "</td>";    
                }
            } 
        }
    };
    request.onerror = function(e){
        alert('Erro: ' + request.statusText);
    }
    request.responseType = 'json';
    request.send(null);
}

function retornaPartidos(){

    
    let request = new XMLHttpRequest();

    request.open('GET', 'https://dadosabertos.camara.leg.br/api/v2/partidos?sigla='+ document.getElementById("SiglaUf").value + '&sigla=&ordem=ASC&ordenarPor=sigla', true);
    request.setRequestHeader('Accept', 'application/json');
    request.onload = function (e) {
        if (request.readyState === 4) {
            if (request.status === 200) {

                alert('Sucesso ao abrir a requisição: ' + request.statusText);

                let jsonObj = request.response;

                var tbody = document.getElementById("apiTable").querySelector("tbody");

                for (let i = 0; i <= jsonObj.dados.length - 1; i++) {
                    tbody.innerHTML += "<td>" + jsonObj.dados[i].id + "</td> <td>" + jsonObj.dados[i].nome + 
                    "</td> <td>" +  jsonObj.dados[i].siglaPartido + "</td> <td>"
                    + jsonObj.dados[i].siglaUf + "</td>";     
                }
            } 
        }
    };
    request.onerror = function(e){
        alert('Erro: ' + request.statusText);
    }
    request.responseType = 'json';
    request.send(null);
   
}