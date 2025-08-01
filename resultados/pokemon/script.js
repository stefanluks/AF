const tiposTraduzidos = {
  normal: "Normal", fire: "Fogo", water: "Água", electric: "Elétrico",
  grass: "Grama", ice: "Gelo", fighting: "Lutador", poison: "Venenoso",
  ground: "Terrestre", flying: "Voador", psychic: "Psíquico", bug: "Inseto",
  rock: "Pedra", ghost: "Fantasma", dragon: "Dragão", dark: "Sombrio",
  steel: "Aço", fairy: "Fada"
};

async function carregarPokemon() {
  const id = Math.floor(Math.random() * 150) + 1;
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const nome = data.name.toUpperCase();
    const tipos = data.types.map(t => tiposTraduzidos[t.type.name] || t.type.name).join(', ');
    const nivel = Math.floor(Math.random() * 100) + 1;
    let imagem = data.sprites.other['official-artwork'].front_default;
    if (!imagem) imagem = data.sprites.front_default;
    if (!imagem) imagem = "pokeball.png";
    document.getElementById("pokeNome").textContent = nome;
    document.getElementById("pokeTipo").textContent = tipos;
    document.getElementById("pokeNivel").textContent = nivel;
    document.getElementById("pokeImage").src = imagem;
  } catch (error) {
    alert("Erro ao carregar Pokémon. Verifique sua internet.");
  }
}

function gerarSenha() {
  const maiusculas = document.getElementById("maiusculas").checked;
  const minusculas = document.getElementById("minusculas").checked;
  const numeros = document.getElementById("numeros").checked;
  const simbolos = document.getElementById("simbolos").checked;
  if (!maiusculas && !minusculas && !numeros && !simbolos) {
    alert("Selecione pelo menos uma opção.");
    return;
  }
  const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
  const numerosChars = "0123456789";
  const simbolosChars = "!@#$%&*";
  let chars = "";
  if (maiusculas) chars += letrasMaiusculas;
  if (minusculas) chars += letrasMinusculas;
  if (numeros) chars += numerosChars;
  if (simbolos) chars += simbolosChars;
  let senha = "";
  for (let i = 0; i < 12; i++) {
    const rand = Math.floor(Math.random() * chars.length);
    senha += chars[rand];
  }
  document.getElementById("senhaGerada").value = senha;
}

function copiarSenha() {
  const campo = document.getElementById("senhaGerada");
  campo.select();
  document.execCommand("copy");
  alert("Senha copiada para a área de transferência!");
}