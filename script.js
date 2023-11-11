const input = document.getElementById("input-busca");

const apiKey = "f09ada60b7a7d1c47ec6a338e0d963ed";

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
  input.style.padding = "0.5rem .5rem .5rem 3.1rem";
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
