
const caixa = document.getElementById("caixa");
const Tempo = document.getElementById("Time");
const Pontos = document.getElementById("Pontos");
const btnIniciar = document.getElementById("Iniciar")
const H2 = document.getElementById("h2")
const Title = document.getElementById("Title")

const More = document.getElementById("mais")
const LabelMore = document.getElementById("Label")
const UnlockBtn = document.getElementById("btnLock")

LabelMore.onclick = function (){
    if(LabelMore.textContent == "..."){
        LabelMore.textContent = "";
        LabelMore.style.display = "none"

        UnlockBtn.style.display = "block";
        UnlockBtn.style.padding = "auto";
    }else{
        LabelMore.textContent = "..."
        UnlockBtn.style.display = "none"
    }
}

const Body = document.getElementById("body")
Body.style.transition = "0.5s"

let Cont = 0;
let cartasViradas = 0;
let Fim = false;

let NewImg = "";

let idDaCarta
caixa.style.borderRadius = "50%"

let TempoRodando = false;
let TotalDeCartas = {
    "Defalt": 0,
    "/images/Placa_mae.png": 0,
    "/images/Memoria_ram.png": 0,
    "/images/Placa_de_video.png": 0,
    "/images/Processador.png": 0,
    "/images/Fonte.png": 0,
    "/images/GabineteBranco.png": 0,
    "/images/GabinetePreto.png": 0,
    "/images/HD.png": 0,
    "/images/SSD.png": 0,
    "/images/Cooler.png": 0,
};
let TotalDeCartasViradas = 0;


caixa.style.scale = 0;
let Dificult = "Easy";

document.getElementById("Easy").style.backgroundColor = "cyan";

const bntEasy = document.getElementById("Easy")
const bntMedium = document.getElementById("Medium");
const bntHard = document.getElementById("Hard");
const bntImpossible = document.getElementById("Impossible");

function RetirarBlock(){
    bntHard.onclick = function(){
        SelectDificult(3)
    }
    bntImpossible.onclick = function(){
        SelectDificult(4)
    }
    More.style.display = "none";
}

function SelectDificult(info){
    bntEasy.style.backgroundColor = "rgb(2, 194, 194)";
    bntMedium.style.backgroundColor = "rgb(2, 194, 194)";
    if(info == 1){
        Dificult = "Easy"
        bntEasy.style.backgroundColor = "cyan";
        Body.style.scale = "1"
        Body.style.background = "linear-gradient(to right, rgb(92, 90, 90), rgb(161, 159, 159), rgb(92, 90, 90) )"

        H2.textContent = "Dificuldade: Facil"
    }else if(info == 2){
        Dificult = "Medium"
        bntMedium.style.backgroundColor = "cyan";
        Body.style.scale = "1"
        Body.style.background = "linear-gradient(to right, rgb(92, 90, 90), rgb(161, 159, 159), rgb(92, 90, 90) )"

        H2.textContent = "Dificuldade: Médio"
    }else if(info == 3){
        Dificult = "Hard"
        bntHard.style.backgroundColor = "cyan";
        Body.style.scale = "1"
        Body.style.background = "linear-gradient(to right, rgb(92, 90, 90), rgb(161, 159, 159), rgb(92, 90, 90) )"

        H2.textContent = "Dificuldade: Dificil"
    }else if(info == 4){
        Dificult = "Impossible"
        bntImpossible.style.backgroundColor = "cyan";

        Body.style.background = "linear-gradient(to right, rgb(196, 59, 59), rgb(126, 5, 5), rgb(243, 7, 7) )"
        Body.style.scale = "1.03"
        H2.textContent = "Dificuldade: Impossivel!"
    }
}

function Dificuldade(){
    if(Dificult == "Easy"){
        return 5 * 2
    }else if(Dificult == "Medium"){
        return 10 * 2
    }else if(Dificult == "Hard"){
        return 15 * 2
    }else if(Dificult == "Impossible"){
        return 25 * 2
    }
}

