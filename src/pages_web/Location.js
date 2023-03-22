import React, { memo, useEffect, useMemo, useState } from "react";
import "../style_web/styleDoolally.css";
import { Link } from "react-router-dom";
import Review from "../Sliders/Review";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import GallerySliderLocation from "../Sliders/GallerySliderLocationWeb";
import LoadingSpinner from "../components/spinner/LoadingSpinner";

import {
  getRequestOptions,
  apiBaseUrl,
  homePageApiUrl,
  fBDImageBaseUrl,
  eventImageBaseUrl,
} from "../config/constant";
import {
  setUserCurrLoc,
  getUserCurrLoc,
  getUser,
  getToken,
  removeUserSession,
} from "../utils/UserAuthenticate";
import { showCorrectImage, numberWithCommas } from "../utils/Common";

const Location = () => {
  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [location, setLocation] = useState([]);
  const [hangout, setHangout] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [isloading, setIsloading] = useState(false);

  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage";
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    getData();
    //removeUserSession();
  }, []);

  const getData = async () => {
    try {
      setIsloading(true);
      // here Api call for Home page
      let result = await fetch(apiBaseUrl + homePageApiUrl, getRequestOptions);
      if (result) {
        result = await result.json();
        settwitterView(result.response.result.twitterView);
        setwhatsOnTap(result.response.result.whatsOnTap);
        setLocation(result.response.result.location);
        setHangout(result.response.result.hangout);
        setwhatHappingWeek(result.response.result.whatHappingWeek);
        setTestimonial(result.response.result.testimobial);
        setTimeout(() => {
          setIsloading(false);
        }, 500);
        console.log(result.response);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        {isloading && <LoadingSpinner />}
        <Header />
        <section className="d_main_panel" style={{ margin: "0 1%" }}>
          <div className="container-fluid">
            <div className="row g-5">
              <div className="col-lg-3 mb-4">
                <div className="d_left_panal box_padding gray_bg_color">
                  <div className="d_title_bx"></div>
                  {/* # Tag section  */}

                  <h5 className="d_main_title">What's On Tap </h5>
                  <p className="d_main_sub_title">
                    Beer Products
                    <span className="d_line"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                  </p>
                  <div className="row gy-2 gx-4">
                    {/* here the Api render on home page for whats on tap */}
                    {/* { whatsOnTap.slice(0, 6).map((item,index)=>
                                            <div className="col-6">
                                                <div className="d_product_box">
                                                    <figure className="d_product_img mb-0" key={index}>
                                                        <img src={fBDImageBaseUrl+'thumb/'+item.filename} alt=""/>
                                                    </figure>
                                                    <p className="d_product_title">{item.itemName}</p>
                                                    <a className="d_overlay">
                                                        <p>Explore More</p>
                                                    </a>
                                                </div>
                                            </div>
                                        )} */}
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro1.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Apple Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>

                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro2.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro2.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro3.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro4.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro5.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro7.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro8.png"}
                            alt=""
                          />
                        </figure>

                        <p className="d_product_title">Mango Cider</p>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
                <div className=" d_midile_panal gray_bg_color">
                  {/* <Location/> */}
                  {/* <h3 className="d_main_title box_padding">Our Locations</h3> */}
                  <div className="location-section ">
                    <div className="d-flex justify-content-center pt-3">
                      <div className="adj-location">
                        <Link to="/mumbai-location">
                          {" "}
                          <img
                            src={process.env.PUBLIC_URL + "/images/mumbai.png"}
                            style={{ width: "60%" }}
                          />
                          <h5> Mumbai</h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <img
                          src={process.env.PUBLIC_URL + "/images/pune.png"}
                          style={{ width: "60%" }}
                        />
                        <h5> Pune </h5>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="d_hangout box_padding gray_bg_color"
                  id="location-section"
                >
                  <div className="d_title_box">
                    <div className="d_hangout_box">
                      <div
                        className="d-flex justify-content-between"
                        style={{
                          border: "1px solid #d4d4d4",
                          borderRadius: "5px",
                          boxShadow: "2px 5px 5px 5px #f5f5f5",
                          marginBottom: "2%",
                          padding: "2% 2% 0 2%",
                        }}
                      >
                        <div className="">
                          <h5 className="poppins"> Taproom in Khar</h5>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/icons/star.jpg"
                            }
                            style={{
                              width: "60px",
                              margin: "0px auto",
                              marginTop: "-20px",
                            }}
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: "grey",
                              width: "200px",
                            }}
                          >
                            Doolally Taproom - Khar Raj Kutir Apartment, 10 A,
                            E854, Rd Number 3, Khar West, Mumbai, Maharashtra
                            400052, India
                          </p>
                        </div>

                        <div className=" col text-end">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{
                              position: "absolute",
                              color: "#9BC059",
                              fontSize: "30px",
                              marginLeft: "5.6%",
                            }}
                          />
                          <img
                            src={process.env.PUBLIC_URL + "/images/map.png"}
                            style={{ width: "120px", height: "125px" }}
                          />

                          <br />

                          <strong>Taproom in Khar</strong>
                          <p style={{ fontSize: "14px", color: "grey" }}>
                            10:00am-12:00pm
                          </p>
                        </div>
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{
                          border: "1px solid #d4d4d4",
                          borderRadius: "5px",
                          boxShadow: "2px 5px 5px 5px #f5f5f5",
                          marginBottom: "2%",
                          padding: "2% 2% 0 2%",
                        }}
                      >
                        <div className="">
                          <h5 className="poppins"> Taproom in Andheri</h5>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/icons/star.jpg"
                            }
                            style={{
                              width: "60px",
                              margin: "0px auto",
                              marginTop: "-20px",
                            }}
                          />
                          <p
                            style={{
                              fontSize: "14px",
                              color: "grey",
                              width: "200px",
                            }}
                          >
                            Doolally Taproom - Andheri C18-21 Dalia Industrial
                            Estate Near, Fun Republic Road, Off New Link Rd,
                            Veera Desai Industrial Estate, Andheri West, Mumbai,
                            Maharashtra 400053, India
                          </p>
                        </div>

                        <div className=" text-center">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            style={{
                              position: "absolute",
                              color: "#9BC059",
                              fontSize: "30px",
                              marginLeft: "5.6%",
                            }}
                          />
                          <img
                            src={process.env.PUBLIC_URL + "/images/map.png"}
                            style={{ width: "120px", height: "125px" }}
                          />

                          <br />

                          <strong>
                            Taproom in <br />
                            Andher
                          </strong>
                          <p style={{ fontSize: "14px", color: "grey" }}>
                            10:00am-12:00pm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                {/* <div className=" d_main_panel_review "> */}
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h5 className="d_main_title mb-3">Gallery</h5>

                    <GallerySliderLocation />
                    <h5 className="d_main_title mt-4 pt-4">Recommendations</h5>
                    <p className="d_main_sub_title">
                      What Our Happy Client Says
                      <span className="d_line"></span>
                      <span className="d_round"></span>
                    </p>

                    <Review />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Location;
