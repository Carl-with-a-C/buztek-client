import "./sass/main.scss";
import { useState, useEffect } from "React";
import Menu from "./assets/dot-menu.svg";
import Cross from "./assets/cross.svg";
import Logo from "./assets/OutlineBTek.svg";
import Wordmark from "./assets/BTwordmark.svg";

import HomeImage from "./assets/home-screen.png";

function App() {
  const [loading, setLoading] = useState(true);

  const [navOpen, setNavOpen] = useState(false);
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseDelta, setMouseDelta] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentage, setNextPercentage] = useState(0);

  const maxDelta = window.innerHeight / 2;

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  // useEffect(() => {
  //   loading
  //     ? document.querySelector("body").classList.add("loading")
  //     : document.querySelector("body").classList.remove("loading");
  // }, [loading]);

  useEffect(() => {
    const track = document.getElementById("carousel-track");
    const handleMouseDown = (e) => {
      setMouseDown(e.clientY);
    };

    const handleMouseMove = (e) => {
      if (mouseDown === 0) {
        track.animate(
          {
            transform: `translate(-25px, -75%)`,
          },
          { duration: 2000000, fill: "forwards", delay: 1000 }
        );
      } else {
        setMouseDelta(parseFloat(mouseDown) - e.clientY);
        setPercentage((mouseDelta / maxDelta) * -100);
        setNextPercentage(
          Math.min(Math.max(parseFloat(prevPercentage) + percentage, -75), 1)
        );
        track.animate(
          {
            transform: `translate(-25px, ${nextPercentage}%)`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    const handleMouseUp = () => {
      setMouseDown(0);
      setPrevPercentage(percentage);
    };

    for (const image of track.getElementsByClassName("carousel-image")) {
      image.animate(
        { objectPosition: `center ${nextPercentage + 100}%` },
        { duration: 1200, fill: "forwards" }
      );
    }

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [percentage, nextPercentage, mouseDelta, mouseDown]);

  return (
    <div>
      <div className="app">
        <a className="logo-container">
          <img id="logo" src={Logo} alt="Buztek logo" />
        </a>
        <main id={navOpen ? "landing-open" : null} className="landing">
          <section className="hero-splash">
            <h1 className="hero-title">
              <div id="hero-title-container">
                <div className="title-line" id="hero-title--line-1">
                  WE <strong id="build">BUILD</strong>
                </div>
                <div className="title-line" id="hero-title--line-2">
                  AND <strong id="secure">SECURE</strong>
                </div>
                <div className="title-line" id="hero-title--line-3">
                  YOUR TECH
                </div>
              </div>
            </h1>
            <div id="hero-blurb-container">
              <p className="hero-blurb">
                our expertise lies in translating your core needs, values and
                strategy into inspiring technical solutions
              </p>
            </div>
          </section>
          <section className="carousel">
            <div className="wordmark-container">
              <img id="wordmark" src={Wordmark} />
            </div>
            <div id="carousel-track">
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
      </div>

      <nav id="nav">
        <div className="nav-links" id={navOpen ? "nav-links-open" : null}>
          <a className="nav-link" href="#">
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
    </div>
  );
}

export default App;
