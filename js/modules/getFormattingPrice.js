export default function getFormattingPrice(price) {
  const formatterValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatterValue.format(price / 100);
}
