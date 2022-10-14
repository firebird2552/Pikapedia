import React from "react";
import NavLink from "react-bootstrap/NavLink";

// style imports
import "../styles/Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="wrapper">
        <div>&copy; 2019 - 2022 Fordorth Labs</div>
        <div>
          <NavLink href="/legal">Legal</NavLink>
        </div>
      </div>
    </div>
  );
};
