/** VARIAVEIS VARIAVEIS VARIAVEIS VARIAVEIS VARIAVEIS */
let areas = {
    a: null,
    b: null,
    c: null
}



/** EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS EVENTOS */

// eventos da div que contem os itens pra arrastar
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', dragstart) // funcao que roda quando eu arrastat o item 
    item.addEventListener('dragend', dragend) // funcao que roda quando eu soltar o item 
})

// evento de onde comtem a area onde o item ficara
document.querySelectorAll('.area').forEach(area => {
    area.addEventListener('dragover', dragOver); // evento que roda quando arrasto o item ele passa por cima da area que adicioneio o evento 
    area.addEventListener('dragleave', dragLeave); // evento que roda quando
    area.addEventListener('drop', drop); // evento que roda quando
});

// adicionando eventos que permite eu dropar os itens na area que eles estavem inicialmente
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral)
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral)
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral)








/** FUNCOES FUNCOES FUNCOES FUNCOES FUNCOES FUNCOES FUNCOES FUNCOES FUNCOES */

// FUNCOES RELACIONADAS AO ITEM 
// funçoes relacionadas ao item. Roda quando arratalo 
function dragstart(e) {
    e.currentTarget.classList.add('dragging')
}
// funcoes relacionadas a area Roda quando soltalo 
function dragend(e) {
    e.currentTarget.classList.remove('dragging')
}



// FUNCOES RELACIONADA A AREA 
//funcao que roda quando arrasta ensima da area
function dragOver(e) {
    // verifiacaçao pra so adicionar o eveito se nao tiver nemhum item dentro da area
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault() // libera pra poder dropar. obs: comportamento padrao e nao poder dropar 
        e.currentTarget.classList.add('hover')
    }
}

// funcao que roda quando o item nao estiver dentro da area (caso araste ele pra um lugar fora da area)
function dragLeave(e) {
    e.currentTarget.classList.remove('hover')
}

// funcao que roda quando estiver no local dropavel (dentro da area)
function drop(e) {
    e.currentTarget.classList.remove('hover')

    // verificaçao pra saber se ja tem item dentro da area que soltei o item
    // se nao tiver ele adiciona o item na area 
    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging')
        e.currentTarget.appendChild(dragItem)

        updateAreas() // chama funcao que atualiza as informaçoes de posicionamento dos itens
    }
}





// funcaoes realcionada a area natural dos itens (onde eles estavem inicailmente)
function dragOverNeutral(e) {
    e.preventDefault() // libera o item arrastado pra dropar 
    e.currentTarget.classList.add('hover')
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover')
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover')
    let dragItem = document.querySelector('.item.dragging')
    e.currentTarget.appendChild(dragItem)

    updateAreas() // chama funcao que atualiza as informaçoes de posicionamento dos itens
}


// Funcao que atualiza as informaçoes de posicionamento dos itens
function updateAreas() {
    document.querySelectorAll('.area').forEach(area => {
        let name = area.getAttribute('data-name') // pega o data name de todas as 3 areas 

        // verifica se tem um item dentro da area, se sim joga o texto do item dentro do meu objeto
        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML
        }else {
            areas[name] = null
        }
    })

    // verifica se a ordem esta correta e adiciona a class que da a borda verde a div pai 
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct')
    } else {
        document.querySelector('.areas').classList.remove('correct')
    }

    console.log(areas)
}










/*  anotaçoes */
//
// - Quando adicionamos um evento de clique (por exemplo, `addEventListener('click', ...)`) em um elemento, temos duas formas principais de identificar qual elemento foi clicado:
//
// 1. `e.target`:
//    - Retorna o elemento exato onde o clique ocorreu, inclui filhos .
//    - Por exemplo, se o evento foi adicionado a um elemento pai e você clicar em um de seus filhos, `e.target` irá referenciar o elemento filho onde o clique aconteceu.
//
// 2. `e.currentTarget`:
//    - Retorna o elemento no qual o evento foi realmente registrado.
//    - Mesmo que o clique ocorra em um elemento filho, `e.currentTarget` sempre será o elemento pai onde o evento foi adicionado.
//
// Resumindo:
// - Use `e.target` para identificar o elemento que disparou o evento.
// - Use `e.currentTarget` para acessar o elemento que está associado ao evento.
//
// pra organizar melhor meu codigo posso serar o codigo em
// variaveis usadas
// eventos
// // funoes 
