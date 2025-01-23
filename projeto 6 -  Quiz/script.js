// temos um array que contem objetos com questoes e rspostas
// primeiro passso exibir uma questao
// ja sabemos quantas questoes temos


// obs quanto menos manipular o dom menos vai dificultar pra maquina do usuario
// ent quando for exibir coisas tipos questoes e melhro configurar as paras certinho colocar na variavel e dps so faco colocar a variavel

let currentQuestion = 0; // indice para a questao atual
let correctAnswe = 0; // respostas corretas
showQuestion()

// event pra reiniciar o jogo 
document.querySelector('.scoreArea button').addEventListener('click' , resetEvent)

// funcao que exibe a questao
function showQuestion() {
    // verificaçao pra saber se ainda temos questoes
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion] // o indice pra o array que contem as questoes e arqmazena em uma variavel para que fique um texto menor que manipular

        let pct = Math.floor((currentQuestion / questions.length) * 100) // obtem o valor em porcentagem das questoes e converte ele pra um numero inteiro arredondado
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none' //escondo a div que mostra o resultado
        document.querySelector('.questionArea').style.display = 'block' //exibe a div pai das que contem as perguntas e responstas

        document.querySelector('.question').innerHTML = q.question // div que contem as perguntas

        let optionsHtml = '' //variavel que irei armazenar as opcoes de respostas
        /*
        * faco um loop pra armazenar todas as opcoes de resposta dentro de question
        * vai adicionando a option da vez dentro de uma div
        * aiciona class na div
        * e um span que contem o numero da opçao
        * porem i começa em zero e na tela deve comecçar em 1
        * ai usso o parint pra transoformar i em numero e somo mai um a ele
        * adicion o dataop e passo o valor de i (nao faço ideia do pq)
        */
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1} </span>${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHtml // armazena a variavel que contem todas as opcoes de resposta cada uma em uma div

        // adiciono o evento de click na nossa divs que contem as opcoes
        //obs colocalo apos o  codigo que adiciona ela dinamincamente na tela pra nao ter erro
        document.querySelectorAll('.options .option').forEach(iten => {
            iten.addEventListener('click', optionClickEvent)
        })
    } else {
        // acabaram as questoes
        finishQuiz()
    }
}

// funcao chamada no click das opçoes
// o click retorna o event que e o elemnto clicado
// no loop ja adicionameos o indice do elemento clicado que serio o data-op ele sera comparado com a pripiedade que contem o indice da opçao certa
function optionClickEvent(e) {
    let clicnkedOption = parseInt(e.target.getAttribute('data-op')) // pega o dataop do objeto clicado

    // verificaçao que conpara a resposta da questao da vez com o item que clicou
    if (questions[currentQuestion].answer === clicnkedOption) {
        correctAnswe++ // soma mais um a variavel que armazena os acertos
        console.log('acertou miseravi', correctAnswe)
    } else {
        console.log('errou')
    }

    currentQuestion++ // adiciona mais um a variavel que armazena o indece da questao da vez
    showQuestion() // roda a funçao que atualiza a tela com a questao da vez
}



// chamda  no final do jogo, ela oculta a div que contem  as perguntas e exibe e div que contem o resultado
// e pra nao ficar bugado da o 100% pra barra de progresso
function finishQuiz() {
    let pointsPct = Math.floor((correctAnswe / questions.length) * 100) // porcentagem de acertos

    // condicionais pra mudar a msg de pareabens a depender do desenpenho do cara
    if(pointsPct < 30) {
        document.querySelector('.scoreText1').innerHTML = 'ta precisando estudar em pai';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(pointsPct >= 30 && pointsPct < 70) {
        document.querySelector('.scoreText1').innerHTML = 'muito bom';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    }else if(pointsPct >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'parabens';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }


    document.querySelector('.scorePct').innerHTML = `acertou ${pointsPct}%` // exibe a quantidade de resposatas corretas
    document.querySelector('.scoreText2').innerHTML = `voce acertou ${correctAnswe} questoes de ${questions.length}` // exibe o tanto de questoes que acertou e o tanto de questoes que tinha

    document.querySelector('.scoreArea').style.display = 'block' //div de msg quando finaliza
    document.querySelector('.questionArea').style.display = 'none' //div de questoes
    document.querySelector('.progress--bar').style.width = '100%' //barra de progresso
}



// funçao reponsavel por resetar o jogo:
//limpa todas as variaveis usadas 
// oculta a msg exibida ao responder todas as respostas 
// to basicamente repetindo oque eu fiz no começo, quando eu crios as variaveis com 0 e chamo a funçao que atualiza a tela
function resetEvent() {
    correctAnswe = 0
    currentQuestion = 0
    showQuestion() // chama a funçao que exibe as questoes, e como o currentQuest ta zerado ela vai exibir a primeira 
}