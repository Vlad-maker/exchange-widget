import "./NumInput.css";

function NumInput({ children, inputValue, setInputValue }) {
  return (
    <input
      type="text"
      className="input"
      onChange={(event) => setInputValue(event.target.value)}
      value={inputValue}
    >
      {children}
    </input>
  );
}

export default NumInput;
