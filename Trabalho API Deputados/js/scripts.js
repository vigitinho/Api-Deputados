let listaDeps = new Array()

/* buscarListaDeps
    Carrega 'listaDeps' com os dados obtidos do recurso paginado,
    em chamadas sucessivas
*/
function buscarListaDeps(urlInicio) {
  let corpoResposta
  let req = new XMLHttpRequest()
  let dados

  req.open('GET', urlInicio)
  req.onreadystatechange = function (evt) {
    if (req.readyState === req.DONE && req.status >= 200 && req.status < 300) {
      // A requisição foi respondida com sucesso.
      corpoResposta = JSON.parse(req.responseText)

      listaDeps = listaDeps.concat(corpoResposta.dados)

      // Se houver um link de rel="next" na resposta, chamar a função de busca
      // outra vez usando esse link
      // VERSÃO COM LOOP FOR
      for (let i = 0; i < corpoResposta.links.length; i++) {
        if (corpoResposta.links[i].rel === 'next') {
          buscarListaDeps(corpoResposta.links[i].href)
          return
        }
      }

      menuCarregarOpcoes()
    } // FIM DO "IF"
  } // FIM DE onreadystatechange
  req.setRequestHeader('Accept', 'application/json')
  req.send()
}

buscarListaDeps('https://dadosabertos.camara.leg.br/api/v2/deputados?itens=535')

/* menuCarregarOpcoes
     Configura as opções de nomes de deputados no menu
 */
function menuCarregarOpcoes() {
  let i = 0
  let menuDeps = document.getElementById('menuDeps')
  let opt

  // Criar o primeiro item sem o nome de um parlamentar...
  opt = document.createElement('option')
  opt.text = 'Escolha um parlamentar...'
  menuDeps.add(opt)

  while (listaDeps[i]) {
    opt = document.createElement('option')
    opt.text = listaDeps[i].nome + " - " + listaDeps[i].siglaPartido
    menuDeps.add(opt)
    i++
  }
}

/* menuOpcaoEscolhida
    Chamada quando o usuário escolhe outro nome no menu, executa
    as alterações na foto e no quadro de informações.
*/
function menuOpcaoEscolhida() {
  let escolhido
  let menuDeps = document.getElementById('menuDeps')

  escolhido = menuDeps.value
  for (let i = 0; i < listaDeps.length; i++) {
    if (listaDeps[i].nome  === escolhido && listaDeps[i].siglaPartido === escolhido) {
      mostrarDeputado(listaDeps[i])
    }
  }
}

/*
mostrarDeputado - recebe um item da lista de deputados,
  contendo os dados de um parlamentar, e os insere na
  exibição do HTML no navegador
*/
function mostrarDeputado(dep) {
  let fotoDep = document.getElementById('fotoDep')
  let nomeDep = document.getElementById('nomeDep')
  let partidoEstado = document.getElementById('partidoEstado')

  // A URL da foto é colocada como valor do atributo "src"
  //    do elemento <img> identificado com o id "fotodep"
  fotoDep.setAttribute('src', dep.urlFoto)

  // O nome é inserido como conteúdo do elemento com id "nome"
  nomeDep.innerHTML = dep.nome
  partidoEstado.innerHTML = dep.siglaPartido + ' - ' + dep.siglaUf
}
