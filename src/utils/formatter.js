const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const priceFormatter = price => priceFormat.format(price);