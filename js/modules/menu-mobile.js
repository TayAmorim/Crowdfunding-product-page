export default function initMenumobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuLIst = document.querySelector(".lista");
  const eventos = ["click", "touchstart"];

  menuButton.addEventListener("click", opneMenu);

  function opneMenu() {
    menuLIst.classList.add("active");
    menuButton.classList.add("active");
  }
}
