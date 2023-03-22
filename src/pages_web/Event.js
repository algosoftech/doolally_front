import React, { useEffect, useState, useCallback } from "react";
import "../style_web/styleDoolally.css";
import axios from "axios";
import { RWebShare } from "react-web-share";
import Photos from "../Photos";
import Gallery from "react-photo-gallery";
// import Carousel, { Modal, ModalGateway } from "react-images";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { format, isValid } from "date-fns";
import styles from "../components/validators/createvent/CreateEventForm.module.css";
import ShareIcon from "@material-ui/icons/Share";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import TwitterIcon from "@material-ui/icons/Twitter";
import { makeStyles } from "@material-ui/core/styles";

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

const Event = () => {
  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [hangout, setHangout] = useState([]);
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
  let currentcateSlug = cateSlug || "";
  const getData = async () => {
    try {
      if (ispage === 1) {
        setIsloading(true);
      } else {
        //setIsLoadMoreLoading(true);
      }
      // let currentcateSlug = cateSlug || "";
      // here Api call for Category Page Data
      //let result  =   await fetch(apiBaseUrl+eventCategoryEventListApiUrl+'?cateSlug='+currentcateSlug+'&page='+ispage+'&perPage='+perPageShowData,getRequestOptions);
      let result = await axios.get(
        apiBaseUrl +
          eventCategoryEventListApiUrl +
          "?cateSlug=" +
          currentcateSlug +
          "&page=" +
          1 +
          "&perPage=" +
          6
      );
      if (result) {
        console.log(result);
        result = result.data;
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
        // setHangout(result.response.result.hangout);
        console.log(result.response.result.eventList);
        if (result.response.result.eventList.length > 0) {
          setEventlist(result.response.result.eventList);
          setErrorMsg("");
        } else {
          setEventlist(result.response.result.eventList);
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

  const loadMore = (e) => {
    //setIspage((ispage) => ispage + 1);
    currentcateSlug = e.cateSlug;
    // alert(e.cateSlug);

    getData();
    // alert(currentcateSlug);
  };
  //share functional handler
  // const ShareShow = (e) => {
  //   // document.getElementtById("share-show").style.display = "none";
  //   let x = `${e}`;
  //   let d = document.getElementById(x);
  //   if (d.style.display == "none") {
  //     d.style.display = "block";
  //   } else d.style.display = "none";
  // };
  // const useStyles = makeStyles((theme) => ({
  //   root: {
  //     flexGrow: 1,
  //   },
  //   menuButton: {
  //     marginRight: theme.spacing(2),
  //   },
  //   title: {
  //     flexGrow: 1,
  //   },
  // }));
  // const [currentImage, setCurrentImage] = useState(0);
  // const [viewerIsOpen, setViewerIsOpen] = useState(false);

  // const openLightbox = useCallback((event, { photo, index }) => {
  //   setCurrentImage(index);
  //   setViewerIsOpen(true);
  // }, []);

  // const closeLightbox = () => {
  //   setCurrentImage(0);
  //   setViewerIsOpen(false);
  // };

  // const classes = useStyles();

  // get data for image gallery

  // const [galleryPic, setGalleryPic] = useState([]);
  // const [galleryPic2, setGalleryPic2] = useState([]);
  // useEffect(() => {
  //   const getDataa = async () => {
  //     let result = await axios.get(apiBaseUrl + "events/getEventImage");

  //     if (result) {
  //       setGalleryPic(
  //         ...galleryPic,
  //         result.data.response.result.eventimagelist
  //       );
  //     }
  //   };
  //   getDataa();
  // }, []);

  // const fun = (e) => {
  //   setGalleryPic2(galleryPic[e].imageList);
  //   setViewerIsOpen(true);
  // };
  // const photos = galleryPic2;

  return (
    <>
      <div className="container-fluid">
        {/* {isloading &&  <LoadingSpinner /> } */}
        <Header />
        <section className="d_main_panel" style={{ margin: "0 1%" }}>
          <div className="container-fluid">
            <div className="row g-5">
              <div className="col-lg-3">
                <div
                  className="d_left_panal box_padding gray_bg_color"
                  id="CE-gallery"
                >
                  <div className="d_title_box">
                    <h5 className="d_main_title">Peek into our past events </h5>
                  </div>
                  {/* {viewerIsOpen == true ? (
                    <div className="row">
                      <div className="col-6">
                        <Gallery photos={photos} />
                      </div>
                    </div>
                  ) : (
                    ""
                  )} */}
                  {/* <ModalGateway>
                    {viewerIsOpen ? (
                      <Modal onClose={closeLightbox}>
                        <Carousel
                          currentIndex={currentImage}
                          views={photos.map((x) => ({
                            ...x,
                            // srcset: x.srcSet,
                            // caption: x.title,
                          }))}
                        />
                      </Modal>
                    ) : null}
                  </ModalGateway> */}
                  <Photos />
                  {/*   <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h1.png"}
                            alt=""
                          />
                        </figure>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h7.png"}
                            alt=""
                          />
                        </figure>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h8.png"}
                            alt=""
                          />
                        </figure>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h9.png"}
                            alt=""
                          />
                        </figure>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h3.png"}
                            alt=""
                          />
                        </figure>

                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h1.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h4.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h5.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h6.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h7.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d_product_box">
                        <figure className="d_product_img mb-0">
                          <img
                            src={process.env.PUBLIC_URL + "/images/h8.png"}
                            alt=""
                          />
                        </figure>
                        <a className="d_overlay">
                          <p>Explore more</p>
                        </a>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="  gray_bg_color">
                  <div className="location-section ">
                    <div className="d-flex justify-content-around pt-3">
                      <div className="adj-location">
                        <Link to="/attending">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/attend-an-event.png"
                            }
                          />
                          <h5>Your events</h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <Link to={"/create-event"}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/book-a-private-party.png"
                            }
                          />
                          <h5>Organise</h5>
                        </Link>
                      </div>
                      <div className="adj-location">
                        <a href={"/create-private-event"}>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/location.png"
                            }
                          />
                          <h5>Book a private event</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className=" box_padding gray_bg_color"
                  style={{ marginTop: "-15px" }}
                >
                  <h5 className="d_main_title">Event list</h5>
                  <p className="d_main_sub_title mb-3">
                    Events in this week
                    <span className="d_line"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                  </p>
                  <div className="row gy-4 gy-md-3 gx-md-3 ">
                    {eventlist.map((item, index) => (
                      <div className="col-6 col-md-6 col-lg-6 ">
                        <div className="d_featured_events_box" key={index}>
                          <figure className="mb-0">
                            <Link
                              to={
                                "/event-details/" +
                                item.eventSlug +
                                "__" +
                                item.eventId
                              }
                            >
                              {/* <img className="col-6" src="images/day3.png" alt="" style={{ height: "138px" }} /> */}
                              <img
                                src={showCorrectImage(item.eventImage)}
                                alt={item.eventName}
                                style={{ height: "179px" }}
                              />
                            </Link>
                          </figure>
                          <div
                            className="d_feat_event_cn"
                            style={{ padding: "4% 4% 0 4%" }}
                          >
                            <p
                              className="d_feat_event_title"
                              style={{
                                height: "20px",
                                padding: "2% 2% 0 2%",
                              }}
                            >
                              {item.eventName.substring(0, 20)}
                            </p>
                            <p
                              className="d_event_name "
                              style={{
                                color: " #a2c760",
                                padding: "2.3%",
                                height: "27px",
                                width: "100%",
                              }}
                            >
                              {" "}
                              By {item.creatorName}
                            </p>
                            <p
                              style={{
                                padding: "2% 2% 0% 2%",
                                height: "105px",
                                wordWrap: "break-word",
                              }}
                            >
                              {" "}
                              {item.eventDescription.substring(0, 80)}...
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
                            <ul
                              className="row d_feat_event_list  "
                              style={{
                                listStyleType: "none",
                               
                              }}
                              id="event-list-details"
                            >
                              <li className="col-7">
                                <a href={item.mapLink} target="_blank">
                                  <RoomOutlinedIcon id="l-icon" />
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
                                <li className="col-5">
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
                              <div className="row">
                                {item.showEventTime == EVENT.STATUS_YES && (
                                  <li className="col-8">
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
                                {item.showEventPrice == EVENT.STATUS_YES && (
                                  <li
                                    className="col"
                                    style={{ marginLeft: "-5px" }}
                                  >
                                    {item.costType == 1 ? (
                                      <strong>Free</strong>
                                    ) : (
                                      <strong >
                                      ₹ {numberWithCommas(item.eventPrice)}
                                      </strong>
                                    )}
                                  </li>
                                )}
                              </div>
                            </ul>
                          </div>
                          <div
                            className="d_feat_event_tn d-flex justify-content-between"
                            style={{ padding: "0% 4% 4% 4%" }}
                          >
                            <Link
                              to={
                                "/event-details/" +
                                item.eventSlug +
                                "__" +
                                item.eventId
                              }
                              className="d_book_even"
                            >
                              {item.eventType == "Presentation" ? (
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ margin: "0 0 5% 5%" }}
                                >
                                  Free Entry
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{
                                    margin: "0 5% 0% 6%",
                                    height: "30px",
                                  }}
                                >
                                  Book Tickets
                                </button>
                              )}
                            </Link>
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
                              <div
                                className="share-like"
                                style={{
                                  height: "27px",
                                  margin: "0px",
                                  marginLeft: "4%",
                                }}
                              >
                                <ShareSharpIcon
                                  className="text-center"
                                  style={{ height: "15px", marginTop: "-3px" }}
                                  // onClick={() => ShareShow(index)}
                                />
                              </div>
                            </RWebShare>
                            {/* <div id={`${index}`} style={{ display: "none" }}>
                              <TwitterIcon />
                              <FacebookIcon />
                              <InstagramIcon />
                              <WhatsAppIcon />
                            </div> */}
                            <div></div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                    {ispage <= istotalpage && (
                      <div className="load-more">
                        <button onClick={loadMore} className="d_comn_btn">
                          {isLoadMoreLoading ? "Loading..." : "Load More"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h5 className="d_main_title">Categories</h5>
                  </div>
                  <ul className="catgry-beer">
                    {eventCategory.map((item, index) => (
                      <>
                        {currEventCategoryId == item.cateId && (
                          <Link to={"/events/" + item.cateSlug}>
                            <li class="active" onClick={() => loadMore(item)}>
                              {item.cateName}({item.count ? item.count : "0"})
                            </li>
                          </Link>
                        )}
                        {currEventCategoryId != item.cateId && (
                          <Link to={"/events/" + item.cateSlug}>
                            <li onClick={() => loadMore(item)}>
                              {item.cateName} ({item.count ? item.count : "0"})
                            </li>
                          </Link>
                        )}
                      </>
                    ))}
                  </ul>
                </div>
                <div className=" d_main_panel_review ">
                  <div
                    className="d_right_panal box_padding whatHappingWeek"
                    style={{ minHeight: "260px" }}
                  >
                    <div className="d_title_box">
                      <h5 className="d_main_title">
                        What's happening this week
                      </h5>
                      <p className="d_main_sub_title">
                        Day Plan <span className="d_line"></span>
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
                                  src={showCorrectImage(
                                    item.eventImage,
                                    "w_80"
                                  )}
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
                            <p className="d_days_subtitle ">
                              {item.eventNames}
                            </p>
                          </Link>
                        </div>
                      </div>
                    ))}
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
export default Event;
