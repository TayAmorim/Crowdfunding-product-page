const modalPlans = document.querySelector("[data-modal='plans']");
const supportButton = document.querySelector("[data-modal='btnSupport']");
const rewardButtons = document.querySelectorAll(".btn");
const buttonCloseModal = document.querySelector(".modal-img");
const btnPledges = document.querySelectorAll(".btn-pledges");
const modalSelect = document.querySelectorAll(".modal-select");

export default function initModal() {
  supportButton.addEventListener("click", showModal);
  buttonCloseModal.addEventListener("click", doNotShowModal);

  rewardButtons.forEach((button) =>
    button.addEventListener("click", openModalRewardSelected)
  );

  btnPledges.forEach((pledge) =>
    pledge.addEventListener("click", openModalRewardSelected)
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
    const modalDetail = modalDetailDiv.querySelector(".modal-select");

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
  }
}
