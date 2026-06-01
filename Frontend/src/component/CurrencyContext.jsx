import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const CurrencyContext = createContext();

const CURRENCY_MAP = {
  vi: { code: "VND", symbol: "VND" },
  en: { code: "NZD", symbol: "$NZ" },
  ja: { code: "JPY", symbol: "¥" },
};

export function CurrencyProvider({ children }) {
  const { i18n } = useTranslation();
  const [rate, setRate] = useState(1);

  const currentCurrency = CURRENCY_MAP[i18n.language] ?? CURRENCY_MAP.en;

  useEffect(() => {
    fetch(
      `https://v6.exchangerate-api.com/v6/1c60baf53e5d5e3e76ca49af/latest/NZD`,
    )
      .then((r) => r.json())
      .then((data) => setRate(data.conversion_rates[currentCurrency.code]));
  }, [i18n.language]);

  const convert = (amount) => {
    return `${(amount * rate).toLocaleString()} ${currentCurrency.symbol}`;
  };

  return (
    <CurrencyContext.Provider value={{ convert, currentCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);
