import { api } from "./api.js";
import initInfoPlans from "./plans-info.js";

const titlesInformation = document.querySelectorAll("[data-information-title]");
const informationText = document.querySelector(".information-text");
const rangeValue = document.querySelector(".remaining-value");

export default async function initInfoProduct() {
  try {
    const response = await api.get(`/produto/1`);
    const { meta_valor, valor_arrecadado, total_apoios, data_limite } =
      response.data || {};
    function priceFormatting() {
      const formatterValue = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
      const amountRaised = formatterValue.format(valor_arrecadado / 100);
      const targetValue = formatterValue.format(meta_valor / 100);
      return { amountRaised, targetValue };
    }

    function nextDays() {
      const dayRemaining = dateFns.differenceInCalendarDays(
        new Date(data_limite),
        new Date()
      );
      return dayRemaining;
    }

    function manipulationText() {
      titlesInformation.forEach((title) => {
        if (title.dataset.informationTitle === "values") {
          title.innerText = ` ${priceFormatting().amountRaised}`;
          informationText.innerText = `${priceFormatting().targetValue}`;
        } else if (title.dataset.informationTitle === "backed") {
          title.innerText = ` ${total_apoios}`;
        } else {
          title.innerText = ` ${nextDays()}`;
        }
      });
    }
    manipulationText();
    inputRangeManipulation();

    function inputRangeManipulation() {
      const valueRange = valor_arrecadado / 100;
      const maxValueRange = meta_valor / 100;
      rangeValue.setAttribute("max", maxValueRange);
      updateBrandColor(valueRange);
    }

    function updateBrandColor(valueRange) {
      const moderateCyan = "#3cb4ac";
      const gray = "#ddd";
      const percent =
        ((valueRange - rangeValue.min) / (rangeValue.max - rangeValue.min)) *
        100;
      rangeValue.style.background = `linear-gradient(to right, ${moderateCyan} 0%, ${moderateCyan} ${percent}%, ${gray} ${percent}%, ${gray} 100%)`;
      rangeValue.setAttribute("value", percent * 1000);
    }
    initInfoPlans();
  } catch (error) {
    return console.log(error?.message);
  }
}
