import "./SwapBtn.scss";

function SwapBtn({ currenciesPosition, setCurrenciesPosition }) {
  return (
    <button
      onClick={() => setCurrenciesPosition(!currenciesPosition)}
      className="swap__btn"
      type="button"
    ></button>
  );
}

export default SwapBtn;
