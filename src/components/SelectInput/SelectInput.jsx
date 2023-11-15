import Select from "react-select";

import "./SelectInput.css";

function SelectInput({ children, options, setOptionValue }) {
  const icon = (color = "transparent") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      //   backgroundImage: 'url("../../assets/icons/test.svg")',
      content: '" "',
      display: "block",
      marginRight: 30,
    },
  });

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
    placeholder: (styles) => ({ ...styles, ...icon() }),
    singleValue: (styles, { data }) => ({ ...styles, ...icon() }),
  };

  return (
    <>
      <Select
        options={options}
        onChange={(option) => {
          setOptionValue(option.value);
        }}
        styles={SelectInputStyle}
      />
      {children}
    </>
  );
}

export default SelectInput;
