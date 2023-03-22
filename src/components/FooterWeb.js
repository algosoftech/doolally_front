import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row justify-content-md-center">
            
            <div className="col-md-auto">Order & Shipping</div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
            <div className="col-md-auto"><Link to="/my-events">Organizer Dashboard</Link></div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
            <div className="col-md-auto"><Link to="/events">FAQ Events</Link></div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
            <div className="col-md-auto">
              <Link to="/food">Food</Link>
            </div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
            <div className="col-md-auto">
              <Link to="/locations">Beer</Link>
            </div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
            <div className="col-md-auto">
              <Link to="/merchandise">Merchandise</Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
        <div className="col-md-auto">
              <Link to="/about-us">About Us</Link>
            </div>
            <div className="col-md-auto" id="f-line">
              |
            </div>
          <div className="col-md-auto ">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div>
          <div className="col-md-auto " id="f-line">
            |
          </div>
          <div className="col-md-auto">
            <Link to="/contact-us">Contact Us</Link>
          </div>
          {/* <div className="col-md-auto " id="f-line">
            |
          </div>
          <div className="col-md-auto">
            <Link to="/privacy-policy">Merchandise</Link>
          </div>
          <div className="col-md-auto " id="f-line">
            |
          </div>
          <div className="col-md-auto">
            <Link to="/privacy-policy">Privacy Policy</Link>
          </div> */}
        </div>
      </div>
      <div id="end-footer">
        <div className="text-center p-3">
          © 2022 Copyrights :<a>DOOLALLY. All Rights Reserved </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
