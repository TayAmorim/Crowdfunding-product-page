const modalPlans = document.querySelector("[data-modal='plans']");
const supportButton = document.querySelector("[data-modal='btnSupport']");
const rewardButtons = document.querySelectorAll(".btn");
const buttonCloseModal = document.querySelector(".modal-img");

export default function initModal() {
  supportButton.addEventListener("click", showModal);
  buttonCloseModal.addEventListener("click", doNotShowModal);
  rewardButtons.forEach((button) =>
    button.addEventListener("click", showModal)
  );

  function showModal() {
    modalPlans.classList.remove("doNotShow");
    const scrollModal = modalPlans.scrollHeight;
    window.scrollTo(scrollModal, 0);
  }

  function doNotShowModal() {
    modalPlans.classList.add("doNotShow");
  }
}
