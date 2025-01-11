import "./Header.css";
import { useNavigate } from "react-router-dom";
import Logo from "@/image/Logo.svg";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
    <div id="header">
      <div className="headerLogo">
        <img src={Logo} alt="Logo" onClick={handleLogoClick} />
      </div>
    </div>
    </>
  )
};

export default Header;