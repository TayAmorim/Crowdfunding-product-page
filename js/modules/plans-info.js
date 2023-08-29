import { api } from "./api.js";

const cardsPlan = document.querySelectorAll("[data-plan]");

export default async function initInfoPlans() {
  try {
    const response = await api.get("/planos");
    const plans = response.data;
    for (let i = 0; i < plans.length; i++) {
      const nomePlan = plans[i].nome.split(" ");
      for (let card of cardsPlan) {
        if (nomePlan.includes(card.dataset.plan)) {
          const span = card.querySelector("span");
          span.innerText = plans[i].quantidade;
          console.log(cardsPlan);
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
