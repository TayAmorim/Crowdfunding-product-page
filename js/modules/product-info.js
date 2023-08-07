import { api } from "./api.js";

const titlesInformation = document.querySelectorAll("[data-information-title]");
const informationText = document.querySelector(".information-text");
const rangeValue = document.querySelector(".remaining-value");

export default async function initInfoProduct() {
  const response = await api.get(`/produto/1`);
  const { meta_valor, valor_arrecadado, total_apoios, data_limite } =
    response.data;

  const formatterValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const amountRaised = formatterValue.format(valor_arrecadado / 100);
  const targetValue = formatterValue.format(meta_valor / 100);
  const dayRemaining = dateFns.differenceInCalendarDays(
    new Date(data_limite),
    new Date()
  );

  titlesInformation.forEach((title) => {
    if (title.dataset.informationTitle === "values") {
      title.innerText = ` ${amountRaised}`;
      informationText.innerText = `${targetValue}`;
    } else if (title.dataset.informationTitle === "backed") {
      title.innerText = ` ${total_apoios}`;
    } else {
      title.innerText = ` ${dayRemaining}`;
    }
  });
  const valueRange = valor_arrecadado / 100;
  const maxValueRange = meta_valor / 100;

  rangeValue.setAttribute("max", maxValueRange);

  function updateBandColor() {
    const percent =
      ((valueRange - rangeValue.min) / (rangeValue.max - rangeValue.min)) * 100;
    rangeValue.style.background = `linear-gradient(to right, #3cb4ac 0%, #3cb4ac ${percent}%, #ddd ${percent}%, #ddd 100%)`;
    rangeValue.setAttribute("value", percent * 1000);
  }

  updateBandColor();
}
