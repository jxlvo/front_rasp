import React from "react";
import logoIEEE from "../assets/logo IEEE UERJ branca (1).png";
import logoFen from "../assets/logofen.jpg";
import bannerpro from "../assets/banner_pt.png";
import DigitalClock from "./Digitalclock";

const Header = () => {
  return (
    <div className="header">
      <img src={logoIEEE} alt="" />
      <div>
        <h1 className="title">Horários das Aulas</h1>
        <DigitalClock />
      </div>
      <div className="img-direita">
        <img src={logoFen} alt="" />
        <img src={bannerpro} alt="" />
      </div>
    </div>
  );
};

export default Header;
