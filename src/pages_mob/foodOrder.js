import React, { useState } from "react";
import Header from "../components/HeaderMob";
import FoodOrderBanner from "../Sliders/foodOrderBanner";

import Footer from "../components/FooterMob";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

const FoodOrder = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d_margin mb-4 pb-4 container-fluid">
        <Header />
        <div className=" col-6 search_order mb-4">
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
          <p>
            <Link to="/beer">
              
              <img
                src={process.env.PUBLIC_URL + "/images/attend-an-event.png"}
                className="h-1st-col"
              />
              <br />
              Beverages
            </Link>
          </p>
          <p id="circle-effect">
            
            <img
              src={process.env.PUBLIC_URL + "/images/book-a-private-party.png"}
              className="h-1st-col"
            />
            <br />
            Food
          </p>
          <p>
            <Link to="/merchandise">
              <img
                src={process.env.PUBLIC_URL + "/images/location.png"}
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
          <p className="d_main_sub_title ">
            
            Crowd favourites , post hits, latest pics
          </p>
        </div>
        <FoodOrderBanner />

        <div
          className="h-food-menu d-flex justify-content-between"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <p className=" d_main_title pd-2 ">
              Menu <h6 className="d_main_sub_title">Breakfast </h6>
            </p>
          </div>

          <div className="poppins d-flex  ">
            <label class="switch mt-2 ">
              <input type="checkbox" style={{ paddingLeft: "-10px" }} />
              <span class="slider round"></span>
            </label>
            <span className="mt-1" style={{ paddingLeft: "3px" }}>
              
              Veg
            </span>
            <div className=" ms-2 d-flex" id="non-veg">
              <label class="switch mt-2  ">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
              <span className="m-1" style={{ paddingLeft: "3px" }}>
                Non-Veg
              </span>
            </div>
          </div>
        </div>

        <div
          class="d-flex justify-content-between food-menu poppins"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <ul className="d_order_list_name mb-0">
              <li>
                <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                  <em></em>
                </span>
              </li>
              <li
                style={{
                  width: "70px",
                  height: "20px",
                  backgroundColor: "#f8e8de",
                  borderRadius: "5px",
                }}
              >
                <p
                  className="poppins text-center"
                  style={{ color: "#dc8b5b", fontSize: "10px" }}
                >
                  Bestsellers
                </p>
              </li>
            </ul>
            <p style={{ fontSize: "14px", color: "grey" }}>In Breakfast</p>
            <p
              style={{
                fontWeight: "600",
                lineHeight: "0px",
                marginTop: "-5px",
              }}
            >
              English Breakfast
            </p>
            <img
              src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
              style={{ width: "70px", marginTop: "-8px" }}
            />
            <br />
            <strong style={{ marginTop: "-20px" }}>₹ 380</strong>
            <p style={{ fontSize: "14px", color: "grey" }}>
              Eggs fried ,Chicken sausag <br /> Bacon, Baked beans, Toast
            </p>
            <div className="d-flex" style={{ marginTop: "-14px" }}>
              <div className="share-like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="share-like">
                <FontAwesomeIcon icon={faShare} />
              </div>
            </div>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/food3.jpg"}
              style={{ width: "120px", height: "135px", marginBottom: "-10px" }}
            />
            <br />
            <button
              style={{
                width: "100px",
                backgroundColor: "#edf7dd",
                border: "none",
                outline: "none",
                marginLeft: "10%",
                color: "#759246",
                borderRadius: "5px",
              }}
            >
              <strong>Add</strong>
            </button>
          </div>
        </div>

        <div
          class="d-flex justify-content-between food-menu poppins"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <ul className="d_order_list_name mb-0">
              <li>
                <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                  <em></em>
                </span>
              </li>
              <li
                style={{
                  width: "70px",
                  height: "20px",
                  backgroundColor: "#f8e8de",
                  borderRadius: "5px",
                }}
              >
                <p
                  className="poppins text-center"
                  style={{ color: "#dc8b5b", fontSize: "10px" }}
                >
                  Bestsellers
                </p>
              </li>
            </ul>
            <p style={{ fontSize: "14px", color: "grey" }}>In Breakfast</p>
            <p
              style={{
                fontWeight: "600",
                lineHeight: "0px",
                marginTop: "-5px",
              }}
            >
              English Breakfast
            </p>
            <img
              src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
              style={{ width: "70px", marginTop: "-8px" }}
            />
            <br />
            <strong style={{ marginTop: "-20px" }}>₹ 380</strong>
            <p style={{ fontSize: "14px", color: "grey" }}>
              Eggs fried ,Chicken sausag <br /> Bacon, Baked beans, Toast
            </p>
            <div className="d-flex" style={{ marginTop: "-14px" }}>
              <div className="share-like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="share-like">
                <FontAwesomeIcon icon={faShare} />
              </div>
            </div>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/food2.webp"}
              style={{ width: "120px", height: "135px", marginBottom: "-10px" }}
            />
            <br />
            <button
              style={{
                width: "100px",
                backgroundColor: "#edf7dd",
                border: "none",
                outline: "none",
                marginLeft: "10%",
                color: "#759246",
                borderRadius: "5px",
              }}
            >
              <strong>Add</strong>
            </button>
          </div>
        </div>

        <div
          class="d-flex justify-content-between food-menu poppins mb-4 pb-4"
          style={{
            border: "1px solid #d4d4d4",
            borderRadius: "5px",
            boxShadow: "2px 5px 5px 5px #f5f5f5",
            marginBottom: "2%",
          }}
        >
          <div>
            <ul className="d_order_list_name mb-0">
              <li>
                <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                  <em></em>
                </span>
              </li>
              <li
                style={{
                  width: "70px",
                  height: "20px",
                  backgroundColor: "#f8e8de",
                  borderRadius: "5px",
                }}
              >
                <p
                  className="poppins text-center"
                  style={{ color: "#dc8b5b", fontSize: "10px" }}
                >
                  Bestsellers
                </p>
              </li>
            </ul>
            <p style={{ fontSize: "14px", color: "grey" }}>In Breakfast</p>
            <p
              style={{
                fontWeight: "600",
                lineHeight: "0px",
                marginTop: "-5px",
              }}
            >
              English Breakfast
            </p>
            <img
              src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
              style={{ width: "70px", marginTop: "-8px" }}
            />
            <br />
            <strong style={{ marginTop: "-20px" }}>₹ 380</strong>
            <p style={{ fontSize: "14px", color: "grey" }}>
              Eggs fried ,Chicken sausag <br /> Bacon, Baked beans, Toast
            </p>
            <div className="d-flex" style={{ marginTop: "-14px" }}>
              <div className="share-like">
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className="share-like">
                <FontAwesomeIcon icon={faShare} />
              </div>
            </div>
          </div>

          <div>
            <img
              src={process.env.PUBLIC_URL + "/images/food.webp"}
              style={{ width: "120px", height: "135px", marginBottom: "-10px" }}
            />
            <br />
            <button
              style={{
                width: "100px",
                backgroundColor: "#edf7dd",
                border: "none",
                outline: "none",
                marginLeft: "10%",
                color: "#759246",
                borderRadius: "5px",
              }}
            >
              <strong>Add</strong>
            </button>
          </div>
        </div>
        {/* <div class="d-flex justify-content-between food-menu mb-4 pb-4 poppins">
<div > 
<p style={{fontSize:"14px", color:'grey'}}>In Breakfast</p>
    <p style={{fontWeight:"600",lineHeight:"0px" }}>English Breakfast</p> 
    <img src={process.env.PUBLIC_URL + "/images/icons/star.jpg"} style={{width:"50px"}}/><br/>
<strong>₹ 380</strong>
<p style={{fontSize:"14px", color:'grey'}}>Eggs fried ,Chicken sausag <br/> Bacon, Baked beans, Toast</p>

</div>

<div > 
<img src={process.env.PUBLIC_URL + "/images/food3.jpg"} style={{ width:"120px",height:"135px", marginBottom:"-10px"}}/>
    <br/>    <button style={{width:"100px", backgroundColor:"#edf7dd",border:"none",outline:"none", marginLeft:"10%", color:"#759246", borderRadius:"5px"}}><strong>Add</strong></button>

</div>


</div> */}

        <Footer />
        <div
          onClick={handleShow}
          style={{
            width: "80px",
            textAlign: "center",
            borderRadius: "5px",
            backgroundColor: "#A2C760",
            position: "fixed",
            bottom: "0",
            marginBottom: "60px",
            marginLeft: "37%",
            color: "white",
            fontSize: "20px",
          }}
        >
          {/* <RestaurantMenuOutlinedIcon/> */}
          Menu
        </div>
      </div>

      {/* Modal */}

      <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          <Modal.Title className="d_main_title text-center">Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Previous ordered item</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Recommended</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Popular in breakfast</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Chef special</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Breakfast</Form.Label>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Fresh salads</Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>Burgers</Form.Label>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FoodOrder;
