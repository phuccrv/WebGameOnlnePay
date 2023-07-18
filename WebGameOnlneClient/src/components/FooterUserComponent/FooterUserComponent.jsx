import React from "react";
import "./FooterUserComponent.css";
const FooterUserComponent = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src="/logogame.png" alt="" />
        <p>GAME STORE</p>
      </div>
      <div className="footer-title">
        <div className="footer-text">
          <h3>Company</h3>
          <p>About</p>
          <p>Press Center</p>
          <p>Careers</p>
        </div>
        <div className="footer-text">
          <h3>Consoles</h3>
          <p>Playstation 5</p>
          <p>Xbox One</p>
          <p>Switch</p>
        </div>
        <div className="footer-text">
          <h3>Resources</h3>
          <p>Help Center</p>
          <p>Contact</p>
        </div>
        <div className="footer-text">
          <h3>Product Help</h3>
          <p>Support</p>
          <p>File a Bug</p>
        </div>
      </div>
      <div className="strikethrough"></div>
      <div className="title-bottom">
        <p>This page was built by Gianluca Jahn with React.</p>
        <p>
          This page was built by Phuc Nguyen with React. Portions of this page
          are inspired by RAWG, RAWG.io. This page was built solely for
          educational purposes.
        </p>
      </div>
    </div>
  );
};

export default FooterUserComponent;
