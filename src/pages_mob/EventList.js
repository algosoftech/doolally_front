import React, { memo, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { RWebShare } from "react-web-share";
import "../style_web/styleDoolally.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Helper from "../utils/Helper";
import Dropdown from "react-bootstrap/Dropdown";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { format, isValid } from "date-fns";
import styles from "../components/validators/createvent/CreateEventForm.module.css";

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
import { height } from "@mui/system";

const EventList = () => {
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
  console.log(eventlist);
  return (
    <>
      <div className="d_margin mb-4 pb-4 container-fluid">
        <Header />

        <div className=" col-6 search_order mb-2">
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

        <div className="ds-none mb-2 ">
          <div className="home-1st-col d-flex justify-content-around poppins   ">
            <p>
              <Link to="/attending">
                
                <img
                  src={
                    process.env.PUBLIC_URL + "/images/book-a-private-party.png"
                  }
                  className="h-1st-col"
                />
                <br /> Your Events
              </Link>
            </p>
            <p>
              <Link to="/create-event">
                
                <img
                  src={process.env.PUBLIC_URL + "/images/attend-an-event.png"}
                  className="h-1st-col"
                />
                <br />
                Organise
              </Link>
            </p>
            <p>
              <Link to="/create-private-event">
                <img
                  src={process.env.PUBLIC_URL + "/images/location.png"}
                  className="h-1st-col"
                />
                <br />
                Private Event
              </Link>
            </p>
          </div>
        </div>

        <Dropdown>
          <Dropdown.Toggle
            variant="ffdsfdsfd"
            id="dropdown-split-basic"
            style={{ width: "100%", border: "1px solid #A2C760" }}
          >
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ width: "100%" }}>
            {eventCategory.map((item, index) => (
              <Dropdown.Item href={"/events/" + item.cateSlug}>
                {currEventCategoryId == item.cateId && (
                  <a href={"/events/" + item.cateSlug}>
                    <li class="active">{item.cateName}</li>
                  </a>
                )}
                {currEventCategoryId != item.cateId && (
                  <a href={"/events/" + item.cateSlug}>
                    <li>{item.cateName}</li>
                  </a>
                )}
              </Dropdown.Item>
            ))}{" "}
          </Dropdown.Menu>
        </Dropdown>

        <section className="d_main_panel mt-2">
          {/* <div className="container-fluid"> */}
          <div className="row">
            <div className="col-lg-9">
              <div className="d_find_event box_paddin ray_bg_color">
                <div className="d_featured_events">
                  <div className="row g-3 ">
             
                  <p class="d_main_sub_title" style={{fontSize:"17px", lineHeight:"0px", padding:"2% auto", marginTop:"35px"}}>
                  What's Happening This Week <span class="d_line"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
            </p>
                    {eventlist.map((item, index) => (
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
                            <br />
                            <p className="d_feat_event_name" style={{width:"100%"}}>
                              By {item.creatorName.substring(0, 15)}
                            </p>
                            <p
                              className="pb-3"
                              style={{ marginTop: "-40px", height: "93px", wordWrap: "break-word" }}
                            >
                              
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
                                  />
                                  {item.customLocation ? (
                                    <span>{item.customLocation}</span>
                                  ) : item.isSpecialEvent ==
                                    EVENT.STATUS_YES ? (
                                    <span>1st Brewhouse, Pune</span>
                                  ) : item.isEventEverywhere ==
                                      EVENT.STATUS_YES &&
                                    item.eventId == 2530 ? (
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
                                  />
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
                                  />
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
                              Remind Me Later
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
                                  Book Event
                                </button>
                              )}
                            </Link>

                            <NavLink className="bell">
                              {item.eventType !== "Internal" && (
                                <RWebShare
                              data={{
                                text: "Share this Event",
                                url:
                                  "/event-details/" +
                                  item.eventSlug +
                                  "__" +
                                  item.eventId,
                                title: "Doolally",
                              }}
                            >
                                  <button
                                    style={{
                                      marginLeft: "50%",
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

                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </section>

        <Modal show={showReminderPop} onHide={handleCloseReminderPop}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div className="content-block">
                <h5>
                  <strong>
                    We'll send you a reminder 24 hours before the event:
                  </strong>
                </h5>
                <input
                  className={styles.formField}
                  type="text"
                  aria-label="Email address"
                  name="reminderMeEmailAddress"
                  placeholder="Email address"
                  value={reminderMeEmailAddress}
                  onChange={onUpdateReminderMeField}
                  onBlur={onBlureReminderMeField}
                />
                {errorMsgReminderMe && (
                  <p className="errorMsg">{errorMsgReminderMe}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onSubmitReminderMeForm}>
              {isReminderSubmitButtonLoading ? "Loading..." : "Reminder Me"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </>
  );
};

export default EventList;
