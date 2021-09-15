import axios from "axios";

export default async function getCurrencyRates() {
  const res = await axios.get(
    `https://api.currencyfreaks.com/latest?apikey=${process.env.REACT_APP_API_TOKEN}`
  );
  return res.data.rates;
}
