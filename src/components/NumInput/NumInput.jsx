import "./NumInput.scss";

function NumInput({ children, inputValue, setInputValue, id }) {
  return (
    <input
      type="text"
      className="input"
      onChange={(event) => setInputValue(event.target.value)}
      value={inputValue}
      id={id}
    >
      {children}
    </input>
  );
}

export default NumInput;
