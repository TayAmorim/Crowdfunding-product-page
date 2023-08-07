const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const titlesInformation = document.querySelectorAll("[data-information-title]");

export default async function initMain() {
  const response = await api.get(`/produto/1`);
  const { meta_valor, valor_arrecadado } = response.data;

  titlesInformation.forEach((title) => {
    if (title.dataset.informationTitle === "values") {
      title.innerText = `RS ${valor_arrecadado / 100}`;
    }
  });
}
