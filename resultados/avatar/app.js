// Exemplo simples de manipulação do botão Gerar
document.getElementById('avatarForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const personagem = document.getElementById('personagem').value;
    const olho = document.getElementById('olho').value;
    const sobrancelha = document.getElementById('sobrancelha').value;
    const boca = document.getElementById('boca').value;
    const cabelo = document.getElementById('cabelo').value;
    const oculos = document.getElementById('oculos').value;
    const naris = document.getElementById('naris').value;
    let probabilidade=100;
    if(oculos==""){
        probabilidade=0;
    }

    document.getElementById('avatarResultado').innerHTML = `
               <img
                    style="width: 200px; height: 200px;"
                    src="https://api.dicebear.com/9.x/lorelei/svg?seed=${personagem}&eyebrows=${sobrancelha}&eyes=${olho}&mouth=${boca}&hair=${cabelo}&glasses=${oculos}&nose=${naris}&glassesProbability=${probabilidade}&glassesColor=000000"
                    alt="avatar"
                /> 
                                
            `;
});