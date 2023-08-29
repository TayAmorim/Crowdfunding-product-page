export default function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const OUTSIDE = "data-outside";
  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(OUTSIDE);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }

  if (!element.hasAttribute(OUTSIDE)) {
    events.forEach((userEvent) => {
      setTimeout(() => html.addEventListener(userEvent, handleOutsideClick));
    });
    element.setAttribute(OUTSIDE, "");
  }
}
