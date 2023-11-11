const input = document.getElementById("input-busca");

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

function movimentoInput(inputValue) {
  const visibility = input.style.visibility;

  console.log(inputValue);

  visibility === "hidden" ? abrirInput() : fecharInput();
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
