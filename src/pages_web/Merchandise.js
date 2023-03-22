import React, { useEffect, useState,useContext } from "react";
import "../style_web/styleDoolally.css";
import Review from "../Sliders/Review";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import { Link } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FnbContext from "../contextApi/FnbContext";
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

const Merchandise = () => {

  const {merchandiseCategory,merchandiseItem,onAdd} =useContext(FnbContext);



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
                  <div className="d_title_box">
                    {/* # Tag section left hand side  */}

                    {/* whats on tap left section */}
                    <h5 className="d_main_title">What's On Tap </h5>
                    <p className="d_main_sub_title">
                      Beer Products
                      <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                  </div>
                  <div className="row gy-2 gx-4">
                    {/* here the Api render for whats on tap */}

                    {whatsOnTap.slice(0, 8).map((item, index) => (
                      <div className="col-6">
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

              {/* 3 circle icons section which is in  center of the first */}
              <div className="col-lg-6 mb-4 ">
                <div className=" d_midile_panal gray_bg_color">
                  <div className="location-section ">
                    <div className="d-flex justify-content-around pt-3">
                      <div className="adj-location">
                        <Link to="/beer">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/attend-an-event.png"
                            }
                          />
                          <h5> Beverages</h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <Link to="/food">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/book-a-private-party.png"
                            }
                          />
                          <h5> Food </h5>
                        </Link>
                      </div>
                      <div className="adj-location" id="circle-effect">
                        <Link to="/merchandise">
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/location.png"
                            }
                          />
                          <h5> Merchandise</h5>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/*  merchandise section where t-shirt and etc things render throung  APi */}
                <div
                  className="d_beer box_padding gray_bg_color  "
                  style={{ minHeight: "50px" }}
                >
                  <div className="row g-4">

                  {merchandiseItem.map((item,id)=>(   <div className="col-6 col-md-6 col-lg-6 ">
                      <div className="d_featured_events_box">
                        <figure className="mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                            alt=""
                          />
                        </figure>
                        <div
                          className="d_feat_event_cnt"
                          style={{ height: "100px" }}
                        >
                          <ul className="d_feat_event_list">
                            <li>
                              <strong>{item.itemname} </strong>
                            </li>
                            <li> {item.itemdescription}</li>
                            <li
                              className="d-flex justify-content-between"
                              style={{ width: "55%" }}
                            >
                              <strong>Rs {item.price}/- </strong>{" "}
                              <select style={{ borderRadius: "5px" }}>
                                <option>size</option>
                                <option>Sm</option>
                                <option>Xl</option>
                                <option>Xxl</option>
                              </select>
                            </li>
                          </ul>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="d_book_event "
                            style={{ margin: "0 0 5% 5%" }}
                          >
                            Buy Now{" "}
                          </button>
                          <a
                            className="bell text-center"
                            style={{
                              margin: "0 10% 5% 0",
                              color: "white",
                              width: "35px",
                              height: "25px",
                              backgroundColor: "#A2C760",
                              borderRadius: "5px",
                            }}
                          >
                            <ShoppingCartIcon style={{ height: "20px" }} />
                          </a>
                        </div>
                      </div>
                    </div>))}
                 

                    <div className="col-6 col-md-6 col-lg-6 ">
                      <div className="d_featured_events_box">
                        <figure className="mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                            alt=""
                          />
                        </figure>
                        <div
                          className="d_feat_event_cnt"
                          style={{ height: "100px" }}
                        >
                          <ul className="d_feat_event_list">
                            <li>
                              <strong>T-shirt </strong>
                            </li>
                            <li> Mens casual comfort</li>
                            <li
                              className="d-flex justify-content-between"
                              style={{ width: "55%" }}
                            >
                              <strong>Rs 2000/- </strong>{" "}
                              <select style={{ borderRadius: "5px" }}>
                                <option>size</option>
                                <option>Sm</option>
                                <option>Xl</option>
                                <option>Xxl</option>
                              </select>
                            </li>
                          </ul>
                        </div>
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="d_book_event "
                            style={{ margin: "0 0 5% 5%" }}
                          >
                            Buy Now{" "}
                          </button>
                          <a
                            className="bell text-center"
                            style={{
                              margin: "0 10% 5% 0",
                              color: "white",
                              width: "35px",
                              height: "25px",
                              backgroundColor: "#A2C760",
                              borderRadius: "5px",
                            }}
                          >
                            <ShoppingCartIcon style={{ height: "20px" }} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*  caterioges section right hand side first */}
              <div className="col-lg-3">
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h5 className="d_main_title">Categories</h5>
                  </div>
                  <ul className="catgry-beer">
                    <li>Glassware</li>
                    <li>Pet accessories</li>
                    <li>Clothing</li>
                    <li>Jewellery</li>
                  </ul>
                </div>
                {/*  reviews section */}
                <div className=" d_main_panel_review ">
                  <div className="d_right_panal box_padding">
                    <div className="d_title_box">
                      <h5 className="d_main_title">Recommendations </h5>
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
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};
export default Merchandise;
