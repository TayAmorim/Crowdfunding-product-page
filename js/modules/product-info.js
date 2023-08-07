const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const titlesInformation = document.querySelectorAll("[data-information-title]");
const informationText = document.querySelector(".information-text");

export default async function initInfoProduct() {
  const response = await api.get(`/produto/1`);
  const { meta_valor, valor_arrecadado, total_apoios } = response.data;

  const formatterValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const amountRaised = formatterValue.format(valor_arrecadado / 100);
  const targetValue = formatterValue.format(meta_valor / 100);

  titlesInformation.forEach((title) => {
    if (title.dataset.informationTitle === "values") {
      title.innerText = ` ${amountRaised}`;
      informationText.innerText = `${targetValue}`;
    } else if (title.dataset.informationTitle === "backed") {
      title.innerText = ` ${total_apoios}`;
    } else {
      title.innerText = ` ${0}`;
    }
  });
}