import React, { memo, useEffect, useMemo, useState } from "react";
import "../style_web/styleDoolally.css";
import Review from "../Sliders/Review";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import { format, isValid } from "date-fns";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";

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
import { config } from "@fortawesome/fontawesome-svg-core";

const Doolally = () => {
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
        window.location = "/homepage?redirect_url=/" ;
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
        //console.log(result.response)
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const config = {
    name: "Reminder to star the add to calendar button repo",
    description:
      "Check out the maybe easiest way to include add to calendar buttons to your website at:<br>→ [url]https://github.com/add2cal/add-to-calendar-button[/url]",
    startDate: "2023-01-14",
    endDate: "2023-01-18",
    options: ["Google", "iCal"],
    timeZone: "Europe/Berlin",
    trigger: "click",
    iCalFileName: "Reminder-Event",
  };

  return (
    <>
      <div className="container-fluid">
        {isloading && <LoadingSpinner />}
        <Header />
        {/* <button onClick={() => atcb_action(config)}>Add to calendar</button> */}
        {/* <div className="atcb" style={{ width: "none" }}>
          {"{"}
          "name":"Add the title of your event", "description":"A nice
          description does not hurt", "startDate":"2022-02-21",
          "endDate":"2022-03-24", "startTime":"10:13", "endTime":"17:57",
          "location":"Somewhere over the rainbow", "label":"", "options":[
          "Apple", "Google" ], "timeZone":"Europe/Berlin",
          "iCalFileName":"Reminder-Event"
          {"}"}
        </div> */}
        <section className="d_main_panel " style={{ margin: "0 1%" }}>
          <div className="container-fluid">
            <div className="row gx-5 ">
              <div className="col mb-4">
                <div className="d_left_panal box_padding gray_bg_color">
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
                    {whatsOnTap.slice(0, 8).map((item, index) => (
                      <div className="col-md-6 ">
                        <div className="d_product_box">
                          <figure className="d_product_img mb-0" key={index}>
                            <img
                              src={fBDImageBaseUrl + "thumb/" + item.filename}
                              alt=""
                            />
                          </figure>
                          <p className="d_product_title">{item.itemName}</p>
                          <a className="d_overlay">
                            <p>Explore More</p>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
                <div className=" d_midile_panal gray_bg_color pt-3 ">
                  <div className="location-section">
                    <div className="d-flex justify-content-around">
                      <div className="adj-location">
                        <Link to="/beer">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/ShopCart.png"
                            }
                          />
                          <h5> Buy now</h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <Link to="/events">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/attend-an-event.png"
                            }
                          />
                          <h5> Events </h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <a href="/locations">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/locationHome.png"
                            }
                          />
                          <h5> Locations</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="d_hangout box_padding gray_bg_color"
                  id="hm-hangout"
                >
                  <div className="d_title_box">
                    <h5 className="d_main_title">Find new experiences</h5>
                    <p className="d_main_sub_title">
                      Multi Event & Exciting Fun
                      <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                    <div className="d_hangout_box container-fluid">
                      <div className="row gy-4 ">
                        {hangout.map((item, id) => (
                          <div className="col-6 col-md-4">
                            <a
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop"
                            >
                              <div className="d_product_box">
                                <figure className="d_product_img mb-0">
                                  <img src={item.hangoutImage} alt="" />
                                </figure>
                                <p
                                  className="d_product_title"
                                  style={{ marginBottom: "0rem" }}
                                >
                                  {item.hangoutName}
                                </p>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="d_right_panal box_padding whatHappingWeek"
                  id="hm-whatshappening"
                >
                  <div className="d_title_box">
                    <h5 className="d_main_title">What's Happening This Week</h5>
                    <p className="d_main_sub_title">
                      Day Plan
                      <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                  </div>
                  {whatHappingWeek.map((item, id) => (
                    <div className="d_days_box mb-4">
                      {item.eventDate && (
                        <h3 className="d_days_title">
                          {format(new Date(item.eventDate), "iiii")}
                        </h3>
                      )}
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <Link
                              to={
                                "/event-details/" +
                                item.eventSlugs +
                                "__" +
                                item.eventIds
                              }
                            >
                              <img
                                src={showCorrectImage(item.eventImage, "w_80")}
                                alt=""
                              />
                            </Link>
                          </figure>
                        </div>
                        <Link
                          to={
                            "/event-details/" +
                            item.eventSlugs +
                            "__" +
                            item.eventIds
                          }
                        >
                          <p className="d_days_subtitle ">{item.eventNames}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" d_main_panel_review ">
                  <div
                    className="d_right_panal box_padding"
                    style={{ height: "340px" }}
                  >
                    <div className="d_title_box">
                      <h5 className="d_main_title">Recommendations</h5>
                      <p className="d_main_sub_title">
                        What Our Happy Client Says
                        <span className="d_line"></span>
                      
                      </p>
                      <Review />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default memo(Doolally);
