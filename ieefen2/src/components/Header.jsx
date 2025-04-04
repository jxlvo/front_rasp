import React from "react";
import logoIEEE from "../assets/logo IEEE UERJ branca (1).png";
import logoFen from "../assets/logofen.jpg";

const Header = () => {
  return (
    <div className="header">
      <img src={logoIEEE} alt="" />

      <h1>Horários das Aulas</h1>

      <img src={logoFen} alt="" />
    </div>
  );
};

export default Header;
