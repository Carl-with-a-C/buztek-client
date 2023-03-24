import "./sass/main.scss";
import { useState, useEffect } from "react";
import gsap from "gsap";

import Menu from "./assets/dot-menu.svg";
import Cross from "./assets/cross.svg";
import Logo from "./assets/OutlineBTek.svg";
import Wordmark from "./assets/BTWMdark.svg";
import LongArrow from "./assets/Arrow---Right.svg";

import HomeImage from "./assets/home-screen.jpg";

function App() {
  const [loading, setLoading] = useState(true);

  const [navOpen, setNavOpen] = useState(false);
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseDelta, setMouseDelta] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentage, setNextPercentage] = useState(0);
  const [titleHovered, setTitleHovered] = useState("");

  const [revealSite, setRevealSite] = useState(false);
  const [buildClicked, setBuildClicked] = useState(false);

  const maxDelta = window.innerHeight / 2;

  const toggleNav = () => {
    setNavOpen(!navOpen);
    setBuildClicked(false);
  };

  //mousemovement tracker and animator
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

  //load animations
  useEffect(() => {
    const tl = gsap.timeline();
    let smx = gsap.context(() => {
      //onClick reveal
      if (revealSite === true) {
        tl.to(".pre-loader", {
          opacity: 0,
          display: "none",
          ease: "power2.inOut",
        });
        tl.to(
          ".header-row",
          1,
          {
            top: "0",
            ease: "power3.inOut",
            stagger: {
              amount: 0.15,
            },
          },
          "-=1.1"
        );

        tl.from(
          ".footer, .topline-items > li",
          0.7,
          {
            y: 20,
            opacity: 0,

            stagger: {
              amount: -0.3,
            },
          },
          "+=0.3"
        );

        tl.fromTo(
          ".nav-toggle",
          {
            backgroundColor: "#f8f2e4",
          },
          { backgroundColor: "#00c9a7", ease: "power3.out" },
          "+=0.5"
        );
        tl.to(
          ".header-row-wrapper",
          0,
          {
            display: "none",
          },
          "-=1.2"
        );
        tl.to(
          ".smlTitle",
          {
            opacity: 0,
          },
          "-=0.8"
        );

        tl.to(
          ".header-row-one",
          0.5,
          {
            top: "-60px",
            left: "-12%",
            fontSize: "1.6em",
            ease: "power4.inOut",
          },
          "-=0.92"
        )
          .to(
            ".header-row-two",
            0.3,
            {
              top: "-60px",
              left: "-27vw",
              fontSize: "1.31em",
              ease: "power4.in",
            },
            "-=0.75"
          )
          .to(
            ".ampisand",
            1.5,
            {
              opacity: 1,
              ease: "power1.out",
            },
            "+=0.5"
          );
      }

      //preloader auto animation
      tl.to(".header > h1", 2, {
        top: 0,
        ease: "power3.inOut",
        stagger: {
          amount: 0.2,
        },
      }).to(".pre-loader-btn", 0.8, {
        opacity: 1,
        delay: 1.7,
      });

      //hover listener and function to set word hovered
      const titleWordOne = document.getElementById("titleWordOne");
      const titleWordTwo = document.getElementById("titleWordTwo");
      const handleTitleHover = (e) => {
        setTitleHovered(e.target.classList[1]);
      };

      const handleTitleUnhover = () => {
        setTitleHovered("");
      };
      titleWordOne.addEventListener("mouseenter", handleTitleHover);
      titleWordTwo.addEventListener("mouseenter", handleTitleHover);
      titleWordOne.addEventListener("mouseleave", handleTitleUnhover);
      titleWordTwo.addEventListener("mouseleave", handleTitleUnhover);

      return () => {
        titleWordOne.removeEventListener("mouseenter", handleTitleHover);
        titleWordTwo.removeEventListener("mouseenter", handleTitleHover);
        smx.revert();
        titleWordOne.removeEventListener("mouseleave", handleTitleUnhover);
        titleWordTwo.removeEventListener("mouseleave", handleTitleUnhover);
      };
    });
  }, [revealSite]);

  //scroll-effect example
  // useEffect(() => {
  //   let scrollmx = gsap.context(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     ScrollTrigger.create({
  //       animation: gsap.from(".header-row-one", {
  //         y: "50px",
  //         scale: 2,
  //         yPercent: -50,
  //       }),
  //       scrub: true,
  //       trigger: ".footer",
  //       start: "top bottom",
  //       endTrigger: ".footer",
  //       end: "top-center",
  //     });
  //     return () => {
  //       scrollmx.revert();
  //     };
  //   });
  // }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    let tmx = gsap.context(() => {
      if (buildClicked === true) {
        tl.to(".nav-expander", 2, {
          scale: 20,
          ease: "power3.inOut",
        }).to(
          ".nav-expander",
          2,
          {
            opacity: 0,
            display: "none",
            ease: "power3.inOut",
          },
          "+=0.2"
        );
      }
      return () => {
        tmx.revert();
      };
    });
  }, [buildClicked]);

  const handleTitleClick = () => {
    useEffect(() => {
      setBuildClicked(!buildClicked);
    }, [buildClicked]);
  };

  console.log(titleHovered, "title-hovered", buildClicked, "build-clicked");

  return (
    <div>
      <div className="app">
        <main
          id={navOpen ? "landing-open" : null}
          className={titleHovered ? "landing landing-title-hovered" : "landing"}
        >
          <div className="topline">
            <ul className="topline-items">
              <li>LOCATION 53.4808° N, 2.2426° W</li>
              <li>EST 2023</li>
              <li>
                <a className="logo-container">
                  <img
                    id="logo"
                    className="logo"
                    src={Logo}
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
                onClick={handleTitleClick}
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

      <span className="nav-expander"></span>

      <main className="pre-loader">
        <div className="pre-loader-container">
          {/* <img src={Wordmark} alt="Buztek Wordmark" /> */}
          <div className="header concat">
            <h1 data-text="Our expertise lies in">Our expertise lies in</h1>
            <div className="header-wrapper"></div>
          </div>
          <div className="header">
            <h1>translating your core </h1>
            <div className="header-wrapper"></div>
          </div>
          <div className="header">
            <h1> needs, values and strategy</h1>
            <div className="header-wrapper"></div>
          </div>
          <div className="header">
            <h1> into inspiring</h1>
            <div className="header-wrapper"></div>
          </div>
          <div className="header">
            <h1 id="tech-solutions" data-text="technical solutions">
              technical solutions
            </h1>
            <div className="header-wrapper"></div>
          </div>

          <div
            className="pre-loader-btn"
            onClick={() => setRevealSite(!revealSite)}
          >
            <div className="btn">
              Click anywhere
              <img src={LongArrow} alt="right arrow" />
              to start a{" "}
              <span id="buzz" data-text="Buzz">
                Buzz
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
