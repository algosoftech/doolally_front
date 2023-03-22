import React, { useState,useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  getUserCurrLoc,
  getUser,
  getToken,
  removeUserSession,
} from "../utils/UserAuthenticate";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FnbContext from "../contextApi/FnbContext";

const Header = (props) => {
  const user = getUser();
  const { onAdd, cartItems, qty1,beveragesItem } = useContext(FnbContext);
  console.log(cartItems);

  const logout = () => {
    removeUserSession();
    window.location = "/";
  };
  const [showForCart, setShowForCart] = useState(false);
  const handleCloseForCart = () => setShowForCart(false);
  const handleShowForCart = () => setShowForCart(true);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  //define functions here

  ////////////////////////////////////////////////
  const handleChange = (item, d) => {
    const ind = cartItems.indexOf(item);
    const arr = cartItems;
    arr[ind].qty += d;
    if (arr[ind].qty == '0') arr[ind].qty = 1;
    else 
    arr[ind].price = arr[ind].qty * beveragesItem[ind].price;
    setCart([...arr]);
    subTotalfunction()
  };
  ////////////////////////////////////////////////////


 const subTotalfunction = () => {
  let total_Amount=cartItems.reduce((item, index) => {

let {price}=index;
item= item + parseFloat(price);
return item;
    },0);
setSubTotal(total_Amount)
  };
///////////////////////////////////////////////////////
//Remove item from cart
const removeItem = (item) => {
  const ind = cartItems.indexOf(item);
  const arr = cartItems;
  arr.splice(ind, 1);
  setCart([...arr]);

  // Remove item from localStorage as well
  const cartItemsInLocalStorage = JSON.parse(localStorage.getItem('cartItems'));
  const updatedCartItems = cartItemsInLocalStorage.filter((cartItem) => cartItem.id !== item.id);
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
}

  return (
    <>
      {/* social icon section */}

      <div className="sticky-header">
        <header className="row h-main">
          <div className="col h-left " style={{ marginLeft: "2%" }}>
            <a
              href="https://www.facebook.com/godoolallyandheri/"
              target="_blank"
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/icons/new icons/facebook.png"
                }
                alt="logo"
              />{" "}
            </a>
            <a
              href="https://www.instagram.com/explore/locations/1020175853/doolally-taproom-andheri/?utm_source=ig_embed&ig_rid=22fa0ed7-ae2a-4ed4-8c28-3eeab867e6ea&hl=en"
              target="_blank"
            >
              <img
                src={
                  process.env.PUBLIC_URL +
                  "/images/icons/new icons/instagram.png"
                }
                alt="logo"
              />
            </a>
            <a href="https://mobile.twitter.com/godoolally/" target="_blank">
              <img
                src={
                  process.env.PUBLIC_URL + "/images/icons/new icons/twitter.png"
                }
                alt="logo"
              />{" "}
            </a>
            <img
              src={
                process.env.PUBLIC_URL + "/images/icons/new icons/whatsapp.png"
              }
              alt="logo"
            />
          </div>

          {/* doolally logo */}
          <div className="col-6 h-center">
            <Link to="/">
              <img
                src={process.env.PUBLIC_URL + "/images/splashLogo.png"}
                alt="logo"
                style={{ width: "90px" }}
              />
            </Link>
          </div>

          <div
            className="col-3 h-right"
            id="dirty_hedline_font"
            style={{ marginRight: "2%" }}
          >
            <img
              src={
                process.env.PUBLIC_URL +
                "/images/icons/new icons/phone-call.png"
              }
              alt="logo"
            />{" "}
            022-48931314
          </div>
        </header>

        <div className="row s-main">
          {/* <div className="col-3 d_main_title pt-2" style={{cursor:"pointer" ,fontWeight:"600"}}><a href="https://startling-cactus-d5a5b7.netlify.app/" > Order Online</a></div> */}

          <div className="col-2"></div>
          <div className="col-6" style={{ marginRight: "-8.4%", width: "49%" }}>
            <div class="search-container">
              <form action="/action_page.php">
                <input
                  type="text"
                  placeholder="Discover workshops, attend a meet up, play a board game"
                  name="search"
                />
                <button type="submit">
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          {/* <div className="col d_main_title pt-2 " style={{cursor:"pointer" }}><Link to="/event-categories">Events</Link></div> */}

          <div
            className="col-2 header_navbar"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            {/* {user ? (
<Link to="/my-events"><img src={process.env.PUBLIC_URL + "/images/icons/new icons/user_icon.png"}  style={{width:"20px"}}/></Link>
<Dropdown align="end">
<Dropdown.Toggle variant="ffdsfdsfd" id="dropdown-basic">
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/user_icon.png"} style={{width:"20px",margin: "0px 10px"}}/>
</Dropdown.Toggle>
<Dropdown.Menu>
    <Dropdown.Item href="/my-events">Hosting</Dropdown.Item>
    <Dropdown.Item href="/my-acount">Account Details</Dropdown.Item>
    <Dropdown.Item href="/my-attending">Attending</Dropdown.Item>
    <Dropdown.Item onClickCapture={logout}>Logout</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
) : (
<Link to="/login"><img src={process.env.PUBLIC_URL + "/images/icons/new icons/user_icon.png"} style={{width:"20px",margin:"11px"}}/></Link>
<Dropdown align="end" >
<Dropdown.Toggle variant="ffdsfdsfd" id="dropdown-basic" style={{border:"none", outline:"none"}}>
    <img src={process.env.PUBLIC_URL + "/images/icons/new icons/user_icon.png"} style={{width:"20px",margin: "0px 10px"}}/>
</Dropdown.Toggle>
<Dropdown.Menu>
    <Dropdown.Item href="/login">Login</Dropdown.Item>
    <Dropdown.Item href="/signUp">Sign Up</Dropdown.Item>
</Dropdown.Menu>
</Dropdown>
)} */}
          </div>
          <div className="col-1">
            {/* {props.homepage ? (
              ""
            ) : ( */}
              <div onClick={()=>{handleShowForCart()
                 subTotalfunction()}}>
                <img
                  src={
                    process.env.PUBLIC_URL +
                    "/images/icons/new icons/shopping-cart.png"
                  }
                  style={{ width: "20px", margin: "11px", marginLeft: "50px" }}
                  onClick={handleShowForCart}
                />
                <span id="cart-qty-indicate">
                  {" "}
                  {cartItems
                    ? cartItems.length === 0
                      ? ""
                      : cartItems.length
                    : ""}{" "}
                </span>
                {/* <span id="cart-qty-indicate">{cartItems.length}</span> */}
              </div>
            {/* )} */}
          </div>
        </div>
      </div>
      {cartItems ? (
        <Modal
          show={showForCart}
          onHide={handleCloseForCart}
          dialogClassName="modal-90w-cart"
        >
          <Modal.Header closeButton style={{ backgroundColor: "#a2c760" }}>
            <h4>Your order summary</h4>
          </Modal.Header>

          <Modal.Body>
            {cartItems.map((item, index) => (
              <div
                className="d-flex justify-content-between"
                style={{
                  border: "1px solid #d4d4d4",
                  borderRadius: "5px",
                  boxShadow: "2px 5px 5px 5px #f5f5f5",
                  marginBottom: "2%",
                }}
              >
                <img
                  src={process.env.PUBLIC_URL + "/images/pro7.png"}
                  style={{ width: "60px" }}
                />

                <div>
                  <strong style={{ marginTop: "-40px" }}>
                    {item.itemname}
                  </strong>
                  <span
                    className="wrapperr"
                    style={{ minWidth: "120px", height: "30px" }}
                  >
                    <span className="minus">
                      <ArrowDropDownIcon
                        onClick={() => handleChange(item, -1)}
                      />
                    </span>
                    <span className="num">{item.qty}</span>
                    <span className="plus">
                      <ArrowDropUpIcon onClick={() => handleChange(item, 1)} />
                    </span>
                  </span>
                </div>
                <div style={{ margin: "20px" }}>
                  <strong>Rs {item.price}</strong>
                </div>
                <DeleteOutlinedIcon onClick={()=>{removeItem(item)}}/>
              </div>
            ))}
            {/* <div style={{ height: "100%" }}>
              <img
                src={process.env.PUBLIC_URL + "/images/white.png"}
                style={{ height: "100px", marginLeft: "70px" }}
              />
            </div> */}
            <br />
            {/* <h5>Plates look best with food on it. Go, grab 'em all</h5> */}
            <br />
            <textarea
              rows={2}
              cols={50}
              placeholder="Enter any additional information about your order"
              style={{
                border: "none",
                outline: "none",
                backgroundColor: "#fbffec",
              }}
            ></textarea>
            <p
              className="text-center "
              style={{
                backgroundColor: "#f1f1f1",
                fontWeight: "900",
                height: "60px",
                paddingTop: "20px",
                fontSize: "20px",
              }}
            >
              {" "}
              Add more item
            </p>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
          <div className="d-flex justify-content-between ">
            <div className="col-6 poppins hglight-title m-2 ">
              {" "}
              Sub total <strong>Rs {subTotal}</strong> <br />
              <p> (Extra charges may apply) </p>
            </div>
            <Link to="/cart">
            <button
              className="col-5"
              style={{
                height: "60px",
                backgroundColor: "#a2c760",
                outline: "none",
                border: "none",
                borderRadius: "5px",
                width:"100px",
                marginRight:"2%",
              }}
              // onClick={handleShowForm}
            >
             Checkout
             
            </button>
            </Link>
          </div>
        </Modal>
      ) : (
        " "
      )}
    </>
  );
};

export default Header;
