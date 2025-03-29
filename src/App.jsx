import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./index.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurr, setFromCurr] = useState("INR");
  const [toCurr, setToCurr] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurr}&to=${toCurr}`
        );
        const data = await res.json();
        setResult(data.rates[toCurr]);
      } catch (error) {
        console.error("Conversion error:", error);
        setResult("Error in conversion");
      } finally {
        setIsLoading(false);
      }
    }

    if (fromCurr === toCurr) {
      setResult(amount);
      return;
    }
    convert();
  }, [amount, fromCurr, toCurr]);

  return (
    <div className="currency-converter">
      <h1 className="title">Currency Converter</h1>

      <div className="converter-container">
        <div className="input-group">
          <label htmlFor="amount">Amount</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.01"
          />
        </div>

        <div className="select-group">
          <div className="select-container">
            <label htmlFor="from-currency">From</label>
            <select
              id="from-currency"
              value={fromCurr}
              onChange={(e) => setFromCurr(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <div className="swap-icon">⇄</div>

          <div className="select-container">
            <label htmlFor="to-currency">To</label>
            <select
              id="to-currency"
              value={toCurr}
              onChange={(e) => setToCurr(e.target.value)}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </div>
        </div>

        <div className="result-container">
          {isLoading ? (
            <div className="loader"></div>
          ) : (
            <div className="result-display">
              <p className="conversion-text">
                {amount} {fromCurr} =
              </p>
              <p className="conversion-result">
                {result} {toCurr}
              </p>
              <p className="disclaimer">Rates provided by Frankfurter API</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
