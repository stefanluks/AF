const apikey = "d5876314"
const url = `http://www.omdbapi.com/?apikey=${apikey}&t=`
const lista = document.getElementById("lista")
lista.innerHTML = ""
let entrada = document.getElementById("nome-filme");
let btnvoltar = document.getElementById("btnvoltar");
function Pesquisar(){
    let filme = entrada.value;
    fetch(url+filme)
    .then(data => data.json())
    .then(json => {
         lista.innerHTML = ""
         btnvoltar.hidden = false
        let div = `
            <div class="card m-2" style="width: 18rem; height: 51rem">
                <img src="${json.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${json.Title}</h5>
                    <p class="card-text">${json.Director}, ${json.Year}, ${json.Genre}, ${json.Plot}, ${json.Country}</p>
                    <a href="#" class="btn btn-primary">See more</a>
                </div>
            </div>            
            `
            lista.innerHTML += div

    });
}
let filmes = ["Superman","Willow","Tron","1984","Jumper","Ben-Hur","Wicked","Avatar","Iron Man","Spider-man","RoboCop","Akira"]
filmes.forEach(f => {
   
    fetch(url + f)
        .then(data => { return data.json() })
        .then(json => {
            console.log(json)

            let div = `
            <div class="card m-2" style="width: 18rem; height: 51rem">
                <img src="${json.Poster}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${json.Title}</h5>
                    <p class="card-text">${json.Director}, ${json.Year}, ${json.Genre}, ${json.Plot}, ${json.Country}</p>
                    <a href="#" class="btn btn-primary">See more</a>
                </div>
            </div>            
            `
            lista.innerHTML += div
        }).catch(erro =>{console.log(f,erro)})
})

