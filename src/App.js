import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// components
import Header from "./components/Header/Header";
import NumInput from "./components/NumInput/NumInput";
import SwapBtn from "./components/SwapBtn/SwapBtn";
import SelectInput from "./components/SelectInput/SelectInput";
import MinExchangeWarning from "./components/MinExchangeWarning/MinExchangeWarning";
import AddressBlock from "./components/AddressBlock/AddressBlock";

import "./App.css";

const url = "https://api.changenow.io/v1/currencies?active=true";

function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [minimalExchange, setMinimalExchange] = useState(null);
  const [currenciesPosition, setCurrenciesPosition] = useState(true);

  const [optionValue, setOptionValue] = useState(null);
  const [optionValue2, setOptionValue2] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");

  const getAllCurrencies = () => {
    return axios.get(url).then((res) => setAllCurrencies(res.data));
  };

  const getMinimalExchange = () => {
    return axios
      .get(
        `https://api.changenow.io/v1/min-amount/${optionValue}_${optionValue2}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`
      )
      .then((res) => setMinimalExchange(res.data));
  };

  const getExchangeAmount = () => {
    if (inputValue > minimalExchange.minAmount) {
      return axios
        .get(
          `https://api.changenow.io/v1/exchange-amount/${inputValue}/${optionValue}_${optionValue2}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`
        )
        .then((res) => setInputValue2(res.data.estimatedAmount));
    } else setInputValue2("-");
  };

  useEffect(() => {
    getAllCurrencies();
  }, []);

  useEffect(() => {
    if (optionValue && optionValue2) {
      getMinimalExchange();
    }
  }, [optionValue, optionValue2]);

  useEffect(() => {
    if (inputValue && optionValue && optionValue2) {
      getExchangeAmount();
    }
  }, [inputValue, optionValue, optionValue2]);

  const options = useMemo(() => {
    return (
      allCurrencies.map((item) => ({
        value: item.ticker,
        label: item.ticker,
      })) || []
    );
  }, [allCurrencies]);

  return (
    <div className="App">
      <div className="app__wrapper">
        <Header title="Crypto Exchange" caption="Exchange fast and easy" />

        <form className="body">
          <div
            className={`${
              currenciesPosition === true
                ? "body__exchange"
                : "body__exchange body__exchange--reverse"
            }`}
          >
            <div className="body__exchange-wrapper">
              <NumInput inputValue={inputValue} setInputValue={setInputValue} />
              <span className="input__span" />
              <SelectInput options={options} setOptionValue={setOptionValue} />
            </div>

            <SwapBtn
              currenciesPosition={currenciesPosition}
              setCurrenciesPosition={setCurrenciesPosition}
            />

            <div className="body__exchange-wrapper">
              <NumInput
                inputValue={inputValue2}
                setInputValue={setInputValue2}
                value={inputValue2}
              />
              <span className="input__span" />
              <SelectInput options={options} setOptionValue={setOptionValue2} />
            </div>
          </div>

          <MinExchangeWarning
            inputValue2={inputValue2}
            minimalExchange={minimalExchange}
          />
          <AddressBlock label="Your Ethereum address" btnName="exchange" />

          <div className="disabled__warning">
            {minimalExchange?.minAmount === null ||
            currenciesPosition === null ? (
              <p className="disabled__warning-message">
                this pair is disabled now
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
