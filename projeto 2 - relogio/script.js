// Seleciona a div do relógio digital que exibirá o horário em formato HH:MM:SS
let digitalElement = document.querySelector('.digital');

// Seleciona as divs dos ponteiros de segundos, minutos e horas do relógio analógico
let sElement = document.querySelector('.p_s'); // Ponteiro dos segundos
let mElement = document.querySelector('.p_m'); // Ponteiro dos minutos
let hElement = document.querySelector('.p_h'); // Ponteiro das horas

// Função responsável por atualizar o relógio digital e a posição dos ponteiros
function updateClock() {
    // Obtém o horário atual usando o objeto Date
    let now = new Date();
    let hour = now.getHours(); // Hora atual
    let minuete = now.getMinutes(); // Minutos atuais
    let second = now.getSeconds(); // Segundos atuais

    // Atualiza o relógio digital no formato HH:MM:SS, garantindo zero à esquerda para números menores que 10
    digitalElement.innerHTML = `${minhaSoluçao(hour)}:${minhaSoluçao(minuete)}:${minhaSoluçao(second)}`;

    // Calcula os ângulos de rotação para os ponteiros do relógio analógico
    let sFormatado = ((360 / 60) * second) - 90; // Ângulo do ponteiro dos segundos
    let mFormatado = ((360 / 60) * minuete) - 90; // Ângulo do ponteiro dos minutos
    let hFormatado = ((360 / 12) * hour) - 90;    // Ângulo do ponteiro das horas

    // Aplica os ângulos calculados aos ponteiros, ajustando a rotação
    sElement.style.transform = `rotate(${sFormatado}deg)`;
    mElement.style.transform = `rotate(${mFormatado}deg)`;
    hElement.style.transform = `rotate(${hFormatado}deg)`;
}

// Configura o relógio para atualizar automaticamente a cada 1 segundo
setInterval(updateClock, 1000);

// Função para adicionar um zero à esquerda em números menores que 10
function minhaSoluçao(time) {
    let newhora = time.toString().split(''); // Converte o número para string e divide em caracteres
    if (newhora.length < 2) { // Verifica se o número tem apenas 1 dígito
        return `0${time}`;    // Retorna o número com um zero à esquerda
    } else {
        return time;          // Retorna o número original se já tiver 2 dígitos
    }
}



// funcao feita no curso, porem prefiro a minha pq foi eu que fiz kkk
/*function fixZero(time) {
    if(time < 10) {
        return '0' + time
    } else {
        return time
    }
}*/