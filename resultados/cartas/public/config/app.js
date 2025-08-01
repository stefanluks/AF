import listaCartas from "../componentes/lista-cartas.js";
import lista from "../componentes/lista.js";

window.onload = () => {
    const render = document.getElementById("render");
    Start();
    function Start(){
        render.style.flexDirection = "column";
        let Titulo = document.createElement("h3");
        Titulo.textContent = "Memória Otaku";
        Titulo.id = "titulo";
        render.appendChild(Titulo);
        let btnIniciar = document.createElement("button");
        btnIniciar.className = "btn-start";
        btnIniciar.textContent = "Jogar"
        btnIniciar.addEventListener("click", () => {
            Jogar();
        });
        render.appendChild(btnIniciar);

    }
    function Jogar(){
        render.innerHTML = `<div class="loading"></div><h3 style="color: white;">Carregando</h3>`;
        let novaLista = [];
        let numeros = []
        // while(novaLista.length < listaCartas.length*2){
        //     let num = Math.floor((Math.random() * listaCartas.length) + 1);
        //     console.log(num);
        //     if(numeros.indexOf(num) == -1){
        //         let carta = listaCartas[num];
        //         novaLista.push(carta);
        //         console.log(carta);
        //         numeros.push(num);
        //     }
        // }
        render.style.flexDirection = "row";
        listaCartas.forEach(carta => {
            carta.CriarHtml();
            render.appendChild(carta.element);
        })
    }
    
}