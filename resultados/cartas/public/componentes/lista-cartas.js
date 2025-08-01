import Carta from "../componentes/Carta.js";
import lista from "../componentes/lista.js";

const listaCartas = [];
lista.forEach((personagem, id) => {
    let split = personagem.split(" ");
    let img = "/public/images/"+split[split.length-1]+".png";
    listaCartas.push(new Carta(id, personagem, img));
});

export default listaCartas;