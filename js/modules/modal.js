import { api } from "./api.js";
import initInfoPlans from "./plans-info.js";
import initInfoProduct from "./product-info.js";

const modalPlans = document.querySelector("[data-modal='plans']");
const supportButton = document.querySelector("[data-modal='btnSupport']");
const rewardButtons = document.querySelectorAll("[data-button='reward']");
const buttonCloseModal = document.querySelector("[data-img='closed-modal']");
const btnPledges = document.querySelectorAll("[data-button='pledges']");
const modalSelect = document.querySelectorAll("[data-detail='modal']");
const modalSuccess = document.querySelector("[data-success]");
const btnClosedModalSuccess = modalSuccess.querySelector(".btn-pledgeComplet");
let errorActive = false;

export default function initModal() {
  supportButton.addEventListener("click", showModal);
  buttonCloseModal.addEventListener("click", doNotShowModal);

  rewardButtons.forEach((button) =>
    button.addEventListener("click", openModalRewardSelected)
  );

  btnPledges.forEach((pledge) =>
    pledge.addEventListener("click", openModalRewardSelected)
  );

  btnClosedModalSuccess.addEventListener("click", () =>
    modalSuccess.classList.add("doNotShow")
  );

  function showModal() {
    btnPledges.forEach((btn) => {
      btn.checked = false;
    });

    modalSelect.forEach((modal) => {
      modal.classList.add("doNotShow");
    });
    modalPlans.classList.remove("doNotShow");
    const scrollModal = modalPlans.scrollHeight;
    window.scrollTo(scrollModal, 0);
  }

  function doNotShowModal() {
    modalPlans.classList.add("doNotShow");
  }

  function openModalRewardSelected({ target }) {
    const element = target.dataset.id;
    showModal();
    showModalDetails(element);
  }

  function showModalDetails(name) {
    const modalDetailDiv = modalPlans.querySelector(`[data-plan=${name}]`);
    const modalDetail = modalDetailDiv.querySelector("[data-detail='modal']");

    btnPledges.forEach((pledge) => {
      if (pledge.dataset.id === name) {
        pledge.checked = true;
        modalDetail.classList.remove("doNotShow");
      }
      if (pledge.checked && pledge.id != name) {
        modalDetail.classList.add("doNotShow");
      }
      if (pledge.checked) {
        modalDetail.classList.remove("doNotShow");
      }
    });
    gettingSupportValue(modalDetail);
  }

  async function gettingSupportValue(element) {
    const inputDetails = element.querySelector(".input-pledge");
    const btnModalSelect = element.querySelector(".btn-modal-select");

    clearErrorMessage();

    inputDetails.value = "R$ ";
    inputDetails.addEventListener("input", formatCurrency);
    btnModalSelect.addEventListener("click", () =>
      gettingPlanId(inputDetails, element)
    );

    function formatCurrency({ target }) {
      let value = target.value.replace(/\D/g, "");
      value = (value / 100).toFixed(2).replace(".", ",");
      value = "R$ " + value;
      target.value = value;
    }
  }

  async function gettingPlanId(inputDetails, element) {
    const nameInput = inputDetails.name.split("-")[1];
    try {
      const valueFormattingInput = inputDetails.value.replace(/\D/g, "");
      const { data } = await api.get("/planos");
      const plans = data;
      const planId = plans.find(
        (plan) =>
          plan.nome.toLowerCase().includes(nameInput) || plan.nome == nameInput
      );

      if (planId.valor_minimo > Number(valueFormattingInput)) {
        const span = document.createElement("span");
        span.innerText = "Erro: Valor menor do que o permitido";
        span.classList.add("error");
        element.appendChild(span);
        errorActive = true;
        return;
      }

      await fulfillingPromise(planId.id, inputDetails.value);
    } catch (error) {
      console.log(error);
    }
  }

  async function fulfillingPromise(id, valor) {
    clearErrorMessage();
    const newPromise = {
      id_plano: id,
      valor: convertToNumber(valor),
    };
    try {
      await api.post("apoio", newPromise);
      initInfoPlans();
      initInfoProduct();
      doNotShowModal();
      modalSuccess.classList.remove("doNotShow");
    } catch (error) {
      console.log(error?.error);
    }
  }

  function convertToNumber(data) {
    const valueFormatting = data.replace(/\D/g, "");
    return Number(valueFormatting);
  }

  function clearErrorMessage() {
    if (errorActive) {
      const spanDelete = document.querySelector(".error");
      spanDelete.remove();
    }
  }
}
