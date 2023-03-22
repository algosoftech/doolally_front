import React from "react";
import Header from "../components/HeaderMob";
import Review from "../Sliders/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/FooterMob";

const Location = () => {
  return (
    <>
      <div className="d_margin mb-4 pb-4 container-fluid">
        <Header />

        <div className=" col-6 search_order ">
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
        <div
          className=" ds-none  home-1st-col d-flex justify-content-center poppins  mt-2 "
          style={{ margin: "1px auto" }}
        >
          <p>
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/images/mumbai.png"}
              className="h-1st-col"
              alt="mumbai"
            />{" "}
            <br />
            Mumbai
          </p>

          <p>
            {" "}
            <img
              src={process.env.PUBLIC_URL + "/images/pune.png"}
              className="h-1st-col"
              alt="pune"
            />{" "}
            <br />
            Pune
          </p>
          {/* <p> <img src={process.env.PUBLIC_URL + "/images/pune.png"} className="h-1st-col"/><br/>Pune</p> */}
        </div>

        <div className="ds-none d_main_panel_review mt-4">
          <div className="d_right_panl box_paddng">
            <div className="d_title_box">
              <h3 className="d_main_title">Latest Recommendations</h3>
              <p className="d_main_sub_title">
                Beer reviews, food ratings experiences{" "}
                <span className="d_line"></span>
                <span className="d_round"></span>
                <span className="d_round"></span>
                <span className="d_round"></span>
              </p>

              <Review />
            </div>
            {/* 
            <h3 className="d_main_title">Mumbai customer Recommendations </h3>
            <div className="d_main_sub_title mb-3  ">
              What's the word on the street <span class="d_line"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
            </div>

            <Review /> */}

            {/* <h3 className="d_main_title mt-4">
              Pune customer Recommendations{" "}
            </h3>
            <div className="d_main_sub_title mb-3 ">
              What's the word on the street <span class="d_line"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
              <span class="d_round"></span>
            </div>
            <Review /> */}
          </div>
        </div>
        {/* body */}

        <div
          class="d-flex food-menu mt-4"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <h5 className="poppins"> Taproom in Khar</h5>
            <img
              src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
              style={{ width: "60px", margin: "0px auto", marginTop: "-20px" }}
            />
            <p style={{ fontSize: "14px", color: "grey", width: "200px" }}>
              Doolally Taproom - Khar Raj Kutir Apartment, 10 A, E854, Rd Number
              3, Khar West, Mumbai, Maharashtra 400052, India
            </p>
          </div>

          <div className="text-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                marginLeft: "90px",
                marginBottom: "-13px",
                position: "relative",
                color: "#9BC059",
                fontSize: "30px",
              }}
            />
            <img
              src={process.env.PUBLIC_URL + "/images/map.png"}
              style={{ width: "120px", height: "125px", marginTop: "-20px" }}
            />

            <br />

            <strong>Taproom in Khar</strong>
            <p style={{ fontSize: "14px", color: "grey" }}>10:00am-12:00pm</p>
          </div>
        </div>
        <div
          class="d-flex food-menu"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <h5 className="poppins"> Taproom in Andheri</h5>
            <img
              src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
              style={{ width: "60px", margin: "0px auto", marginTop: "-20px" }}
            />
            <p style={{ fontSize: "14px", color: "grey", width: "200px" }}>
              Doolally Taproom - Andheri C18-21 Dalia Industrial Estate Near,
              Fun Republic Road, Off New Link Rd, Veera Desai Industrial Estate,
              Andheri West, Mumbai, Maharashtra 400053, India
            </p>
          </div>

          <div className="text-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{
                marginLeft: "90px",
                marginBottom: "-13px",
                position: "relative",
                color: "#9BC059",
                fontSize: "30px",
              }}
            />
            <img
              src={process.env.PUBLIC_URL + "/images/map.png"}
              style={{ width: "120px", height: "125px", marginTop: "-20px" }}
            />

            <br />

            <strong>Taproom in Andheri</strong>
            <p style={{ fontSize: "14px", color: "grey" }}>10:00am-12:00pm</p>
          </div>
        </div>
        <div
          class="d-flex food-menu mb-4"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        ></div>

        <Footer />
      </div>
    </>
  );
};

export default Location;
