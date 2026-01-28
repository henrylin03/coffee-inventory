const formatCurrency = (moneyInCents) =>
  new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" }).format(
    Number(moneyInCents) / 100,
  );

module.exports = { formatCurrency };
