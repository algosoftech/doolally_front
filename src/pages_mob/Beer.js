import React from "react";
import Header from "../components/HeaderMob";
import FoodOrderBanner from "../Sliders/foodOrderBanner";
import { Link } from "react-router-dom";
import Footer from "../components/FooterMob";
const Beer = () => {
  return (
    <>
      <div className="container-fluid d_margin mb-4 pb-4">
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

        <div className=" ds-none  home-1st-col d-flex justify-content-around poppins  mt-2 ">
          <p id="circle-effect">
            
            <img
              src={process.env.PUBLIC_URL + "/images/h7.png"}
              className="h-1st-col"
            />
            <br />
            Beverages
          </p>

          <p>
            <Link to="/food">
              
              <img
                src={process.env.PUBLIC_URL + "/images/h5.png"}
                className="h-1st-col"
              />
              <br />
              Food
            </Link>
          </p>

          <p>
            <Link to="/merchandise">
              <img
                src={process.env.PUBLIC_URL + "/images/tshirt1.jpg"}
                className="h-1st-col"
              />
              <br />
              Merchandise
            </Link>
          </p>
        </div>

        {/* body */}
        <div className="d_main_title mt-4" style={{ paddingLeft: "3%" }}>
          
          Recommendation and best sellers
          <p className="d_main_sub_title">
            
            Crowd favourites , post hits, latest pics
          </p>
        </div>
        <FoodOrderBanner />
        <div className="h-food-menuu " style={{ padding: "2%" }}>
          <p className=" d_main_title ">
            Menu
            <h6 className="d_main_sub_title">Craft beer and ciders</h6>
          </p>
        </div>

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
            <h5> Belgian witbier</h5>
            <p style={{ fontSize: "14px", color: "grey" }}>
              
              The witbier style, also known as bière blanche in the French also
              known as bière blanche in the French
            </p>
            <h6>1 Litre = Rs 500</h6>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/pro1.png"}
              style={{ width: "160px", height: "140px", marginBottom: "-10px" }}
            />
            <br />
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
              <strong>Add </strong>
            </button>
          </div>
        </div>

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
            <h5> Belgian witbier</h5>
            <p style={{ fontSize: "14px", color: "grey" }}>
              
              The witbier style, also known as bière blanche in the French also
              known as bière blanche in the French
            </p>
            <h6>1 Litre = Rs 500</h6>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/pro1.png"}
              style={{ width: "160px", height: "140px", marginBottom: "-10px" }}
            />
            <br />
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
              <strong>Add</strong>
            </button>
          </div>
        </div>
        <div
          class="d-flex justify-content-between food-menu mb-4"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <h5> Belgian witbier</h5>
            <p style={{ fontSize: "14px", color: "grey" }}>
              
              The witbier style, also known as bière blanche in the French also
              known as bière blanche in the French
            </p>
            <h6>1 Litre = Rs 500</h6>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/pro1.png"}
              style={{ width: "160px", height: "140px", marginBottom: "-10px" }}
            />
            <br />
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
              <strong>Add</strong>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Beer;
