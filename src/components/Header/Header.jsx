import "./Header.scss";

function Header({ title, caption }) {
  return (
    <div className="header">
      <h1 className="header__title">{title}</h1>
      <p className="header__caption">{caption}</p>
    </div>
  );
}

export default Header;
