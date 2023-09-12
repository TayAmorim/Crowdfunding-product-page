import { api } from "./api.js";
import getFormattingPrice from "./getFormattingPrice.js";

const cardsPlan = document.querySelectorAll("[data-plan]");

export default async function initInfoPlans() {
  try {
    const response = await api.get("/planos");
    const plans = response.data;

    plans.forEach((plan) => {
      const nomePlan = plan.nome.toLowerCase().split(" ");
      cardsPlan.forEach((card) => {
        if (nomePlan.includes(card.dataset.plan)) {
          const span = card.querySelector(".amount");
          const spanPrice = card.querySelector(".price");
          span.innerText = plan.quantidade;
          if (spanPrice) {
            const newPrice = getFormattingPrice(plan.valor_minimo);
            spanPrice.innerText = newPrice;
          }
          if (!plan.status) {
            card.classList.add("disabled");
          }
        }
      });
    });
  } catch (error) {
    return console.log(error?.message);
  }
}
