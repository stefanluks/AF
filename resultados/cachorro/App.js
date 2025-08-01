const url = 'https://api.allorigins.win/raw?url=https://dog.ceo/api/breeds/image/random/'
const botao =document.getElementById('btnCachorro');
const galeria=document.getElementById('galeria');
let selecionado =null;

botao.addEventListener('click',()=> {
    fetch('https://random.dog/woof.json')
    .then(response => {return response.json()})
    .then(data => {
        galeria.innerHTML=""
        const imagemUrl = data.url;
        const img = document.createElement('img');
        img.src=imagemUrl;
        img.onclick=()=>{
            let copia =document.createElement("img");
            copia.src =imagemUrl;
            copia.className ="Cartao";
            document.body.appendChild(copia);
            selecionado =copia;

        }
        galeria.appendChild(img);
    })
    .catch(() => alert('Erro ao buscar cachorro, tente novamente!'));
});


document.addEventListener("mousemove",e =>{
    if(selecionado!==null){
        selecionado.style.top = e.clientY +"px";
        selecionado.style.left = e.clientX + "px";
    }
});


document.addEventListener("mousedown",e =>{
    if(selecionado)selecionado = null;
});

function Limpar(){
    let imagens = document.querySelectorAll("img")
    imagens.forEach(imagem =>{
        imagem.remove();

    });
}

        

        
        
        

    



