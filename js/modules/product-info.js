import { api } from "./api.js";
import getFormattingPrice from "./getFormattingPrice.js";
import initInfoPlans from "./plans-info.js";
const supportButton = document.querySelector("[data-modal='btnSupport']");
const titlesInformation = document.querySelectorAll("[data-information-title]");
const informationText = document.querySelector("[data-information='text']");
const rangeValue = document.querySelector("[data-remaining='value']");
const rewardButtons = document.querySelectorAll("[data-button='reward']");

export default async function initInfoProduct() {
  try {
    const response = await api.get(`/produto/1`);
    const { meta_valor, valor_arrecadado, total_apoios, data_limite, status } =
      response.data || {};

    function nextDays() {
      const dayRemaining = dateFns.differenceInCalendarDays(
        new Date(data_limite),
        new Date()
      );
      return dayRemaining;
    }

    if (!status) {
      supportButton.classList.add("disabled");
      rewardButtons.forEach((button) => button.classList.add("disabled"));
    }

    function setTitleInformations() {
      titlesInformation.forEach((title) => {
        if (title.dataset.informationTitle === "values") {
          title.innerText = ` ${getFormattingPrice(valor_arrecadado)}`;
          informationText.innerText = `${getFormattingPrice(meta_valor)}`;
        } else if (title.dataset.informationTitle === "backed") {
          title.innerText = ` ${total_apoios}`;
        } else {
          title.innerText = ` ${nextDays()}`;
        }
      });
    }
    setTitleInformations();
    inputRangeManipulation();

    function inputRangeManipulation() {
      const valueRange = valor_arrecadado / 100;
      const maxValueRange = meta_valor / 100;
      rangeValue.setAttribute("max", maxValueRange);
      updateBrandColor(valueRange);
    }

    function updateBrandColor(valueRange) {
      const MODERATECYAN = "#3cb4ac";
      const GRAY = "#ddd";
      const percent =
        ((valueRange - rangeValue.min) / (rangeValue.max - rangeValue.min)) *
        100;
      rangeValue.style.background = `linear-gradient(to right, ${MODERATECYAN} 0%, ${MODERATECYAN} ${percent}%, ${GRAY} ${percent}%, ${GRAY} 100%)`;
      rangeValue.setAttribute("value", percent * 1000);
    }
    initInfoPlans();
  } catch (error) {
    return console.log(error?.message);
  }
}
