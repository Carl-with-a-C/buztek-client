import React from "react";

const Services = ({ navOpen }) => {
  return (
    <div className="services" id={navOpen ? "services-open" : null}>
      <div id="overlay-light"></div>
      <div className="marquee marquee-sml">
        <span>
          A one Page website, that informs users about a product, service or
          event. A one Page website, that informs users about a product, service
          or event. A one Page website, that informs users about a product,
          service or event. A one Page website, that informs users about a
          product, service or event. A one Page website, that informs users
          about a product, service or event. A one Page website, that informs
          users about a product, service or event.
        </span>
      </div>
      <div className="marquee marquee-lrg">
        <span>
          CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM
          WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM
          WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM
          WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM WEBSITES CUSTOM
          WEBSITES CUSTOM WEBSITES
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
          <div className="col">One-page website (up to 10 screen heights)</div>
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
  );
};

export default Services;
