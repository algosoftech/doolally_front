import React, { useEffect, useState } from "react";
import "../style_mob/styleDoolally.css";
import { RWebShare } from "react-web-share";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import Review from "../Sliders/Review";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Hangout_ph from "../Sliders/Hangout_ph";
import WhatsOnTap from "../Sliders/WhatsOnTap";
import Helper from "../utils/Helper";
import { format, isValid } from "date-fns";
import {
  getRequestOptions,
  apiBaseUrl,
  eventCategoryEventListApiUrl,
  fBDImageBaseUrl,
  perPageShowData,
  eventCategoryImageBaseUrl,
  eventReminderMeApiUrl,
  multipartRequestOptions,
  eventImageBaseUrl,
  EVENT,
  userFrom,
} from "../config/constant";
import {
  setUserCurrLoc,
  getUserCurrLoc,
  getUser,
  getToken,
} from "../utils/UserAuthenticate";
import { showCorrectImage, numberWithCommas } from "../utils/Common";

// import  { SideMainCotentRight } from './components/homeComp';
const Doolally = () => {
  const [showReminderPop, setShowReminderPop] = useState(false);
  const [reminderMeEventId, setReminderMeEventId] = useState("");
  const [reminderMeEmailAddress, setReminderMeEmailAddress] = useState("");
  const [errorMsgReminderMe, setErrorMsgReminderMe] = useState("");
  const [isReminderSubmitButtonLoading, setIsReminderSubmitButtonLoading] =
    useState(false);
  const handleCloseReminderPop = () => setShowReminderPop(false);
  const handleShowReminderPop = (currEventId) => {
    setReminderMeEventId(currEventId);
    setShowReminderPop(true);
  };

  const onUpdateReminderMeField = (e) => {
    setReminderMeEmailAddress(e.target.value);
    let reminderEmail = e.target.value;
    if (!reminderEmail) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderEmail)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }
  };

  const onBlureReminderMeField = (e) => {
    let reminderEmail = e.target.value;
    if (!reminderEmail) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderEmail)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }
  };

  const onSubmitReminderMeForm = async (e) => {
    e.preventDefault();
    if (!reminderMeEmailAddress) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderMeEmailAddress)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }
  };

  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const { cateSlug } = useParams();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [eventCategory, setEventCategory] = useState([]);
  const [currEventCategory, setCurrEventCategory] = useState([]);
  const [eventlist, setEventlist] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [istotalpage, setIstotalpage] = useState(10);
  const [ispage, setIspage] = useState(1);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [currEventCategoryId, setCurrEventCategoryId] = useState(0);
  const user = getUser();

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
  }, []);

  const getData = async () => {
    try {
      if (ispage === 1) {
        setIsloading(true);
      } else {
        //setIsLoadMoreLoading(true);
      }
      let currentcateSlug = cateSlug || "";
      // here Api call for Category Page Data
      let result = await fetch(
        apiBaseUrl +
          eventCategoryEventListApiUrl +
          "?cateSlug=" +
          currentcateSlug +
          "&page=" +
          ispage +
          "&perPage=" +
          perPageShowData,
        getRequestOptions
      );
      if (result) {
        result = await result.json();
        setEventCategory(result.response.result.categoryData);
        setCurrEventCategory(result.response.result.categoryDetails);
        if (result.response.result.categoryDetails.length > 0) {
          setCurrEventCategoryId(
            result.response.result.categoryDetails[0].cateId
          );
        }

        settwitterView(result.response.result.twitterView);
        setwhatsOnTap(result.response.result.whatsOnTap);
        setwhatHappingWeek(result.response.result.whatHappingWeek);
        setTestimonial(result.response.result.testimobial);

        if (result.response.result.eventList.length > 0) {
          setEventlist([...eventlist, ...result.response.result.eventList]);
        } else {
          setErrorMsg("No event found.");
        }
        setIstotalpage(result.response.result.totalPages);
        setIspage(result.response.result.currentPages + 1);
        if (ispage === 1) {
          setTimeout(() => {
            setIsloading(false);
          }, 500);
        } else {
          // setIsLoadMoreLoading(false);
        }
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  };

  const loadMore = () => {
    //setIspage((ispage) => ispage + 1);
    getData();
  };

  return (
    <>
    
      <div className="d_margin mb-4 pb-4 container-fluid">
        <Header />

        <div className=" col-6 search_order ds-none ">
          <input
            type="text"
            class="  form-controll item_search_txt"
            placeholder="Discover workshops, attend a meet up, play a board game"
          />
          <img
            src={process.env.PUBLIC_URL + "/images/icons/search-icon.png"}
            alt="search-icon"
            style={{ width: "20px", marginTop: "-4px" }}
          />
        </div>
        <div className="ds-none ">
          <div className="home-1st-col d-flex justify-content-around poppins  mt-2 ">
            <p>
              <Link to="/beer">
           
                <img
                  src={process.env.PUBLIC_URL + "/images/ShopCart.png"}
                  className="h-1st-col"
                />
                <br /> Buy now
              </Link>
            </p>
            <p>
      
              <Link to="/events">
                <img
                  src={process.env.PUBLIC_URL + "/images/attend-an-event.png"}
                  className="h-1st-col"
                />
                <br />
                Events
              </Link>
            </p>
            <p>
              <Link to="locations">
                <img
                  src={process.env.PUBLIC_URL + "/images/locationHome.png"}
                  className="h-1st-col"
                />
                <br />
                Locations
              </Link>
            </p>
          </div>
        </div>

        {/* mobile view */}
        {/* section 1 start hangout at doolally 2sliding */}

        <div class="d_hangout box_paddin gray_bg_colr ds-none">
          <div class="d_title_box">
            <h3 class="d_main_title">Find new experiences</h3>

            <p class="d_main_sub_title">
              Multi event & exciting fun <span class="d_line"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
            </p>
            <div class="d_hangout_box">
              <div class="row ">
                <Hangout_ph />
              </div>
            </div>
          </div>
        </div>

        {/* section 1 ends for mobile view hangout at doolally 2 sliding */}

        {/* section 3 start for mobile view whats on tab */}

        <div className="col-lg-3 mb-4 ds-none mt-4 ">
          <div className="d_left_panal box_paddin gray_bg_colr">
            <div className="d_title_box">
              <h3 className="d_main_title">What's on Tap</h3>
              <p className="d_main_sub_title">
                Beer products <span className="d_line"></span>
                <span className="d_round"></span>
                <span className="d_round"></span>
                <span className="d_round"></span>
              </p>
            </div>

            <div className=" ds-none row ">
              <WhatsOnTap />
            </div>
          </div>
        </div>
        {/* section 3 Ends for mobile view whats on tab */}

        {/* section 4 starts for mobile view whats happeniing this week */}

        <div className="row ds-none ">
          <div className="col-lg-3 ">
            <div className="wh g-0">
              <div className="d_title_box">
                <h3 className="d_main_title mt-3 ">
                  What's happening this week
                </h3>
                <p className="d_main_sub_title">
                  Attened a workshop , host an event , join a community{" "}
                  <span className="d_line"></span>
                  <span className="d_round"></span>
                  <span className="d_round"></span>
                  <span className="d_round"></span>
                </p>

                <div className=" ds-none row g-2">
                  {eventlist.slice(0, 2).map((item, index) => (
                    // <Event_box key={index} eventsData={item} />
                    <div className="col-6 col-md-6 col-lg-4">
                      <div className="d_featured_events_box">
                        <figure className="mb-0">
                          <Link
                            to={
                              "/event-details/" +
                              item.eventSlug +
                              "__" +
                              item.eventId
                            }
                          >
                            <img
                              src={showCorrectImage(item.eventImage)}
                              alt={item.eventName}
                              style={{ height: "112px" }}
                            />
                            <span
                              id="price-on-pic"
                              className="poppins"
                              style={{ color: "#759246" }}
                            >
                              {item.costType == 1 ? (
                                <strong>Free</strong>
                              ) : (
                                <strong>
                                  Rs {numberWithCommas(item.eventPrice)}
                                </strong>
                              )}
                            </span>
                          </Link>
                        </figure>{" "}
                        <br />
                        <div className="d_feat_event_cnt poppins">
                          <p
                            className="d_feat_event_title"
                            style={{
                              float: "left",
                              top: "-20px",
                              position: "relative",
                              marginLeft: "-3px",
                            }}
                          >
                            {item.eventName.substring(0, 15)}
                          </p>
                          <br />{" "}
                          <p className="d_feat_event_name">
                            By {item.creatorName.substring(0, 17)}
                          </p>
                          <p
                            className="pb-3"
                            style={{ marginTop: "-40px", height: "93px", wordWrap: "break-word" }}
                          >
                            {" "}
                            {item.eventDescription.substring(0, 50)}...
                            <Link
                              to={
                                "/event-details/" +
                                item.eventSlug +
                                "__" +
                                item.eventId
                              }
                            >
                              Read more
                            </Link>
                          </p>
                          <ul className="d_feat_event_list">
                            <li>
                              <a href={item.mapLink} target="_blank">
                                <img
                                  className="location"
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/icons/ci_location.svg"
                                  }
                                  alt=""
                                />{" "}
                                {item.customLocation ? (
                                  <span>{item.customLocation}</span>
                                ) : item.isSpecialEvent == EVENT.STATUS_YES ? (
                                  <span>1st Brewhouse, Pune</span>
                                ) : item.isEventEverywhere ==
                                    EVENT.STATUS_YES && item.eventId == 2530 ? (
                                  <span>All Taprooms</span>
                                ) : item.at_multiple_locations ==
                                  EVENT.STATUS_YES ? (
                                  <span>Multiple Taprooms</span>
                                ) : item.locName == "sanpada" ? (
                                  <span>Palm Beach Rd</span>
                                ) : (
                                  <span>{item.locName}</span>
                                )}
                              </a>
                            </li>

                            {item.showEventDate == EVENT.STATUS_YES && (
                              <li>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/icons/bx_time-five.svg"
                                  }
                                  alt=""
                                />{" "}
                                <span>{item.startTime}</span>
                              </li>
                            )}

                            {item.showEventTime == EVENT.STATUS_YES && (
                              <li>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/icons/schedule-date.svg"
                                  }
                                  alt=""
                                />{" "}
                                <span>
                                  {format(
                                    new Date(item.eventDate),
                                    "iii, LLL dd"
                                  )}
                                </span>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="d_feat_event_btn">
                          <NavLink className="d_reminder">
                            Remind Me Later{" "}
                          </NavLink>
                          {/* <button type="button"  className="d_book_event poppins">Book Event </button> */}
                          <Link
                            to={
                              "/event-details/" +
                              item.eventSlug +
                              "__" +
                              item.eventId
                            }
                          >
                            {item.eventType == "Presentation" ? (
                              <span>Free Entry</span>
                            ) : (
                              <button
                                type="button"
                                className="d_book_event poppins"
                              >
                                Book Event{" "}
                              </button>
                            )}
                          </Link>

                          <NavLink className="bell">
                            {item.eventType !== "Internal" && (
                              <RWebShare
                                data={{
                                  text: "Share this Event",
                                  url: "http://localhost:3000",
                                  title: "Doolally",
                                }}
                              >
                                <button
                                  style={{
                                    marginLeft: "30px",
                                    outline: "none",
                                    border: "none",
                                    backgroundColor: "#a2c760",
                                    height: "20px",
                                    color: "white",
                                    borderRadius: "5px",
                                  }}
                                >
                                  <ShareSharpIcon
                                    // onClick={() =>
                                    //   handleShowReminderPop(item.eventId)
                                    // }
                                    style={{
                                      width: "60%",
                                      marginTop: "-5px",
                                    }}
                                  />
                                </button>
                              </RWebShare>
                            )}
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/events">
                  <span
                    className="mt-3 mb-3 text-center "
                    style={{
                      float: "right",
                      backgroundColor: "#A2C760",
                      color: "white",
                      borderRadius: "5px",
                      width: "100px",
                    }}
                  >
                    {" "}
                    Load More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* section 4 ends for mobile view whats happeing this week */}
        {/* section 2 start for mobile view Review sliding */}

        <div className="ds-none d_main_panel_review">
          <div className="d_right_panl box_paddng">
            <div className="d_title_box">
              <h3 className="d_main_title">Recommendations</h3>
              <p className="d_main_sub_title">
                Beverage reviews, food ratings experiences{" "}
                <span className="d_line"></span>
                <span className="d_round"></span>
                <span className="d_round"></span>
              </p>

              <Review />
            </div>
          </div>
        </div>

        {/* section 2 ends for mobile view Review sliding */}

        <section className="d_main_panel ph-none">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 mb-4">
                <div className="d_left_panal box_padding gray_bg_color">
                  <div className="d_title_box">
                    <h3 className="d_main_title">What's on Tap</h3>
                    <p className="d_main_sub_title">
                      Beer products <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                  </div>
                  <div className="row g-3">
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
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro3.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="d_product_box">
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro4.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="d_product_box">
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro5.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>

                    <div class="col-6">
                      <div class="d_product_box">
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro6.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="d_product_box">
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro6.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div class="col-6">
                      <div class="d_product_box">
                        <figure class="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/pro6.png"}
                            alt=""
                          />
                        </figure>

                        <p class="d_product_title">Mango Cider</p>

                        <a class="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 mb-4 ">
                <div className=" d_midile_panal gray_bg_color ">
                  {/* <Location/> */}
                  <h3 className="d_main_title box_padding">Our locations</h3>
                  <div className="location-section">
                    <div class="row g-3 ">
                      <div className="col col-md-4">
                        <div className="d_locat_box">
                          <div className="d_locat_cnt ">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/images/icons/Location-icon.png"
                              }
                              alt=""
                            />
                            <p className="d_locat_name poppins">
                              Andheri Taproom
                            </p>
                            <p className="d_cnt_locat poppins">Get Locations</p>
                          </div>
                        </div>
                      </div>{" "}
                      <div className="col col-md-4">
                        <div
                          className="d_locat_box"
                          style={{ backgroundColor: "white" }}
                        >
                          <div className="d_locat_cnt ">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/images/icons/Location-iconC.png"
                              }
                              alt=""
                            />
                            <p className="d_locat_name poppins">
                              Andheri Taproom
                            </p>
                            <p className="d_cnt_locat poppins">Get Locations</p>
                          </div>
                        </div>
                      </div>
                      <div className="col col-md-4">
                        <div className="d_locat_box">
                          <div className="d_locat_cnt ">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/images/icons/Location-icon.png"
                              }
                              alt=""
                            />
                            <p className="d_locat_name poppins">
                              Andheri Taproom
                            </p>
                            <p className="d_cnt_locat poppins">Get Locations</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d_hangout box_padding gray_bg_color">
                  <div class="d_title_box">
                    <h3 class="d_main_title">
                      Hangout at Doolally, your neighbourhood adda
                    </h3>

                    <p class="d_main_sub_title">
                      Multi event & exciting fun <span class="d_line"></span>
                      <span class="d_round"></span>
                      <span class="d_round"></span>
                      <span class="d_round"></span>
                    </p>
                    <div class="d_hangout_box">
                      <div class="row g-4">
                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h1.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">
                                Craft beer and cider
                              </p>
                            </div>
                          </a>
                        </div>
                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h2.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">Pet friendly</p>
                            </div>
                          </a>
                        </div>

                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h3.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">Board game</p>
                            </div>
                          </a>
                        </div>
                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h4.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">Board game</p>
                            </div>
                          </a>
                        </div>
                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h5.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">
                                Craft beer and cider
                              </p>
                            </div>
                          </a>
                        </div>
                        <div class="col-6 col-md-4">
                          <a
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                          >
                            <div class="d_product_box">
                              <figure class="d_product_img mb-0 ">
                                <img
                                  src={
                                    process.env.PUBLIC_URL + "/images/h6.png"
                                  }
                                  alt=""
                                />
                              </figure>
                              <p class="d_product_title">Board Game</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h3 className="d_main_title">What's happening this week</h3>

                    <p className="d_main_sub_title">
                      Day Plan <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                  </div>

                  <div className="d_days_box mb-4">
                    <h3 className="d_days_title">Friday</h3>

                    <a>
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <img
                              src={process.env.PUBLIC_URL + "/images/day1.png"}
                              alt=""
                            />
                          </figure>
                        </div>

                        <p className="d_days_subtitle poppins">
                          Doolally Twitter Quiz every Friday
                        </p>
                      </div>
                    </a>

                    <a>
                      <div className="d_days_iner_box">
                        <div>
                          <figure className="mb-0">
                            <img
                              src={process.env.PUBLIC_URL + "/images/day2.png"}
                              alt=""
                            />
                          </figure>
                        </div>

                        <p className="d_days_subtitle poppins">
                          Finger Painting Workshop by Bombay ..
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="d_days_box mb-4">
                    <h3 className="d_days_title">Saturday</h3>

                    <a>
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <img
                              src={process.env.PUBLIC_URL + "/images/day3.png"}
                              alt=""
                            />
                          </figure>
                        </div>

                        <p className="d_days_subtitle poppins">
                          Alcohol Ink on Clocks, by Impressions Art
                        </p>
                      </div>
                    </a>
                  </div>

                  <div className="d_days_box mb-4">
                    <h3 className="d_days_title">Sunday</h3>

                    <a>
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <img
                              src={process.env.PUBLIC_URL + "/images/day4.png"}
                              alt=""
                            />
                          </figure>
                        </div>

                        <p className="d_days_subtitle poppins">
                          Acrylic Painting and Decoupage Workshop
                        </p>
                      </div>
                    </a>
                  </div>
                </div>
                <div className=" d_main_panel_review">
                  <div className="d_right_panal box_padding">
                    <div className="d_title_box">
                      <h3 className="d_main_title">Reviews</h3>
                      <p className="d_main_sub_title">
                        What our happy client Says{" "}
                        <span className="d_line"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
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
export default Doolally;
