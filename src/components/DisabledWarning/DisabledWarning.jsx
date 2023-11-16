import "./DisabledWarning.scss";

function DisabledWarning({ error, message }) {
  return (
    <div className="disabled__warning">
      {error === "pair_is_inactive" ? (
        <p className="disabled__warning-message">{message}</p>
      ) : null}
    </div>
  );
}

export default DisabledWarning;
