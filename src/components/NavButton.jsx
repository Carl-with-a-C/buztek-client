import React from "react";
import Menu from "../assets/dot-menu.svg";
import Cross from "../assets/cross.svg";

const NavButton = ({ navOpen, setNavOpen }) => {
  const toggleNav = () => {
    setNavOpen(!navOpen);
    setBuildClicked(false);
  };

  return (
    <div>
      <button
        id={navOpen ? "nav-open" : null}
        className="nav-toggle"
        type="button"
        onClick={toggleNav}
      >
        <img
          id={navOpen ? "button-menu-icon-open" : "button-menu-icon"}
          src={navOpen ? Cross : Menu}
        ></img>
      </button>
      <span className="nav-expander"></span>
    </div>
  );
};

export default NavButton;
