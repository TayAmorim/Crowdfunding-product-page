import outsideClick from "./outsideClick.js";

export default function initMenumobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const eventos = ["click", "touchstart"];

  function openMenu() {
    menuList.classList.add("active");
    menuButton.classList.add("active");
    outsideClick(menuList, eventos, () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
    });
  }
  if (menuButton) {
    eventos.forEach((event) => menuButton.addEventListener(event, openMenu));
  }
}