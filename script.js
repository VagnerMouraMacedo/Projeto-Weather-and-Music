const input = document.getElementById("input-busca");
const apiKey = "f09ada60b7a7d1c47ec6a338e0d963ed";

const clientID = "79573352d0be42b29c88be837412dd63";
const clientSecret = "1d8335b71405417591bc55908d9d4dc5";

function movimentoInput(inputValue) {
  const visibility = input.style.visibility;

  inputValue && procurarCidade(inputValue);

  visibility === "hidden" ? abrirInput() : fecharInput();
}

function botaoDeBusca() {
  const inputValue = input.value;
  movimentoInput(inputValue);
}

function fecharInput() {
  input.style.visibility = "hidden";
  input.style.width = "40px";
  input.style.padding = "0.5rem .5rem .5rem 2.6rem";
  input.style.transition = "all 0.5s ease-in-out 0s";
  input.value = "";
}

function abrirInput() {
  input.style.visibility = "visible";
  input.style.width = "300px";
  input.style.padding = "0.5rem .5rem .5rem 3.3rem";
  input.style.transition = "all 0.5s ease-in-out 0s";
}

input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const valorInput = input.value;
    movimentoInput(valorInput);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fecharInput();
});

async function procurarCidade(city) {
  try {
    const dados = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
    );

    if (dados.status === 200) {
      const resultado = await dados.json();

      obterTopAlbunsPorPais(resultado.sys.country);

      mostraClimaNatela(resultado);
      console.log(resultado, "<<");
    } else {
      throw new Error();
    }
  } catch {
    alert("A pesquisa por cidade está incorreta!");
  }
}

function mostraClimaNatela(resultado) {
  document.querySelector(
    ".icone-tempo"
  ).src = `./assets/${resultado.weather[0].icon}.png`;

  document.querySelector(".nome-cidade").innerHTML = `${resultado.name}`;
  document.querySelector(
    ".temperatura"
  ).innerHTML = `${resultado.main.temp.toFixed(0)}°C`;
  document.querySelector(
    ".maxTemperatura"
  ).innerHTML = `Máx:${resultado.main.temp_max.toFixed(0)}°C`;
  document.querySelector(
    ".minTemperatura"
  ).innerHTML = `Mín:${resultado.main.temp_min.toFixed(0)}°C`;
}

async function obterAcessoToken() {
  const credentials = `${clientID}:${clientSecret}`;
  const encodedCredentials = btoa(credentials);

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },

    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

function obterDataAtual() {
  const currentDate = new Date();
  const ano = currentDate.getFullYear();
  const mes = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const dia = currentDate.getDate().toString().padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

async function obterTopAlbunsPorPais(country) {
  try {
    const accessToken = await obterAcessoToken();

    const dataAtual = obterDataAtual();

    const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${dataAtual}T15%3A08%3A00&limit=3`;

    const resultado = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (resultado.status === 200) {
      const data = await resultado.json();

      const result = data.playlists.items.map((item) => ({
        name: item.name,
        image: item.images[0].url,
      }));

      console.log(result);
    } else {
      throw new Error();
    }
  } catch {
    alert("Sua pesquisa por musica deu errado!");
  }
}
