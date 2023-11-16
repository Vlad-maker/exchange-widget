import "./AddressBlock.scss";

function AddressBlock({ label, btnName }) {
  return (
    <div className="address">
      <div className="address-wrapper">
        <label className="address-label" htmlFor="address-form">
          {label}
        </label>
        <input className="address-input" id="address-form" />
      </div>
      <button type="submit" className="address-btn">
        {btnName}
      </button>
    </div>
  );
}

export default AddressBlock;
