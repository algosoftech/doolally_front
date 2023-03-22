import React from "react";
import Header from "../components/HeaderMob";
import NavLink from "react-bootstrap/esm/NavLink";
import Footer from "../components/FooterMob";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <div className=" container-fluid d_margin mb-4 pb-4 d_order_borderbtm">
        <Header />

        <p className="d_main_title">Your order summary</p>
        <p className="d_main_sub_title">
          Oredered items <span className="d_line"></span>
          <span className="d_round"></span>
          <span className="d_round"></span>
          <span className="d_round"></span>
        </p>
        <div className="row">
          <div className="col-3">
            <img
              src={process.env.PUBLIC_URL + "/images/h9.png"}
              style={{ width: "80px" }}
            />
          </div>
          <div className="col-5">
            <strong> Brute[ 1 Litre]</strong>

            <div className="d-flex mt-2">
              {/* <span className="d_main_sub_title">Qty :</span> */}
              <div className="g-add" id="d_btndiv9">
                <form className="d-flex align-items-center ">
                  <div className="form">
                    <div
                      className="value-button"
                      id="decrease"
                      onclick="decreaseValue()"
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input
                      type="number"
                      className="number"
                      id="number"
                      value="1"
                      style={{ width: "20px" }}
                    />
                    <div
                      className="value-button"
                      id="increase"
                      onclick="increaseValue()"
                      value="Increase Value"
                    >
                      +
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-4 text-center ">
            <strong>₹500.00</strong>
            <br />
            <button
              className="mt-2"
              style={{
                backgroundColor: "#f7eef3",
                color: "#c86e7a",
                border: "none",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <img
              src={process.env.PUBLIC_URL + "/images/h9.png"}
              style={{ width: "80px" }}
            />
          </div>
          <div className="col-5">
            <strong> Brute[ 1 Litre]</strong>

            <div className="d-flex mt-2">
              {/* <span className="d_main_sub_title">Qty :</span> */}
              <div className="g-add" id="d_btndiv9">
                <form className="d-flex align-items-center ">
                  <div className="form">
                    <div
                      className="value-button"
                      id="decrease"
                      onclick="decreaseValue()"
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input
                      type="number"
                      className="number"
                      id="number"
                      value="1"
                      style={{ width: "20px" }}
                    />
                    <div
                      className="value-button"
                      id="increase"
                      onclick="increaseValue()"
                      value="Increase Value"
                    >
                      +
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-4 text-center ">
            <strong>₹500.00</strong>
            <br />
            <button
              className="mt-2"
              style={{
                backgroundColor: "#f7eef3",
                color: "#c86e7a",
                border: "none",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              Remove
            </button>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-3">
            <img
              src={process.env.PUBLIC_URL + "/images/h9.png"}
              style={{ width: "80px" }}
            />
          </div>
          <div className="col-5">
            <strong> Brute[ 1 Litre]</strong>

            <div className="d-flex mt-2">
              {/* <span className="d_main_sub_title">Qty :</span> */}
              <div className="g-add" id="d_btndiv9">
                <form className="d-flex align-items-center ">
                  <div className="form">
                    <div
                      className="value-button"
                      id="decrease"
                      onclick="decreaseValue()"
                      value="Decrease Value"
                    >
                      -
                    </div>
                    <input
                      type="number"
                      className="number"
                      id="number"
                      value="1"
                      style={{ width: "20px" }}
                    />
                    <div
                      className="value-button"
                      id="increase"
                      onclick="increaseValue()"
                      value="Increase Value"
                    >
                      +
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-4 text-center ">
            <strong>₹500.00</strong>
            <br />
            <button
              className="mt-2"
              style={{
                backgroundColor: "#f7eef3",
                color: "#c86e7a",
                border: "none",
                borderRadius: "5px",
                width: "100px",
              }}
            >
              Remove
            </button>
          </div>
        </div>

        <div>
          <p className="d_main_title mt-4">Add more food items</p>
          <p className="d_main_sub_title">
            Latest Activities <span className="d_line"></span>
            <span className="d_round"></span>
            <span className="d_round"></span>
            <span className="d_round"></span>
          </p>
        </div>

        <div className=" ds-none row g-2 mb-4">
          <div className="col-6 col-md-6 col-lg-4">
            <div className="d_featured_events_box">
              <figure className="mb-0">
                <img
                  className="col-6"
                  src={process.env.PUBLIC_URL + "/images/food4.png"}
                  alt=""
                  style={{ height: "138px" }}
                />
              </figure>
              <div className="d_feat_event_cnt poppins">
                <p className="d_feat_event_title">Rahim ki nihari</p>
                <p className="d_event_name">Customization available </p>
                <ul className="d_feat_event_list mt-4">
                  <li>
                    <span>
                      nihari originated in the royal kitchens of Lucknow{" "}
                    </span>
                  </li>
                  <li>
                    {" "}
                    start from <strong>Rs 1800/-</strong>
                  </li>
                </ul>
              </div>
              <div className="d_feat_event_btn">
                <button
                  type="button"
                  className="d_book_event poppins"
                  style={{ width: "200px" }}
                >
                  Book Event{" "}
                </button>
                <NavLink className="bell">
                  <img
                    src={process.env.PUBLIC_URL + "/images/icons/bell1.jpg"}
                    alt="ff"
                    style={{ width: "25px" }}
                  />
                </NavLink>
              </div>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-4">
            <div className="d_featured_events_box">
              <figure className="mb-0">
                <img
                  className="col-6"
                  src={process.env.PUBLIC_URL + "/images/food5.png"}
                  alt=""
                  style={{ height: "138px" }}
                />
              </figure>
              <div className="d_feat_event_cnt poppins">
                <p className="d_feat_event_title">Radhaballabhi</p>
                <p className="d_event_name">Customization available </p>
                <ul className="d_feat_event_list mt-4">
                  <li>
                    <span>
                      nihari originated in the royal kitchens of Lucknow{" "}
                    </span>
                  </li>
                  <li>
                    {" "}
                    start from <strong>Rs 1800/-</strong>
                  </li>
                </ul>
              </div>
              <div className="d_feat_event_btn">
                <button
                  type="button"
                  className="d_book_event poppins"
                  style={{ width: "200px" }}
                >
                  Book Event{" "}
                </button>
                <NavLink className="bell">
                  <img
                    src={process.env.PUBLIC_URL + "/images/icons/bell1.jpg"}
                    alt="ff"
                    style={{ width: "27px" }}
                  />
                </NavLink>
              </div>
            </div>
          </div>

          <span
            className="mt-3 mb-3 text-center "
            style={{
              backgroundColor: "#A2C760",
              color: "white",
              borderRadius: "5px",
              height: "30px",
              width: "80%",
              marginLeft: "10%",
            }}
          >
            Proceed to checkout
          </span>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cart;
