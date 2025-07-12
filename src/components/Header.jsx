import React from "react";
import { FaBullseye } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <h1>
        <FaBullseye style={{ color: "#2f80ed", marginRight: "10px" }} />
        Target 0.8
      </h1>
      <p className="subtitle">A Strategic Number Battle</p>
    </div>
  );
};

export default Header;
