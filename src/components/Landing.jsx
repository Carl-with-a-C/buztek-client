import React from "react";
import Logo from "../assets/OutlineBTek.svg";
import LogoLight from "../assets/BTekLight.svg";

const Landing = ({
  titleHovered,
  setBuildClicked,
  buildClicked,
  mouseDelta,
  navOpen,
}) => {
  const landingID = () => {
    if (navOpen) {
      return "landing-open";
    }
    if (titleHovered) {
      return "landing-title-hovered";
    }
    return null;
  };

  return (
    <main id={landingID()} className="landing">
      <div className="hover-stopper"></div>
      <div className="topline">
        <ul className="topline-items">
          <li>LOCATION 53.4808° N, 2.2426° W</li>
          <li>EST 2023</li>
          <li>
            <a href="/" className="logo-container">
              <img
                id="logo"
                className="logo"
                src={titleHovered ? LogoLight : Logo}
                alt="Buztek logo"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="site-header">
        <a href="#" className="row">
          <div
            className="header-row header-row-one"
            id="titleWordOne"
            data-text="BUILD"
            onClick={() => {
              setBuildClicked(!buildClicked);
            }}
          >
            <span className="smlTitle">we</span>
            BUILD
            <span className="ampisand">&</span>
          </div>
          <div className="header-row-wrapper"></div>
        </a>
        <a className="row">
          <div
            className="header-row header-row-two"
            id="titleWordTwo"
            onClick={() => {
              setBuildClicked(!buildClicked);
            }}
          >
            <span className="smlTitle">and</span>
            SECURE
          </div>
          <div className="header-row-wrapper"></div>
        </a>
      </div>
      <div className="footer">
        <div className="blurb">Your digital technology.</div>
      </div>
      <section className="carousel">
        <div
          id="carousel-track"
          className={mouseDelta === 0 ? "carousel-track" : null}
        >
          <img
            className="carousel-image"
            id="c-image-a"
            src="https://images.pexels.com/photos/3756879/pexels-photo-3756879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-b"
            src="https://images.pexels.com/photos/699459/pexels-photo-699459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-a"
            src="https://images.pexels.com/photos/2007647/pexels-photo-2007647.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-b"
            src="https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-a"
            src="https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-b"
            src="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
          <img
            className="carousel-image"
            id="c-image-a"
            src="https://images.pexels.com/photos/2182863/pexels-photo-2182863.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            draggable="false"
          />
        </div>
      </section>
    </main>
  );
};

export default Landing;
