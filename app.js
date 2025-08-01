window.onload = () => {
    const lista = document.getElementById("lista");
    lista.innerHTML = ``;
    let url = window.location.href;
    fetch(url+"lista.json").then(data => data.json()).then(dados => {
        // console.log(dados);
        dados.forEach(app => {
            let card = `
            <div class="card m-2" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${app.nome}</h5>
                    <p class="card-text"><b>Aluno: </b> ${app.aluno}</p>
                    <a href="${url+app.pasta}" class="w-100 btn btn-primary">Visualizar</a>
                </div>
            </div>`;
            lista.innerHTML += card;
        });
    })
}