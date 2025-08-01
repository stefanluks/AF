let selecionado = null;
const botao = document.getElementById('btnGato');
const galeria = document. getElementById('galeria');

botao.addEventListener('click',  () => {
    galeria.innerHTML = ""

    fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => {
        const imagemUrl = data[0].url;
        const img = document.createElement('img');
        img.src = imagemUrl;
        img.onclick=()=>{
            let copia= document.createElement("img");
            copia.src=imagemUrl;
            copia.className = "cartao";
            document.body.appendChild(copia);
            selecionado = copia;
        }
        galeria.appendChild(img);
    })
    .catch(() => alert('erro ao buscar gato, tente novemente'));
});

document.addEventListener("mousemove",e =>{
    if(selecionado !== null){
        selecionado.style.top = e.clientY+"px";
        selecionado.style.left = e.clientX+"px";
    }

});


document.addEventListener("mousedown",e =>{
    if(selecionado)selecionado = null;
});
function limpar(){
    let imagens = document. querySelectorAll("img");
    imagens.forEach(image =>{
        image.remove();
    });
} 