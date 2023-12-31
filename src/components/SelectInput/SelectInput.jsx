import Select from "react-select";

import "./SelectInput.scss";

function SelectInput({ children, options, setOptionValue, value }) {
  const SelectInputStyle = {
    control: (baseStyles) => ({
      ...baseStyles,
      height: "50px",
      width: "150px",
      border: "none",
      backgroundColor: "#F6F7F8",
      boxShadow: "none",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: state.isSelected
        ? "#11B3FE;"
        : state.isFocused
        ? "#EAF1F7"
        : "#F6F7F8",
      color: state.isSelected && "#282828",
      textAlign: "left",
      textTransform: "uppercase",
      cursor: "pointer",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      textTransform: "uppercase",
      marginLeft: 30,
    }),
  };

  return (
    <>
      <Select
        options={options}
        onChange={(option) => {
          setOptionValue(option.value);
        }}
        styles={SelectInputStyle}
        value={value}
        formatOptionLabel={(options) => (
          <div className="option">
            <img src={options.image} alt="icon" />
            <span className="option__label">{options.label}</span>
            <span className="option__name">{options.name}</span>
          </div>
        )}
      />
      {children}
    </>
  );
}

export default SelectInput;
