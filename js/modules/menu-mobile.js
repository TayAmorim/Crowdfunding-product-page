import outsideClick from "./outsideClick.js";

export default function initMenumobile() {
  const menuButton = document.querySelector('[data-menu="button"]');
  const menuList = document.querySelector('[data-menu="list"]');
  const events = ["click", "touchstart"];

  function openMenu() {
    menuList.classList.add("active");
    menuButton.classList.add("active");
    outsideClick(menuList, events, () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
    });
  }
  if (menuButton) {
    events.forEach((event) => menuButton.addEventListener(event, openMenu));
  }
}
