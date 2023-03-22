import React, { useState } from "react";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const Merchandise = () => {
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  return (
    <>
      <div className="d_margin container-fluid">
        <Header />
        <div className=" col-6 search_order mb-4 ">
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
                src={process.env.PUBLIC_URL + "/images/h9.png"}
                className="h-1st-col"
              />
              <br />
              Beverages
            </Link>
          </p>
          <p>
            <Link to="/food">
             
              <img
                src={process.env.PUBLIC_URL + "/images/food.webp"}
                className="h-1st-col"
              />
              <br />
              Food
            </Link>
          </p>
          <p id="circle-effect">
            <img
              src={process.env.PUBLIC_URL + "/images/tshirt1.jpg"}
              className="h-1st-col"
            />
            <br />
            Merchandise
          </p>
        </div>

        {/* body */}
        {/* <div className="d_main_title mt-4" style={{paddingLeft:"3%"}}>  Recommendation and best sellers
<p  className="d_main_sub_title"> Crowd favourites , post hits, latest pics</p></div>
<FoodOrderBanner/> */}
        <div style={{ marginBottom: "80px" }}>
          <div className="row g-2 mt-3">
            <div className="col-6 col-md-6 col-lg-4 ">
              <div className="d_featured_events_box">
                <figure className="mb-0">
                  <img
                    src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                    alt=""
                  />
                </figure>
                <div className="d_feat_event_cnt poppins">
                  <ul
                    className="d_feat_event_list"
                    style={{ marginTop: "30px" }}
                  >
                    <li>
                      <strong>T-shirt </strong>
                    </li>
                    <li> Mens casual comfort</li>
                    <li>
                     
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          width: "30px",
                          borderRadius: "5px",
                          backgroundColor: "#a2c760",
                          color: "white",
                        }}
                        onClick={handleShow2}
                      >
                        Size
                      </button>
                    </li>
                    <li>
                      <strong>Rs 2000/- </strong>
                    </li>
                  </ul>
                </div>
                <div className="d_feat_event_btn">
                  <a className="d_reminder">Remind Me Later </a>
                  <button type="button" className="d_book_event poppins">
                    Buy Now
                  </button>
                  <a
                    className="bell text-center"
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      padding: "2% 2% 4% 2%",
                      backgroundColor: "#A2C760",
                      borderRadius: "5px",
                    }}
                  >
                    <ShoppingCartIcon style={{ height: "20px" }} />
                  </a>
                </div>
              </div>
              {/* <button className="mt-3 mb-3"> Load more</button> */}
            </div>

            <div className="col-6 col-md-6 col-lg-4 ">
              <div className="d_featured_events_box">
                <figure className="mb-0">
                  <img
                    src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                    alt=""
                  />
                </figure>
                <div className="d_feat_event_cnt poppins">
                  <ul
                    className="d_feat_event_list"
                    style={{ marginTop: "30px" }}
                  >
                    <li>
                      <strong>T-shirt </strong>
                    </li>
                    <li> Mens casual comfort</li>
                    <li>
                     
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          width: "30px",
                          borderRadius: "5px",
                          backgroundColor: "#a2c760",
                          color: "white",
                        }}
                        onClick={handleShow2}
                      >
                        Size
                      </button>
                    </li>
                    <li>
                      <strong>Rs 2000/- </strong>
                    </li>
                  </ul>
                </div>
                <div className="d_feat_event_btn">
                  <a className="d_reminder">Remind Me Later </a>
                  <button type="button" className="d_book_event poppins">
                    Buy Now
                  </button>
                  <a
                    className="bell text-center"
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      padding: "2% 2% 4% 2%",
                      backgroundColor: "#A2C760",
                      borderRadius: "5px",
                    }}
                  >
                    <ShoppingCartIcon style={{ height: "20px" }} />
                  </a>
                </div>
              </div>
              {/* <button className="mt-3 mb-3"> Load more</button> */}
            </div>

            <div className="col-6 col-md-6 col-lg-4 ">
              <div className="d_featured_events_box">
                <figure className="mb-0">
                  <img
                    src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                    alt=""
                  />
                </figure>
                <div className="d_feat_event_cnt poppins">
                  <ul
                    className="d_feat_event_list"
                    style={{ marginTop: "30px" }}
                  >
                    <li>
                      <strong>T-shirt </strong>
                    </li>
                    <li> Mens casual comfort</li>
                    <li>
                     
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          width: "30px",
                          borderRadius: "5px",
                          backgroundColor: "#a2c760",
                          color: "white",
                        }}
                        onClick={handleShow2}
                      >
                        Size
                      </button>
                    </li>
                    <li>
                      <strong>Rs 2000/- </strong>
                    </li>
                  </ul>
                </div>
                <div className="d_feat_event_btn">
                  <a className="d_reminder">Remind Me Later </a>
                  <button type="button" className="d_book_event poppins">
                    Buy Now
                  </button>
                  <a
                    className="bell text-center"
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      padding: "2% 2% 4% 2%",
                      backgroundColor: "#A2C760",
                      borderRadius: "5px",
                    }}
                  >
                    <ShoppingCartIcon style={{ height: "20px" }} />
                  </a>
                </div>
              </div>
              {/* <button className="mt-3 mb-3"> Load more</button> */}
            </div>

            <div className="col-6 col-md-6 col-lg-4 ">
              <div className="d_featured_events_box">
                <figure className="mb-0">
                  <img
                    src={process.env.PUBLIC_URL + "/images/tshirt2.jpg"}
                    alt=""
                  />
                </figure>
                <div className="d_feat_event_cnt poppins">
                  <ul
                    className="d_feat_event_list"
                    style={{ marginTop: "30px" }}
                  >
                    <li>
                      <strong>T-shirt </strong>
                    </li>
                    <li> Mens casual comfort</li>
                    <li>
                     
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                          width: "30px",
                          borderRadius: "5px",
                          backgroundColor: "#a2c760",
                          color: "white",
                        }}
                        onClick={handleShow2}
                      >
                        Size
                      </button>
                    </li>
                    <li>
                      <strong>Rs 2000/- </strong>
                    </li>
                  </ul>
                </div>
                <div className="d_feat_event_btn">
                  <a className="d_reminder">Remind Me Later </a>
                  <button type="button" className="d_book_event poppins">
                    Buy Now
                  </button>
                  <a
                    className="bell text-center"
                    style={{
                      color: "white",
                      width: "35px",
                      height: "25px",
                      padding: "2% 2% 4% 2%",
                      backgroundColor: "#A2C760",
                      borderRadius: "5px",
                    }}
                  >
                    <ShoppingCartIcon style={{ height: "20px" }} />
                  </a>
                </div>
              </div>
              {/* <button className="mt-3 mb-3"> Load more</button> */}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* modal */}

      <Modal
        show={show2}
        onHide={handleClose2}
        size="lg"
        aria-labelledby="contained-modal-title-bottom"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <h4>One Beer Please T-shirt</h4>

          {/* <Button onClick={handleClose2} id="btn-modal-footer" style={{backgroundColor:"#a2c760" , width:"75px"}}>Add</Button> */}
          <br />
        </Modal.Header>
        <h5
          style={{
            marginBottom: "-10px",
            paddingTop: "17px",
            marginLeft: "2%",
          }}
        >
          A original craft beer T-shirt for hopheads. 100% cotton, high print
          quality, available in Black & White colours.
        </h5>
        <Modal.Header></Modal.Header>
        <Modal.Body>
          <div className="row" style={{ overflow: "scroll", height: "400px" }}>
            {/* <div className="col-md-3 col">
<div class="sidebar">
  <a class="active" href="#t-shirt_size">T-shirt Size</a>
  <a href="#T-shirt_Color">T-shirt Color</a>
  <a href="#T-shirt_Type">T-shirt Type</a>
  
</div>
</div> */}
            <div className="col ">
              <p className="d_main_title d_box">T-shirt size</p>
              <h6>you can choose any one option </h6>
              {/* <span className="T-size"></span> */}
              <div className="row">
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Small(s)</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Medium(m)</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Large(l)</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">XL</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col-md-3 col">
                  <div class=" custom-control   ">
                    <input type="checkbox" />
                    <label class="custom-control-label">XXL</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">XXXL</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3 col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">XS</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
              </div>
              <br />
              <p className="d_main_title d_box">T-shirt color</p>
              <h6>you can choose any one option </h6>
              <div className="row">
                <div className="col-md-3">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Black</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col-md-3">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">White</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
              </div>

              <br />
              <p className="d_main_title d_box">T-shirt type</p>
              <h6>you can choose any one option </h6>
              <div className="row">
                <div className="col">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Men</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div className="col mb-4">
                  <div class=" custom-control ">
                    <input type="checkbox" />
                    <label class="custom-control-label">Women</label>
                    <span class=" adonPrice">Rs 0.00</span>
                  </div>
                </div>
                <div style={{ borderBottom: "double" }}></div>
              </div>
            </div>
          </div>
        </Modal.Body>
        {/* <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>Close</Button>
  </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default Merchandise;
