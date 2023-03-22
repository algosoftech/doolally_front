import React, { memo, useEffect, useMemo, useState,useContext } from "react";
import "../style_web/styleDoolally.css";
import Location from "../Sliders/Location";
import Review from "../Sliders/Review";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import locatinBlackIcon from "../images/icons/Location-icon.png";
import locatiGreenIcon from "../images/icons/Location-iconC.png";
import { format, isValid } from "date-fns";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
// import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
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

const Beer = () => {

  const {beveragesItem,onAdd,beveragesCategory} =useContext(FnbContext);

console.log(beveragesItem,"beer-Items")



  const theme = useTheme();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [location, setLocation] = useState([]);
  const [hangout, setHangout] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [isActive, setIsActive] = useState(false);

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

  const handleClick = (event) => {
    let btn = document.getElementsByClassName("sidebar");
    for (var i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace("active", "");
        this.className += " active";
      });
    }
  };

  // paggination
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const beveragesItems = beveragesItem.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(beveragesItem.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  // end paggination
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
                    {/* here the Api render on home page for whats on tap */}
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
              <div className="col-lg-6 mb-4 ">
                <div className=" d_midile_panal gray_bg_color">
                  {/* <Location/> */}
                  {/* <h3 className="d_main_title box_padding">Our Locations</h3> */}
                  <div className="location-section ">
                    <div className="d-flex justify-content-around pt-3">
                      <div className="adj-location" id="circle-effect">
                        <img
                          src={process.env.PUBLIC_URL + "/images/beer.png"}
                        />
                        <h5> Beverages</h5>
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
                      <div className="adj-location">
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

                <div className="d_beer box_padding gray_bg_color">
                  <div className="h-food-menuu " style={{ padding: "2%" }}>
                    <p className=" d_main_title ">
                      <h4>Menu</h4>
                      <h6 className="d_main_sub_title">
                        Craft Beverages and Ciders
                      </h6>{" "}
                    </p>
                  </div>
                  {beveragesItems.map((item, id) => (

<div
  class="d-flex justify-content-between food-menu"
  style={{
    border: "1px solid #d4d4d4",
    borderRadius: "5px",
    boxShadow: "2px 5px 5px 5px #f5f5f5",
    marginBottom: "2%",
  }}
>
  <div>
    <h5> {item.itemname}</h5>
    <p style={{ fontSize: "14px", color: "grey" }}>
      {" "}
    {item.itemdescription}

    </p>
    <h6> {item.price}</h6>
  </div>

  <div>
    <img
      src={process.env.PUBLIC_URL + "/images/pro7.png"}
      style={{
        width: "160px",
        height: "140px",
        marginBottom: "-10px",
      }}
    />
    <br />{" "}
    <button
      style={{
        width: "100px",
        backgroundColor: "#edf7dd",
        border: "none",
        outline: "none",
        marginLeft: "20%",
        color: "#759246",
        borderRadius: "5px",
      }}
    >
      <strong onClick={()=>onAdd(item,id)}>Add </strong>
    </button>
  </div>
</div>

))}
<div className="paggination-btn">
<button onClick={handleNextPage}>Next</button>
<button onClick={handlePrevPage}>Prev</button>
     
      <p>Page {currentPage} of {totalPages}</p>
</div>


                </div>
       
              </div>

              {/*  category section */}
              <div className="col-lg-3">
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h5 className="d_main_title">Categories</h5>
                  </div>
                  <ul className="catgry-beer">
                    {/* <li className="d-flex">
                      <img
                        src={process.env.PUBLIC_URL + "/images/beer_cat.png"}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Ales
                    </li>

                    <li>
                      {" "}
                      <img
                        src={process.env.PUBLIC_URL + "/images/beer_cat2.png"}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Lagers
                    </li> */}
                    {beveragesCategory.map((item, index) => (
                    <li>
                     {/* <img src={item.category_image_url} alt="img"/> */}
                     {item.categoryname}
                     </li>
                    ))}
                    {/* <li>Wheat Beers</li>
                    <li>Ciders</li>

                    <li>Mocktails</li>
                    <li>Juices</li>
                    <li>Kombucha</li>
                    <li>Milkshakes</li> */}
                  </ul>
                </div>

                {/* review section  */}
                <div className=" d_main_panel_review ">
                  <div className="d_right_panal box_padding">
                    <div className="d_title_box">
                      <h5 className="d_main_title">Recommendations</h5>
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

      {/* modal  */}

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-bottom"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <h3 className="" style={{ width: "96%" }}>
            Belgian witbier
          </h3>

          <button
            className="z"
            onClick={handleClose}
            id="btn-modal-footer"
            style={{
              backgroundColor: "#a2c760",
            }}
          >
            Add
          </button>
        </Modal.Header>

        <Modal.Body>
          <div
            className="row g-5"
            style={{ overflow: "scroll", height: "400px" }}
          >
            <div className="col-2">
              <div className="row" id="myDiv">
                <div className="sidebar active" onClick={handleClick}>
                  <a className="" href="#beer-cider">
                    Beer cider
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="sidebar" onClick={handleClick}>
                  <a className=" " href="#wheat-beer">
                    Wheat Beer
                  </a>
                </div>
              </div>
            </div>
            <div className="col-10">
              <div
                className="d-flex justify-content-around"
                style={{
                  border: "1px solid #d4d4d4",
                  borderRadius: "5px",
                  boxShadow: "2px 5px 5px 5px #f5f5f5",
                  marginBottom: "2%",
                  padding: "2%",
                }}
              >
                <div>
                  <p className="d_main_title d_bo">Beer Cider</p>
                  <h6>you can choose any one option </h6>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L</label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>
                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>
              </div>
              <div
                className="d-flex justify-content-around mt-4"
                style={{
                  border: "1px solid #d4d4d4",
                  borderRadius: "5px",
                  boxShadow: "2px 5px 5px 5px #f5f5f5",
                  marginBottom: "2%",
                  padding: "2%",
                }}
              >
                <div>
                  <p className="d_main_title d_bo">Wheat Beer </p>
                  <h6>you can choose any one option </h6>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>

                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L</label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>
                <div className="col-2">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">1L </label>
                    <label class=" adonPrice">Rs 500</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Beer;
