import "./sass/main.scss";
import { useState, useEffect } from "react";
import gsap from "gsap";

import Landing from "./components/Landing";
import Services from "./components/Services";
import Nav from "./components/Nav";
import NavButton from "./components/NavButton";
import PreLoader from "./components/PreLoader";

function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [mouseDown, setMouseDown] = useState(0);
  const [mouseDelta, setMouseDelta] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [nextPercentage, setNextPercentage] = useState(0);
  const [titleHovered, setTitleHovered] = useState("");

  const [revealSite, setRevealSite] = useState(false);
  const [buildClicked, setBuildClicked] = useState(false);
  const [secureClicked, setSecureClicked] = useState(false);

  const maxDelta = window.innerHeight / 2;

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
          .to(
            ".hover-stopper",
            0,
            {
              display: "none",
            },
            "-=1.2"
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

  /*page transition LANDING>SERVICES>build*/
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
            1.8,
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
            "-=2.5"
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

  /*page transition LANDING>SERVICES>secure*/

  useEffect(() => {
    const tl = gsap.timeline();

    let tmx = gsap.context(() => {
      if (secureClicked === true) {
        tl.to(".nav-expander", 2, {
          scale: 25,
          ease: "power3.inOut",
        })
          .to(
            ".nav-expander",
            1.8,
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
            "-=2.5"
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
  }, [secureClicked]);

  console.log(secureClicked);

  return (
    <div>
      <div className="app">
        <Landing
          titleHovered={titleHovered}
          setBuildClicked={setBuildClicked}
          buildClicked={buildClicked}
          setSecureClicked={setSecureClicked}
          secureClicked={secureClicked}
          mouseDelta={mouseDelta}
          navOpen={navOpen}
        />
        <Services
          navOpen={navOpen}
          buildClicked={buildClicked}
          secureClicked={secureClicked}
        />
      </div>
      <Nav navOpen={navOpen} />
      <NavButton navOpen={navOpen} setNavOpen={setNavOpen} />
      <PreLoader revealSite={revealSite} setRevealSite={setRevealSite} />
    </div>
  );
}

export default App;
