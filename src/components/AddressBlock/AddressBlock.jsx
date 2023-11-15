import "./AddressBlock.css";

function AddressBlock({ label, btnName }) {
  return (
    <div className="address">
      <div className="address-wrapper">
        <label className="address-label">{label}</label>
        <input className="address-input" />
      </div>
      <button type="button" className="address-btn">
        {btnName}
      </button>
    </div>
  );
}

export default AddressBlock;
