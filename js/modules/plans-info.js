import { api } from "./api.js";
import formattingPrice from "./formattingPrice.js";

const cardsPlan = document.querySelectorAll("[data-plan]");

export default async function initInfoPlans() {
  try {
    const response = await api.get("/planos");
    const plans = response.data;
    for (let i = 0; i < plans.length; i++) {
      const nomePlan = plans[i].nome.toLowerCase().split(" ");
      for (let card of cardsPlan) {
        if (nomePlan.includes(card.dataset.plan)) {
          const span = card.querySelector(".amount");
          const spanPrice = card.querySelector(".price");
          span.innerText = plans[i].quantidade;
          if (spanPrice) {
            const newPrice = formattingPrice(plans[i].valor_minimo);
            spanPrice.innerText = newPrice;
          }
          if (!plans[i].status) {
            card.classList.add("disabled");
          }
        }
      }
    }
  } catch (error) {
    return console.log(error?.message);
  }
}
