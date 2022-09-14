const form = document.querySelector("form");
const input = document.querySelector("input");
const dados = document.querySelector(".dados");
const feedbackErro = document.querySelector(".erro");

form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  e.preventDefault();
  fetchCEP();
}

async function fetchCEP(e) {
  const resp = await fetch(`https://viacep.com.br/ws/${input.value}/json/`);
  const respData = await resp.json();
  if (respData.erro) {
    dados.style.display = "none"
    dados.innerHTML = ''

    feedbackErro.style.display = "block"
    feedbackErro.innerHTML = "<p>CEP inválido</p>"
  } else {
    return replaceDate(respData);
  }
}

function replaceDate(CEP) {
  feedbackErro.style.display = "none"
  feedbackErro.innerHTML = ''

  dados.style.display = "block"
  dados.innerHTML = `
  <ul>
  <li><strong>Estado:</strong> <span>${CEP.uf}</span></li>
  <li><strong>Cidade:</strong> <span>${CEP.localidade}</span></li>
  <li><strong>Bairro:</strong> <span>${CEP.bairro}</span></li>
  <li><strong>Rua:</strong> <span>${CEP.logradouro}</span></li>
  </ul>
  `;
}