let listaDeImg = [
    "Defalt",
    "images/Placa_mae.png",
    "images/Memoria_ram.png",
    "images/Placa_de_video.png",
    "images/Processador.png",
    "images/Fonte.png",
    "images/GabineteBranco.png",
    "images/GabinetePreto.png",
    "images/HD.png",
    "images/SSD.png",
    "images/Cooler.png"
]




function CreateCard(Foto){
    let CardContent = document.createElement("div")

    CardContent.style.width = "100px";
    CardContent.style.height = "100px";
    CardContent.style.margin = "10px";
    CardContent.textContent = "";
    CardContent.style.display = "flex"
    CardContent.style.justifyContent = "center"

    let NewCard = document.createElement("div")
    NewCard.className = "Cartao";

    NewCard.style.width = "100px";
    NewCard.style.height = "100px";
    NewCard.style.backgroundColor = "gray";
    NewCard.style.borderRadius = "4px";
    NewCard.style.fontSize = "85px";
    NewCard.style.margin = "0px";
    NewCard.textContent = "";

    NewCard.style.transition = "0.4s"

    NewCard.onclick = function (){
        if(TempoRodando == true){
            NewCard.style.width = "100px"

            return
        }else{
            NewCard.style.width = "0px"

            if(NewCard.textContent == "?"){
                NewCard.textContent = ""
                setTimeout(() => {
                NewCard.style.width = "100px"
                NewCard.textContent = ""
                }, 600);
            }else{
                setTimeout(() => {
                NewCard.style.width = "100px"
                Mostrar(NewCard)
                }, 600);
            }
            
        }
    }

    if(Foto){
        NewCard.id = Foto.id
        NewCard.appendChild(Foto)
    }

    CardContent.appendChild(NewCard)
    caixa.appendChild(CardContent)
}

function CreateFoto(id){
    NewImg = "";
    let img = document.createElement("img");

    if(id){
        img.src = id;
        img.id = id;
    }else{
        let num = Math.floor(Math.random() * Dificuldade() / 2 + 1);
        if(TotalDeCartas[listaDeImg[num]] == 2){
            return CreateFoto()
        }else{
            let url = window.location.href;
            img.src = url + listaDeImg[num];
            img.id = url + listaDeImg[num];

            TotalDeCartas[listaDeImg[num]] += 1;
        }
        
    }
    img.height = 100;
    img.width = 100;
    img.style.borderRadius = "5px";
    img.className = "img";

    NewImg = img;
}


