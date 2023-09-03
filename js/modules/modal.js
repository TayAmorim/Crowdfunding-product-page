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
    pledge.addEventListener("click", () => {
      modalSelect.forEach((modal) => {
        modal.classList.add("doNotShow");
      });
      const modalDetailDiv = modalPlans.querySelector(
        `[data-plan=${pledge.id}]`
      );
      const modalDetail = modalDetailDiv.querySelector(".modal-select");
      if (pledge.checked) {
        modalDetail.classList.remove("doNotShow");
      }
    })
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
    const btnPlan = target.dataset.btnReward;
    showModal();
    showModalDetails(btnPlan);
  }

  function showModalDetails(element) {
    const modalDetailDiv = modalPlans.querySelector(`[data-plan=${element}]`);
    const modalDetail = modalDetailDiv.querySelector(".modal-select");

    btnPledges.forEach((btn) => {
      if (btn.id === element) {
        btn.checked = true;
        modalDetail.classList.remove("doNotShow");
      }
      if (btn.checked && btn.id != element) {
        modalDetail.classList.add("doNotShow");
      }
    });
  }
}
