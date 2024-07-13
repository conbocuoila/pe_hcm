import { Link } from "react-router-dom";
import "./index.scss";
const Header = () => {
  return (
    <div className="header">
      <ul className="header__nav">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li>
          <Link to={"/contact"}>Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
