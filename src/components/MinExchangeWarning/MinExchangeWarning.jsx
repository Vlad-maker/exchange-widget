import "./MinExchangeWarning.css";

function MinExchangeWarning({ inputValue2, minimalExchange }) {
  return (
    <div className="warning__min">
      {inputValue2 === "-" ? (
        <p className="warning__min-message">Min: {minimalExchange.minAmount}</p>
      ) : null}
    </div>
  );
}

export default MinExchangeWarning;
