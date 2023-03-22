import React, { useEffect, useState, useContext } from "react";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import { TextField } from "@material-ui/core";
import FnbContext from "../contextApi/FnbContext";
import { CartValidator } from "../components/validators/CartValidator";

const Cart = () => {
  const { onAdd, cartItems, qty1 } = useContext(FnbContext);

  const initialValues={username:"", email:"", phone:"" , address:"" , deliveryType:"" , paymentMode:""}
  const [formValues, setFormValues]= useState(initialValues);
const [formErrors, setFormErrors]=useState({})

const handleChange=(e)=>{
const {name, value }=e.target;
if(name=="username"){
setFormValues({...formValues, [name]:value});
}
if(name=="phone"){
  setFormValues({...formValues, [name]:value});
  }
  if(name=="email"){
    setFormValues({...formValues, [name]:value});
    }
    if(name=="address"){
      setFormValues({...formValues, [name]:value});
      }
      if(value=="102"){
        setFormValues({...formValues, [name]:"Home Delivery"});
       
        }
        if(value=="104"){
          setFormValues({...formValues, [name]:"Office Delivery"});
       
          }
          if(value=="1"){
            setFormValues({...formValues, [name]:"Cash on delivery"});
         
            }
            if(value=="2"){
              setFormValues({...formValues, [name]:"Online payment"});
           
              }
}


const handleSubmit=(e)=>{
  e.preventDefault();
  setFormErrors(validate(formValues))
  
}
console.log(formErrors)

const validate=(values)=>{
  const errors={};
// const regex=
if(!values.username){
  errors.username="Your name is required.";
}
else if (!values.username.length > 4) {
  errors.username="Your name must have a minimum 4 characters.";
}
if(!values.phone){
  errors.phone="Your phone no. is requuired.";
}
else if (!new RegExp(/^[0-9\b]+$/).test(values.phone)) {
  errors.phone="Please enter only number.";
}
if(!values.email){
  errors.email="Please enter your email address.";
} else if (!new RegExp(/\S+@\S+\.\S+/).test(values.email)) {
  errors.email="Incorrect email format!";
}
if(!values.address){
  errors.address="Please enter your address.";
}

return errors

}
  const show_hide_login = () => {
    if (document.getElementById("sinup_cart").style.display == "inline") {
      document.getElementById("sinup_cart").style.display = "none";
      document.getElementById("login-cart").style.display = "inline";
    } else document.getElementById("login-cart").style.display = "inline";
  };
  const show_hide_signup = () => {
    if (document.getElementById("login-cart").style.display == "inline") {
      document.getElementById("login-cart").style.display = "none";
      document.getElementById("sinup_cart").style.display = "inline";
    } else document.getElementById("sinup_cart").style.display = "inline";
  };
console.log(formValues)
  return (
    <>
      <div className="container-fluid">
        <Header />
        <div className="row ">
          <div className="col-8">
            <div className="col-9 mt-4 l-cart-pg">
              <div className=" bg-white box_padding ">
                <p className="d_main_title poppins bglight">
                  {" "}
                  User information
                </p>
                <p className="poppins" style={{ color: "#7e808c" }}>
                  {" "}
                  {/* To place your order now, log in to your existing account or
                  sign up. */}
                </p>
                <div className="cart-log-sign ">
                  <div id="sinup_cart">
                    <div className="row gy-1 " style={{ margin: "0px auto" }}>
                      {/* Name */}
                      <span style={{width:"50%"}}>
                     <input className="col-5" type="text" placeholder="Name" name="username"onChange={handleChange} /> <br/>
                        <p style={{color:"red"}}>{formErrors.username}</p>
                     </span>
                  
                      {/* Phone no. */}
                      <span style={{width:"50%"}}>
                      <input
                        className="col-5"
                        type="text"
                        placeholder="Phone no"
                        name="phone"
                        onChange={handleChange}
                      />
                      <p style={{color:"red"}}>{formErrors.phone}</p>
                      </span>
                   
                      <span style={{width:"50%"}}>
                      <input
                        className="col-5"
                        type="text"
                        name="email"
                        placeholder="Email id"
                        onChange={handleChange}
                      />
                          <p style={{color:"red"}}>{formErrors.email}</p>

                                </span>
                      {/* <label className="col" style={{ marginLeft: "3px" }}>
                        Password
                        <input type="text" />
                      </label> */}
                    </div>
                    {/* <div
                      className=" col-3 d_comn_btn d-block"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      style={{ width: "40%", margin: "0px auto" }}
                    >
                      Login
                    </div> */}
                  </div>
                  <div>
                    <div id="login-cart" style={{ display: "none" }}>
                      <div className="text-center">
                        <label className="mb-4">
                          Phone no.
                          <input type="number" style={{ margin: "2%" }} />
                        </label>
                        {/* <button
                          className="d_comn_btn d-block"
                          style={{ margin: "0px auto", width: "30%" }}
                        >
                          Login
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-9 mt-4 l-cart-pg bg-white">
              <p className="d_main_title poppins bglight box_padding">
                Delivery address
              </p>
              <div
                className="row cart-log-sign pb-3 "
                style={{ marginLeft: "35px" }}
              >
                <label className=" col-3  d_custome_raido">
         
                  <span className="d_paid monster">Home</span>
                  <input
                    type="radio"
               
               name="deliveryType"
               value="102"
                  id="deliveryHOme"
                  onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="col-3 d_custome_raido" >
         
                  <span className="d_paid monster">Office</span>
                  <input
                    type="radio"
                 onChange={handleChange}
               name="deliveryType"
                  id="deliveryOffice"
                  value="104"
                  />
                  <span className="checkmark"></span>
                </label>{" "}
              </div>
              <div className="row cart-log-sign pb-2  ">
                <label>
                  <input
                    className="col-10"
                    type="text"
                    placeholder="Address"
                    name="address"
                    style={{ marginTop: "-20px" }}
                    onChange={handleChange}
                  />
                 <p style={{color:"red"}}>{formErrors.address}</p> 
                </label>
              </div>
            </div>

            <div className="col-9 mt-4 l-cart-pg bg-white">
              <p className="d_main_title poppins bglight box_padding">
                {" "}
                Offers
              </p>
              <div className="delivery-address container-fluid pb-1 ">
                {/* <label>Address</label> */}

                <div
                  class="input-group mb-3"
                  style={{ width: "350px", marginLeft: "35px" }}
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter promo code"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2">
                      Redeem
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9 mt-4 l-cart-pg bg-white ">
              <p className="d_main_title poppins bglight box_padding">
                {" "}
                Payment
              </p>

              <div className="col " style={{ padding: "0 2%" }}>
                <label className="d_custome_raido" >
           
                  <span className="d_paid monster">Cash on delivery</span>
                  <input
                    type="radio"
                    name="costType"
                    id="costType1"
                    value="1"
        onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="col pb-4 " style={{ padding: "0 2%" }}>
                <label className="d_custome_raido" >
      
                  <span className="d_paid monster">
                    Credit Card/Debit Card/Netbanking (Razorpay)
                  </span>
                  <input
                    type="radio"
                    name="costType"
                    id="costType2"
                    value="2"
          onChange={handleChange}
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
            <div className="col-9 mt-4 l-cart-pg mb-4">
              <div
                className=" col-3 d_comn_btn d-block"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                style={{ margin: "0px auto" }}
                onClick={handleSubmit}
              >
                Proceed to checkout
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="bg-white mt-4 box_padding cart-pg">
              <div className=" d_order_borderbtm">
                {cartItems.map((item, index) => (
                  <div className="row gy-0">
                    <div className="col-12 col-md ">
                      <ul className="d_order_list_name mb-0">
                        <li>
                          <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                            <em></em>
                          </span>
                        </li>
                        <li>
                          <p className="poppins">{item.itemname}</p>
                        </li>
                      </ul>
                    </div>

                    <div className="col-3 col-md-3">
                      <div className="g-add" id="d_btndiv9">
                        <form className="d-flex align-items-center ">
                          <div className="form" style={{ marginTop: "-6px" }}>
                            <div
                              className="value-button"
                              id="decrease"
                              onclick="decreaseValue()"
                              value="Decrease Value"
                            >
                              -
                            </div>
                            <input
                              type="text"
                              className="number"
                              id="number"
                              value="1"
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
                    <div className="col-2 gx-0">
                      <span>₹{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className=" d_order_borderbtm">
                <div className="row gy-0">
                  <div className="col col-md ">
                    <ul className="d_order_list_name mb-0">
                      <li>
                        <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                          <em></em>
                        </span>
                      </li>
                      <li>
                        <p className="poppins">Smoke Large [1 litre] </p>
                      </li>
                    </ul>
                  </div>

                  <div className="col-3 col-md-3">
                    <div className="g-add" id="d_btndiv9">
                      <form className="d-flex align-items-center ">
                        <div className="form" style={{ marginTop: "-6px" }}>
                          <div
                            className="value-button"
                            id="decrease"
                            onclick="decreaseValue()"
                            value="Decrease Value"
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="number"
                            id="number"
                            value="1"
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
                  <div className="col-2 gx-0">
                    <span>₹500.00</span>
                  </div>
                </div>
              </div>
              <div className=" d_order_borderbtm">
                <div className="row ">
                  <div className="col col-md ">
                    <ul className="d_order_list_name mb-0">
                      <li>
                        <span className="vage_curcul nonvag d-flex align-items-center justify-content-center position-relative">
                          <em></em>
                        </span>
                      </li>
                      <li>
                        <p className="poppins">Smoke Large [1 litre] </p>
                      </li>
                    </ul>
                  </div>

                  <div className="col-3 col-md-3">
                    <div className="g-add" id="d_btndiv9">
                      <form className="d-flex align-items-center ">
                        <div className="form" style={{ marginTop: "-6px" }}>
                          <div
                            className="value-button"
                            id="decrease"
                            onclick="decreaseValue()"
                            value="Decrease Value"
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="number"
                            id="number"
                            value="1"
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
                  <div className="col-2 gx-0">
                    <span>₹500.00</span>
                  </div>
                </div>
              </div>

              <div className="box_padding d_order_border_btm">
                <ul className="d_order_list_name mb-0 d-flex">
                  <li>
                    <img
                      src={process.env.PUBLIC_URL + "/images/icons/file.svg"}
                      alt=""
                    />
                  </li>
                  <li>
                    <p
                      className="monster p_gray"
                      style={{ backgroundColor: "#f9f9f9" }}
                    >
                      <input
                        type="text"
                        placeholder="Write any additional information about your order"
                        style={{ border: "none", outline: "none" }}
                      />{" "}
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bill_details mt-2 d_order_border_btm">
                <h6 className=" poppins">Bill details</h6>
                <div className="row">
                  <div className="col-8">
                    <p className="poppins"> Sub total</p>
                  </div>
                  <div className="col">₹1500.00</div>
                </div>

                <div className="row gy-0">
                  <div className="col-9">Delivery</div>
                  <div className="col"> Free</div>
                </div>
                <div className="row gy-0">
                  <div className="col-9">Item discount</div>
                  <div className="col"> Free</div>
                </div>
                <div className="row gy-0">
                  <div className="col-9">Taxes and charges</div>
                  <div className="col"> Free</div>
                </div>
              </div>
            </div>
            <div className="col-3" style={{ margin: "0px auto" }}>
              <button className="col-12 d_comn_btn">To pay</button>
            </div>
          </div>
        </div>


        <Footer />
      </div>
    </>
  );
};

export default Cart;
