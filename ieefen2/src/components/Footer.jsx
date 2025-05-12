import React from "react";
import banner from "../assets/bannerpesday.png";
import banner2 from "../assets/banner2.png";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="imgs">
          <img className="banner" src={banner} alt="" />
          <img className="banner2" src={banner2} alt="" />
        </div>
        <div className="footer-text">
          {" "}
          Desenvolvido por: Julio Constantino, Marco Aurélio
        </div>
      </div>
    </>
  );
};

export default Footer;