let AnimationTitle = "";
function NewRound(){
    if(btnIniciar.textContent == "Parar"){
        return Stop()
    }
    Fim = false;

    caixa.innerHTML = ""
    caixa.style.transition = "0.2s"
    caixa.style.borderRadius = "8px"
    caixa.style.scale = 1;
    btnIniciar.textContent = "Parar";

    Tempo.textContent = "Tempo: 0"
    Pontos.textContent = "Pontos: 0"
    TotalDeCartas = {
    "Defalt": 0,
    "images/Placa_mae.png": 0,
    "images/Memoria_ram.png": 0,
    "images/Placa_de_video.png": 0,
    "images/Processador.png": 0,
    "images/Fonte.png": 0,
    "images/GabineteBranco.png": 0,
    "images/GabinetePreto.png": 0,
    "images/HD.png": 0,
    "images/SSD.png": 0,
    "images/Cooler.png": 0,
};

    for(i = 1; i <= Dificuldade(); i++){
        CreateFoto()
        CreateCard(NewImg)
    }

    TimerParaApagar(5)

    AnimationTitle = setInterval(() => {
        Title.style.color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`
    }, 1000);

}

function Stop(){
    Fim = true;
    caixa.style.borderRadius = "50%"
    caixa.style.scale = 0;
    btnIniciar.textContent = "Iniciar"

    Tempo.textContent = "Tempo: 0"
    Pontos.textContent = "Pontos: 0"
}

function Esconder() {
    let cartas = caixa.querySelectorAll(".img");

    cartas.forEach(function(carta) {
        if(carta.div){
        }else{
            carta.style.display = "none"
        }
    });
}

function Mostrar(Objeto){
    if(TempoRodando == true){
        return
    }else{
        cartasViradas += 1;
        console.log(cartasViradas+" Cartas Viradas!")

        let NewImg = document.createElement("img")
        NewImg.src = Objeto.id
        NewImg.id = Objeto.id
        NewImg.height = 100;
        NewImg.width = 100;
        NewImg.style.borderRadius = "5px";
        NewImg.className = "img";

        Objeto.appendChild(NewImg)

        if(cartasViradas == 2){
            if(Objeto.id == idDaCarta.id){
                Cont += 5
                TotalDeCartasViradas += 2;
                Pontos.textContent = ""
                Pontos.textContent = "Pontos: " + Cont;
                Objeto.onclick = function(){
                    return
                }
                let cartas = caixa.querySelectorAll(".img");

                cartas.forEach(function(carta) {
                    carta.className = "NoClearImg";
                    carta.style.scale = "1.02px";
                });
                idDaCarta = ""
                cartasViradas = 0;

            }else if(Objeto.id != idDaCarta.id){
                let intervalo = setInterval(() => {
                    Esconder()
                    cartasViradas = 0;
                    idDaCarta = ""
                    clearInterval(intervalo)
                }, 650);

            }

            TempoRodando = true;
        }else{
            idDaCarta = Objeto
        }

    console.log(Objeto.id)
    console.log("ID guardado: "+ idDaCarta.id)
    console.log(TotalDeCartasViradas)
}
} 

let IntervaloInicial = "";
let IntervaloFinal = "";

function TimerParaApagar(info){
    TempoRodando = true;

    IntervaloInicial = setInterval(function (){
        Tempo.textContent = "Tempo: " + info;
        if(info <= 0){
            TempoRodando = false;
            Esconder()
            TimerParaFimDeJogo(Dificuldade() * 1.7)

            return clearInterval(IntervaloInicial)
        }else{
            if(Fim == true){
                Tempo.textContent = "Tempo: 0";
                Pontos.textContent = "Pontos: 0";

                clearInterval(AnimationTitle)
                Title.style.color = "rgb(30, 30, 31)"
                return clearInterval(IntervaloFinal);
            }else if(TotalDeCartasViradas == Dificuldade()){
                let PontucaoFinal = Cont + Dificuldade() * 0.5;
                Tempo.textContent = "Parabéns!";
                Pontos.textContent = "Pontução Final: " + PontucaoFinal;

                clearInterval(AnimationTitle)
                Title.style.color = "rgb(30, 30, 31)"
                return clearInterval(IntervaloInicial);
            }
        }
        info--;
    }, 1000)
}
function TimerParaFimDeJogo(info){
    IntervaloFinal = setInterval(function (){
        Tempo.textContent = "Tempo: " + info;
        if(info <= 0){
            Tempo.textContent = "Fim De Jogo";
            Pontos.textContent = "Pontução Final: " + Cont;
            Esconder()
            btnIniciar.textContent = "Iniciar";
            TempoRodando = true;

            clearInterval(AnimationTitle)
            Title.style.color = "rgb(30, 30, 31)"
            return clearInterval(IntervaloFinal);
        }else{
            if(Fim == true){
                Tempo.textContent = "Tempo: 0";
                Pontos.textContent = "Pontos: 0";

                clearInterval(AnimationTitle)
                Title.style.color = "rgb(30, 30, 31)"
                return clearInterval(IntervaloFinal);
            }else if(TotalDeCartasViradas == Dificuldade()){
                let PontucaoFinal = Cont + Dificuldade() * 0.5;
                Tempo.textContent = "Parabéns!";
                Pontos.textContent = "Pontução Final: " + PontucaoFinal;

                clearInterval(AnimationTitle)
                Title.style.color = "rgb(30, 30, 31)"
                return clearInterval(IntervaloFinal);

            }
        }
        info--;
    }, 1000)
}