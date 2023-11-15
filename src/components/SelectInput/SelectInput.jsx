import Select from "react-select";

import "./SelectInput.scss";

function SelectInput({ children, options, setOptionValue }) {
  // const icon = (color = "transparent") => ({
  //   textTransform: "uppercase",

  //   ":before": {
  //     //   backgroundImage: 'url("../../assets/icons/test.svg")',
  //     content: '" "',
  //     display: "block",
  //     marginRight: 30,
  //   },
  // });

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
    // placeholder: (baseStyles) => ({
    //   ...baseStyles,
    // }),
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
