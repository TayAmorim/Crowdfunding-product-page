export default function formatCurrency({ target }) {
  let clearValue = target.value.replace(/\D/g, "");
  clearValue = (clearValue / 100).toFixed(2).replace(".", ",");
  clearValue = "R$ " + clearValue;
  return clearValue;
}
