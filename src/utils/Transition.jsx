import React from "react";

const TransitionLS = () => {
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
};

export default TransitionLS;
