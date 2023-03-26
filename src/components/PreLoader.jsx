import React from "react";
import LongArrow from "../assets/Arrow---Right.svg";

const PreLoader = ({ revealSite, setRevealSite }) => {
  return (
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
  );
};

export default PreLoader;
