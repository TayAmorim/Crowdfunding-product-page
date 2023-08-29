export default function formattingPrice(price) {
  const formatterValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const priceFinally = formatterValue.format(price / 100);
  return priceFinally;
}
