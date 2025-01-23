
// Captura qualquer tecla que foi pressionada no site e chama a função playSound
// Convertendo o código da tecla para letras minúsculas antes de passar como parâmetro.
document.body.addEventListener('keyup', (event) => {
    playSound(event.code.toLowerCase());
});

// Transforma o texto inserido no input em um array e o passa como parâmetro
// para a função que toca a composição das teclas.
document.querySelector('.composer button').addEventListener('click', () => {
    let song = document.querySelector('#input').value; // Captura o valor do input
    if (song !== '') { // Verifica se o input não está vazio
        let songArray = song.split(''); // Divide o texto em um array de caracteres
        playComposition(songArray); // Passa o array para a função
    }
});

/**
 * obs: lembra sempre da poha do template string que voce pode usar em qualquer situaçao, ai msm usei pra pegar a tecla baseada na que eu apertei 
 * Função responsável por tocar o som baseado na tecla pressionada.
 * Também adiciona e remove a classe 'active' no elemento visual correspondente
 * para indicar que ele está sendo ativado.
 * 
 * @param {string} sound - O código da tecla convertido para o formato correto.
 */
function playSound(sound) {
    let audioElement = document.querySelector(`#s_${sound}`); // Seleciona o elemento de áudio
    let keyElement = document.querySelector(`div[data-key="${sound}"]`); // Seleciona a tecla correspondente no DOM

    if (audioElement) { // Verifica se o som existe
        audioElement.currentTime = 0; // Reinicia o áudio
        audioElement.play(); // Toca o som
    }

    if (keyElement) { // Verifica se a tecla existe
        keyElement.classList.add('active'); // Adiciona a classe 'active' para o efeito visual

        // Remove a classe 'active' após 300ms
        setTimeout(() => {
            keyElement.classList.remove('active');
        }, 300);
    }
}

/**
 * Toca uma composição de teclas em sequência usando um intervalo.
 * 
 * @param {Array} songArray - Um array contendo os códigos das teclas que serão tocadas.
 */
function playComposition(songArray) {
    let wait = 0; // Tempo inicial para cada som começar

    songArray.forEach(element => {
        setTimeout(() => {
            playSound(`key${element}`); // Chama a função playSound com cada tecla no tempo correto
        }, wait);

        wait += 250; // Incrementa o tempo para tocar a próxima tecla
    });
}
