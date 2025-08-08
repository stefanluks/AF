window.onload = () => {
    const lista = document.getElementById("lista");
    lista.innerHTML = ``;
    let url = window.location.href;
    fetch(url+"lista.json").then(data => data.json()).then(dados => {
        console.log(dados);
        dados.forEach(Turma => {
            let card = document.createElement("div");
            card.className = "card m-2";
            card.style = "width: 18rem;";
            let body = document.createElement("div");
            body.className = "card-body";
            let turma = document.createElement("h5");
            turma.className = "card-title";
            turma.textContent = "Turma: "+Turma.turma;
            let curso = document.createElement("p");
            curso.className = "card-text";
            curso.textContent = Turma.curso;
            let botao = document.createElement("div");
            botao.className = "w-100 btn btn-primary";
            botao.textContent = "Vê Projetos";
            botao.onclick = () => {
                lista.innerHTML = null;
                Turma.projetos.forEach(app => {
                    let teste = `
                    <div class="card m-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">${app.nome}</h5>
                            <p class="card-text"><b>Aluno:</b> ${app.aluno}</p>
                            <a href="${url+app.pasta}" class="w-100 btn btn-primary">Vê Projetos</a>
                        </div>
                    </div>`;
                    lista.innerHTML += teste;
                })
                
            }
            body.appendChild(turma);
            body.appendChild(curso);
            body.appendChild(botao);
            card.appendChild(body);
            lista.appendChild(card);
            
        });
    })
}