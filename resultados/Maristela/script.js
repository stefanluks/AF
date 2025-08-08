const Tabuleiro = document.getElementById("tabuleiro");
// Lista de cartas com pares duplicados
const cartas =["🍎", "🍌",  "🍇",  "🍓",  "🍍",  "🥝",  "🍒",  "🍉",  "🍐"];
let cartasDuplicadas = [...cartas, ...cartas];

//embaralha as cartas aleatoriamente
cartasDuplicadas.sort(() => 0.5 - Math.random());

let primeiraCarta = null;
let segundaCrta = null;
let travarTabuleiro = false;

// Cria as cartas na tela
cartasDuplicadas.forEach((simbolo)=> {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.dataset.simbolo = simbolo;
    carta.textContent ="";

    carta.addEventListener("click", () => {
        if (travarTabuleiro || carta.classList.contains("revelada")) return;

        carta.textContent = simbolo;
        carta.classList.add("revelada");

        if (!primeiraCarta) {
            primeiraCarta = carta;
        } else {
            segundaCarta = carta;
            travarTabuleiro = true;
            
            if (primeiraCarta.dataset.simbolo === segundaCarta.dataset.simbolo) {
                primeiraCarta = null;
                segundaCarta = null;
                travarTabuleiro = false;

                verificarVitoria();
            }   else {
                setTimeout(() => {
                    primeiraCarta.textContent ="";
                    segundaCarta.textContent ="";
                    primeiraCarta.classList.remove("revelada");
                    segundaCarta.classList.remove("revelada");
                    primeiraCarta = null;
                    segundaCarta = null;
                    travarTabuleiro = false;
                },   1000); 
            }
        }

    });

    Tabuleiro.appendChild(carta);
});

//Verifica se todas as cartas foram reveladas 
function verificarVitoria() {
       const todasReveladas =
       document.querySelectorAll(".carta.revelada");
       if (todasReveladas.length === cartasDuplicadas.length) {
        setTimeout(() => {
            alert("Parabéns! Você venceu!");
            location.reload();
        },  500);
       }
}