const modalPlans = document.querySelector("[data-modal='plans']");
const supportButton = document.querySelector("[data-modal='btnSupport']");
const rewardButtons = document.querySelectorAll(".btn");
const buttonCloseModal = document.querySelector(".modal-img");
const btnPledges = document.querySelectorAll(".btn-pledges");

export default function initModal() {
  supportButton.addEventListener("click", showModal);
  buttonCloseModal.addEventListener("click", doNotShowModal);

  rewardButtons.forEach((button) =>
    button.addEventListener("click", openModalRewardSelected)
  );

  function showModal() {
    btnPledges.forEach((btn) => {
      btn.checked = false;
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
    btnPledges.forEach((btn) => {
      if (btn.id === btnPlan) {
        btn.checked = true;
      }
    });
  }
}
