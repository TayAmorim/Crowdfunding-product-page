const api = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

const cardsInformation = document.querySelector('[data-information="values"]');

export default async function initMain() {
  const response = await api.get(`/produto/1`);
  console.log(cardsInformation);
}
