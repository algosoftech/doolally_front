import React, { useEffect, useState,useContext } from "react";
import "../style_web/styleDoolally.css";
import Review from "../Sliders/Review";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import { format, isValid } from "date-fns";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
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

const Food = () => {

  const {foodCategory, foodItem,onAdd} =useContext(FnbContext);
  console.log(foodCategory)
  console.log(foodItem)
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

    // paggination
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const foodItems = foodItem.slice(indexOfFirstItem, indexOfLastItem);
  
    const totalPages = Math.ceil(foodItem.length / itemsPerPage);
  
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
                      <div className="adj-location" id="circle-effect">
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
                <div
                  className="d_food box_padding gray_bg_color"
                  style={{ minHeight: "86vh" }}
                >
                  <div className="h-food-menu d-flex justify-content-between">
                    <div>
                      <p className=" d_main_title pd-2 ">
                        <h4>Menu</h4>{" "}
                        <h6 className="d_main_sub_title">Breakfast </h6>{" "}
                      </p>
                    </div>

                    <div className="poppins d-flex  ">
                      <label class="switch mt-2 ">
                        <input
                          type="checkbox"
                          style={{ paddingLeft: "-10px" }}
                        />
                        <span class="slider round"></span>
                      </label>
                      <span className="mt-1" style={{ paddingLeft: "3px" }}>
                        {" "}
                        Veg
                      </span>
                      <div className=" ms-2 d-flex" id="n-veg">
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
                            Bestsellers{" "}
                          </p>
                        </li>
                      </ul>
                      <p style={{ fontSize: "14px", color: "grey" }}>
                        In Breakfast
                      </p>
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
                        Eggs fried ,Chicken sausag <br /> Bacon, Baked beans,
                        Toast
                      </p>
                    </div>

                    <div>
                      <img
                        src={process.env.PUBLIC_URL + "/images/food3.jpg"}
                        style={{
                          width: "120px",
                          height: "135px",
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
                          marginLeft: "10%",
                          color: "#759246",
                          borderRadius: "5px",
                        }}
                      >
                        <strong>Add</strong>
                      </button>
                    </div>
                  </div>
{foodItems.map((item,index)=>(


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
                            Bestsellers{" "}
                          </p>
                        </li>
                      </ul>
                      <p style={{ fontSize: "14px", color: "grey" }}>
                        In {item.item_categoryid==="69914"?"Breakfast" :(item.item_categoryid==="69915"?"Starters": item.item_categoryid==="69916"?"Salads":item.item_categoryid==="69916"?"Main Course":"Desserts")}
                      </p>
                      <p
                        style={{
                          fontWeight: "600",
                          lineHeight: "0px",
                          marginTop: "-5px",
                        }}
                      >
                       {item.itemname}
                      </p>
                      <img
                        src={process.env.PUBLIC_URL + "/images/icons/star.jpg"}
                        style={{ width: "70px", marginTop: "-8px" }}
                      />
                      <br />
                      <strong style={{ marginTop: "-20px" }}>₹ {item.price}</strong>
                      <p style={{ fontSize: "14px", color: "grey" }}>
                       {item.itemdescription}
                      </p>
                    </div>

                    <div>
                      <img
                        src={process.env.PUBLIC_URL + "/images/food5.png"}
                        style={{
                          width: "120px",
                          height: "135px",
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
                          marginLeft: "10%",
                          color: "#759246",
                          borderRadius: "5px",
                        }}
                      >
                        <strong onClick={()=>onAdd(item,index)}>Add</strong>
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
              <div className="col-lg-3">
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h5 className="d_main_title">Categories</h5>
                    {/* <p className="d_main_sub_title">Day Plan 
<span className="d_line"></span>
<span className="d_round"></span>
<span className="d_round"></span>
<span className="d_round"></span>
</p> */}
                  </div>

                  <ul className="catgry-beer">
                    {/* <li className="d-flex">
                      <img
                        src={process.env.PUBLIC_URL + "/images/starter.jpg"}
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Starters
                    </li> */}
                    {foodCategory.map((item, index)=>(
                      <li>{item.categoryname}</li>
                    )

                    )}
                    
                    {/* <li>
                      <img
                        src={process.env.PUBLIC_URL + "/images/piza.jpg"}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Pizza
                    </li>
                    <li>
                      <img
                        src={process.env.PUBLIC_URL + "/images/burger.jpg"}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Burgers
                    </li>
                    <li>
                      <img
                        src={process.env.PUBLIC_URL + "/images/desert.jpg"}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginLeft: "-24px",
                          padding: "2%",
                        }}
                      />
                      Deserts
                    </li> */}
                  </ul>
                </div>
                <div className=" d_main_panel_review mt-3">
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
    </>
  );
};
export default Food;
