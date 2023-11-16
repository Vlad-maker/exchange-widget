import { useState, useEffect, useMemo } from "react";
import axios from "axios";

// components:
import Header from "../components/Header/Header";
import NumInput from "../components/NumInput/NumInput";
import SwapBtn from "../components/SwapBtn/SwapBtn";
import SelectInput from "../components/SelectInput/SelectInput";
import MinExchangeWarning from "../components/MinExchangeWarning/MinExchangeWarning";
import AddressBlock from "../components/AddressBlock/AddressBlock";
import DisabledWarning from "../components/DisabledWarning/DisabledWarning";

import "./App.scss";

const url = "https://api.changenow.io/v1/currencies?active=true";

function App() {
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [minimalExchange, setMinimalExchange] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [optionValue, setOptionValue] = useState(null);
  const [optionValue2, setOptionValue2] = useState(null);

  const [error, setError] = useState("");

  const getAllCurrencies = () => {
    return axios.get(url).then((res) => setAllCurrencies(res.data));
  };

  const getMinimalExchange = () => {
    setError("");
    return axios
      .get(
        `https://api.changenow.io/v1/min-amount/${optionValue}_${optionValue2}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`
      )
      .then((res) => setMinimalExchange(res.data))
      .catch((error) => setError(error.response.data.error));
  };

  const getExchangeAmount = () => {
    return axios
      .get(
        `https://api.changenow.io/v1/exchange-amount/${inputValue}/${optionValue}_${optionValue2}?api_key=c9155859d90d239f909d2906233816b26cd8cf5ede44702d422667672b58b0cd`
      )
      .then((res) => setInputValue2(res.data.estimatedAmount))
      .catch((error) => console.log(error));
  };

  const options = useMemo(() => {
    return (
      allCurrencies.map((item) => ({
        value: item.ticker,
        label: item.ticker,
        image: item.image,
        name: item.name,
      })) || []
    );
  }, [allCurrencies]);

  useEffect(() => {
    getAllCurrencies();
  }, []);

  useEffect(() => {
    if (optionValue && optionValue2) {
      getMinimalExchange();
    }
  }, [optionValue, optionValue2]);

  useEffect(() => {
    if (
      minimalExchange &&
      inputValue &&
      optionValue &&
      optionValue2 &&
      !error
    ) {
      getExchangeAmount();
    }
  }, [inputValue, optionValue, optionValue2]);

  useEffect(() => {
    setMinimalExchange(null);
    setInputValue("");
    setInputValue2("");
  }, [error]);

  return (
    <div className="App">
      <div className="app__wrapper">
        <Header title="Crypto Exchange" caption="Exchange fast and easy" />

        <form className="body">
          <div className="body__exchange">
            <div className="body__exchange-wrapper">
              <NumInput inputValue={inputValue} setInputValue={setInputValue} />
              <span className="input__span" />
              <SelectInput options={options} setOptionValue={setOptionValue} />
            </div>

            <SwapBtn />

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
            inputValue={inputValue}
            minimalExchange={minimalExchange}
          />
          <AddressBlock label="Your Ethereum address" btnName="exchange" />
          <DisabledWarning error={error} message="this pair is disabled now" />
        </form>
      </div>
    </div>
  );
}

export default App;
