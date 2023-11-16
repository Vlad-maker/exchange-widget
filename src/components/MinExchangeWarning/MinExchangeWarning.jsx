import "./MinExchangeWarning.scss";

function MinExchangeWarning({ inputValue, minimalExchange }) {
  return (
    <div className="warning__min">
      {inputValue !== "" && inputValue < minimalExchange?.minAmount ? (
        <p className="warning__min-message">Min: {minimalExchange.minAmount}</p>
      ) : null}
    </div>
  );
}

export default MinExchangeWarning;
