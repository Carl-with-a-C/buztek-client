import React from "react";
import HomeImage from "../assets/home-screen.jpg";

const Nav = ({ navOpen }) => {
  return (
    <nav id="nav">
      <div className="nav-links" id={navOpen ? "nav-links-open" : null}>
        <a className="nav-link" href="/">
          <h2 className="nav-link--label">HOME</h2>
          <img className="nav-link--image" src={HomeImage} />
        </a>
        <a className="nav-link" href="#">
          <h2 className="nav-link--label">WORK</h2>
          <img
            className="nav-link--image"
            src="https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg"
          />
        </a>
        <a className="nav-link" href="#">
          <h2 className="nav-link--label">ABOUT</h2>
          <img
            className="nav-link--image"
            src="https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg"
          />
        </a>
        <a className="nav-link" href="#">
          <h2 className="nav-link--label">CONTACT</h2>
          <img
            className="nav-link--image"
            src="https://images.pexels.com/photos/1476321/pexels-photo-1476321.jpeg"
          />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
