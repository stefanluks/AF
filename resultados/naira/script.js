const fom = document.getElementById("avatar")
const img = document.getElementById("imagem")
fom.addEventListener("submit", event => {
    event.preventDefault()
    let genero=document.getElementById("genero").value;
    let olho=document.getElementById("olho").value;
    let boca=document.getElementById("boca").value;
    let cabelo=document.getElementById("cabelo").value;
    let cabelocor=document.getElementById("cabelo-cor").value;
    let face=document.getElementById("Face").value;
    img.innerHTML = `
    <img
  src="https://api.dicebear.com/9.x/croodles/svg?seed=${genero}&eyes=${olho}&mouth=${boca}&top=${cabelo}&topColor=${cabelocor}&face=${face}"
  alt="avatar"
/>
    `

})
