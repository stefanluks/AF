export default class Carta{
    constructor(id, nome, carta_frente){
        this.id = id;
        this.nome = nome;
        this.virada = false;
        this.img_frente = carta_frente;
        this.img_costas = "/public/images/Costas.png";
    }

    CriarHtml(){
        this.element = this.Criar("div", this.id, "carta virada",null, null, [
            {
                tipo:"click",
                acao: () => {
                    if(this.virada) this.element.className = "carta virada";
                    else this.element.className = "carta";
                    this.virada = !this.virada;
                }
            }
        ]);
        let frente = this.Criar("div",null,"carta-frente",null, [{nome:"style",valor:"background-image: url("+this.img_frente+");"}]);
        let costas = this.Criar("div",null,"carta-costas",null, [{nome:"style",valor:"background-image: url("+this.img_costas+");"}]);
        this.element.appendChild(frente);
        this.element.appendChild(costas);
    }
    Criar(elemento, id, classe, conteudo, atributos, funcoes){
        let final = document.createElement(elemento);
        if(id) final.id = id;
        if(classe) final.className = classe;
        if(conteudo) final.textContent = conteudo;
        if(atributos) atributos.forEach(atributo=>{final.setAttribute(atributo.nome, atributo.valor)});
        if(funcoes) funcoes.forEach(funcao => {final.addEventListener(funcao.tipo, funcao.acao)})
        return final;
    }
}