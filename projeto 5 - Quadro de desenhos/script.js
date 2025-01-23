/* Initial setup */
// Variável para armazenar a cor atual
let currentColor = 'black';

// Controla se o usuário está desenhando
let canDraw = false;

// Coordenadas do mouse
let mouseX = 0; 
let mouseY = 0;

// Seleção da tela de desenho
let screen = document.querySelector('#tela');

// O context permite desenhar na tela. É uma interface que fornece métodos para criar formas, linhas, cores, etc.
let context = screen.getContext('2d'); // Contexto 2D para desenhar na tela





/* Events */
// Adiciona evento de clique em cada cor da paleta
document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);
});

// Eventos do mouse para desenhar na tela
screen.addEventListener('mousedown', mouseDownEvent); // Clique do mouse
screen.addEventListener('mousemove', mouseMoveEvent); // Movimento do mouse
screen.addEventListener('mouseup', mouseUpEvent);     // Soltar o clique do mouse
document.querySelector('.clear').addEventListener('click', clearScreen) // evento de limpar o quadro





/* Functions */

// Função para selecionar a cor ao clicar em uma cor na paleta
function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color'); // Obtém a cor clicada
    currentColor = color; // Define a cor atual

    // Atualiza a classe ativa na paleta de cores
    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

// Função chamada ao pressionar o botão do mouse
function mouseDownEvent(e) {
    canDraw = true; // Habilita o desenho

    // Obtém a posição inicial do mouse
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

// Função chamada enquanto o mouse é movido
function mouseMoveEvent(e) {
    if (canDraw) {
        draw(e.pageX, e.pageY); // Chama a função de desenho
    }
}

// Função chamada ao soltar o botão do mouse
function mouseUpEvent() {
    canDraw = false; // Desabilita o desenho
}

// Função para desenhar na tela
function draw(x, y) {
    // Converte as coordenadas do mouse para o contexto da tela
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    // Inicia o desenho
    context.beginPath();
    context.lineWidth = 5; // Define a largura da linha
    context.lineJoin = "round"; // Define o formato das junções
    context.moveTo(mouseX, mouseY); // Move para o ponto inicial
    context.lineTo(pointX, pointY); // Cria uma linha até o ponto final
    context.closePath(); // Corrigido o erro de digitação (clousePath -> closePath)
    context.strokeStyle = currentColor; // Define a cor da linha
    context.stroke(); // Desenha a linha

    // Atualiza as coordenadas do mouse para o próximo ponto
    mouseX = pointX;
    mouseY = pointY;
}

function clearScreen() {
    context.setTransform(1, 0, 0, 1, 0, 0); // Reseta as transformações do contexto
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Limpa a tela
}





/* Anotações para o caderno */
// 1. Para obter o elemento clicado, usamos `e.target`.
// 2. Podemos capturar a posição do mouse com `e.pageX` (horizontal) e `e.pageY` (vertical).
// 3. Adicionar e remover classes em eventos:
//    - Sempre remova a classe primeiro para evitar conflitos:
//      `document.querySelector('.color.active').classList.remove('active')`
//    - Depois, adicione a nova classe:
//      `e.target.classList.add('active')`
// 4. Atenção: ao acessar classes com seletores, não pode haver espaços extras no seletor (ex.: `.color.active` está correto).
