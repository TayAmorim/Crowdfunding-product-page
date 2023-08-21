import { api } from "./api.js";

const wrapperCards = document.querySelectorAll("[data-wrapper]");
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
          const spanModal = wrapperCards[i].querySelector(".amount");
          span.innerText = plans[i].quantidade;

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
