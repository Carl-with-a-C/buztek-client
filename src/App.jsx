import "./sass/main.scss";
import { useState, useEffect } from "react";
import gsap from "gsap";

import Landing from "./components/Landing";

import Menu from "./assets/dot-menu.svg";
import Cross from "./assets/cross.svg";
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

  const landingID = () => {
    if (navOpen) {
      return "landing-open";
    }
    if (titleHovered) {
      return "landing-title-hovered";
    }
    return null;
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
          )
          .to(".hover-stopper", 0, {
            display: "none",
          });
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

  /*page transition LANDING>SERVICES*/
  useEffect(() => {
    const tl = gsap.timeline();

    let tmx = gsap.context(() => {
      if (buildClicked === true) {
        tl.to(".nav-expander", 2, {
          scale: 25,
          ease: "power3.inOut",
        })
          .to(
            ".nav-expander",
            2,
            {
              opacity: 0,
              display: "none",
              ease: "power3.inOut",
            },
            "+=0.2"
          )
          .to(
            ".landing, .services",
            0.1,
            {
              x: "-100%",
              opacity: 1,
            },
            "-=3"
          );

        tl.from(
          ".divider",
          1.5,
          {
            scaleX: 0,
            ease: "power3.inOut",
            stagger: {
              amount: 1,
            },
          },
          "-=1.5"
        )
          .from(
            ".build-row > .col:first-child, .title-row, .col-price",
            1,
            {
              opacity: 0,
              y: 35,
              ease: "power3.inOut",
              stagger: {
                amount: 1.5,
              },
            },
            "-=1.5"
          )
          .to("#overlay-dark", 1.2, {
            top: "-100%",
            ease: "power3.inOut",
          })
          .from(
            ".marquee",
            1,
            {
              opacity: 0,
              bottom: "-5%",
              ease: "power3.inOut",
            },
            "-=2"
          )
          .from(
            ".circle",
            1.1,
            {
              scaleY: 0,
              ease: "power3.inOut",
              stagger: {
                amount: 1,
              },
            },
            "-=0.8"
          )
          .to(
            ".pricing",
            1.2,
            {
              opacity: 1,
              ease: "power3.inOut",
            },
            "-=0.8"
          );
      }
      return () => {
        tmx.revert();
      };
    });
  }, [buildClicked]);

  console.log(
    titleHovered,
    "title-hovered",
    buildClicked,
    "build-clicked",
    landingID(),
    "landing-id"
  );

  return (
    <div>
      <div className="app">
        <Landing
          titleHovered={titleHovered}
          setBuildClicked={setBuildClicked}
          buildClicked={buildClicked}
          mouseDelta={mouseDelta}
          navOpen={navOpen}
        />
        {/* <main id={landingID()} className="landing">
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
        </main> */}
        <div className="services" id={navOpen ? "services-open" : null}>
          <div id="overlay-light"></div>
          <div className="marquee marquee-sml">
            <span>
              A one Page website, that informs users about a product, service or
              event. A one Page website, that informs users about a product,
              service or event. A one Page website, that informs users about a
              product, service or event. A one Page website, that informs users
              about a product, service or event. A one Page website, that
              informs users about a product, service or event. A one Page
              website, that informs users about a product, service or event.
            </span>
          </div>
          <div className="marquee marquee-lrg">
            <span>
              CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES
              CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES
              CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES
              CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES
              CUSTOM WEBSITES CUSTOM WEBSITES
            </span>
          </div>
          <div id="overlay-dark"></div>
          <div className="content">
            <div className="build-row title-row">
              <div className="col col-title">BUZTEK</div>
              <div className="col col-title">landingPAGE</div>
              <div className="col col-title">multiPAGE</div>
            </div>
            <div className="divider title-divider"></div>
            <div className="build-row">
              <div className="col">
                One-page website (up to 10 screen heights)
              </div>
              <div className="col circle">
                <span></span>
              </div>
              <div className="col"></div>
            </div>
            <div className="divider"></div>
            <div className="build-row">
              <div className="col">
                UX/UI design in Figma, Developed with custom ReactJS code
              </div>
              <div className="col circle">
                <span></span>
              </div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">Modern interactions and animations</div>
              <div className="col circle">
                <span></span>
              </div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">Reliable one-language source code</div>
              <div className="col circle">
                <span></span>
              </div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">Desktop, tablet and mobile versions</div>

              <div className="col circle">
                <span></span>
              </div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">
                Privacy Policy and Data Protection Protocols
              </div>
              <div className="col circle">
                <span></span>
              </div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">CD/CI deployment</div>
              <div className="col"></div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">Up to 6 unique pages</div>
              <div className="col"></div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row">
              <div className="col">Custom 404 page</div>
              <div className="col"></div>
              <div className="col circle">
                <span></span>
              </div>
            </div>
            <div className="divider"></div>{" "}
            <div className="build-row pricing">
              <div className="col col-price">pricing</div>
              <div className="col col-price">£600</div>
              <div className="col col-price">£1500</div>
            </div>
          </div>
        </div>
        {/*SERVICES-----------------------------------------*/}
      </div>
      {/*NAV----------------------------------------------*/}
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
      {/*NAV-BUTTON---------------------------------------*/}
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
      {/*PRELOADER----------------------------------------*/}
      <main className="pre-loader">
        <div className="pre-loader-container">
          <div className="wordmark-container">
            <div className="wordmark">BUZTEK</div>
          </div>
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
