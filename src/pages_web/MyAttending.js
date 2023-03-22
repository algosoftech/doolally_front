import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Modal from "react-bootstrap/Modal";
import ModalUI from "@mui/material/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { RWebShare } from "react-web-share";
import MailOutlineTwoToneIcon from "@mui/icons-material/MailOutlineTwoTone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CallIcon from "@mui/icons-material/Call";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import clsx from "clsx";
import styles from "../components/validators/createvent/BookEventForm.module.css";
import TextField from "@mui/material/TextField";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { useBookEventFormValidator } from "../components/validators/createvent/useBookEventFormValidator";
import InfoIcon from '@mui/icons-material/Info';

import {
  getRequestOptions,
  apiBaseUrl,
  userEventDetailsApiUrl,
  eventImageBaseUrl,
  EVENT,
  userFrom,
  postRequestOptions,
  eventBookRegistrationrApiUrl,
  multipartRequestOptions,
  razorpayKey,
  eventRazorpayResponseApiUrl,
  NEW_DOOLALLY_FEE,
  userAttendingApiUrl,
  communityManagerNumber,
  userSendEventCanelRequestApiUrl,
  sendContactMailToOrganiser,
  getRegList,
  eventBookCouponVerifyApiUrl,
} from "../config/constant";
import {
  setUserCurrLoc,
  getUserCurrLoc,
  getUser,
  setUserSession,
  getToken,
} from "../utils/UserAuthenticate";
import {
  isEventFinished,
  isEventStarted,
  isEventApproved,
  numberWithCommas,
  showCorrectImage,
  isDisableCancelButton,
} from "../utils/Common";
import { id } from "date-fns/locale";
import { ListItemSecondaryAction } from "@material-ui/core";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const userData = getUser();

const MyEvents = () => {


// for booking info history 
const [showForHistoryInfo,setShowForHistoryInfo]=useState(false);
const handleClose5=() => {setShowForHistoryInfo(false)}
const [historyData,setHistoryData]=useState([]);

console.log(historyData,"seustat")
//end booking history infp history


  const [eventsData, setEventsData] = useState([]);
  const [comEventsData, setComEventsData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [eventsList, setEventsList] = useState([]);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [organiserContactNo, setOrganiserContactNo] = useState();
  const [show, setShow] = useState(false);
  const handleClose1 = () => {setcancelQty(0);setShow(false)};
  const [openMail, setOpenMail] = React.useState(false);
  const handleOpenMail = () => setOpenMail(true);
  const handleCloseMail = () => setOpenMail(false);
  const [avaQty, setAvaQty] = useState("");
  const [cancelQty, setcancelQty] = useState(0);
  const[result,setResult]=useState("");
  if (!getUser()) {
    window.location = "/login/attending";
  }

  //event cancel
  const [handleCancelShowData, setHandleCancelShowData] = useState({
    userid: userData.userId,
    eventId: "",
    quantity: "",
  });
  const handleShow = (event, item) => {
    let eventIds = item.eventId;
    let avqty= item.quantity - item.canceledQuantity
    setAvaQty(avqty);
    getReglistById(eventIds);
  }; // END

   //organiser details
   const[EvntId,setEvntId]=useState()

 console.log(EvntId)
  const [EVENTID, setEVENTID] = useState();

  const [sendEmailData, setSendEmailData] = useState({
    name: userData.firstName + " " + userData.lastName,
    mobile: userData.mobNum,
    eventId: EvntId,
    orgEmail: userData.emailId,
    message: "",
  });

console.log(EVENTID)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setSendEmailData((old) => ({
      ...old,
      eventId: EVENTID,
    }));
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendEmail = async () => {
    try {
      setIsSubmitButtonLoading(true);
      let result = await axios.post(
        apiBaseUrl + sendContactMailToOrganiser,
        sendEmailData
      );

      if (result) {
        result = result.data; 
         setResult(result.statusMessage);
        setOpenMail(false);
        setShowCacelTicket2(true);
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  };

  // console.log(eventsData[0].eventDate
   

  const eventCancelRequest = async (e) => {
    handleCloseCancelTicket();
    try {
      const user = getUser();
      //here Api call for Home page
      let cenResult = await fetch(
        apiBaseUrl +
          userSendEventCanelRequestApiUrl +
          "?evtid=" +
          EVENTID +
          "&userid=" +
          user.userId +
          "&qty=" +
          cancelQty,
        getRequestOptions
      );
      if (cenResult) {
        cenResult = await cenResult.json();
        if (cenResult.responseCode == 400) {
          setResult(cenResult.statusMessage); 
          setShowCacelTicket(false)
          setShowCacelTicket2(true);
          // setIsSubmitButtonLoading(false);

     
        } else {
        setResult(cenResult.statusMessage);
        setShowCacelTicket(false)
        setShowCacelTicket2(true);
          // window.location = "/attending";
        }
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  };

  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage";
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    if (!getUser()) {
      window.location = "/login/attending";
    }
    getData();
     const dt= new Date()
    console.log(dt);

  }, []);
  //Get Registration List

  const getHistoryData=async(item)=>{
    let eventId = item.eventId;
    let avqty= item.quantity - item.canceledQuantity
    // setAvaQty(avqty);
    try {
    
      let result = await axios.get(
        apiBaseUrl +
          getRegList +
          "?&userId=" +
          handleCancelShowData.userid +
          "&eventId=" +
          eventId
      );
      if (result) {
        console.log(handleCancelShowData.userid, eventId);
        console.log(result.data.response.result.eventRegDataList,"rashid")
        setHistoryData(result.data.response.result.eventRegDataList)
        result = result.data;
        if (result.response.result.eventRegDataList.length > 0) {
          setEventsRegData(result.response.result.eventRegDataList);
        } else {
          setErrorMsg("No event found.");
        }
    
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  }



  const getReglistById = async (eventId) => {
    try {
      setShow(true);
      setIsloading(true);
      //const user = getUser();
      // here Api call for Home page
      let result = await axios.get(
        apiBaseUrl +
          getRegList +
          "?&userId=" +
          handleCancelShowData.userid +
          "&eventId=" +
          eventId
      );
      if (result) {
        console.log(handleCancelShowData.userid, eventId);
        result = result.data;
        if (result.response.result.eventRegDataList.length > 0) {
          setEventsRegData(result.response.result.eventRegDataList);
        } else {
          setErrorMsg("No event found.");
        }
        // setTimeout(() => {
        //   setIsloading(false);
        // }, 500);
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
    // setShow(false);
  };
  //END

  const getData = async () => {


    try {
      setIsloading(true);
      const user = getUser();
      // here Api call for Home page
      let result = await axios.get(
        apiBaseUrl + userAttendingApiUrl + "?userId=" + user.userId
      );
      if (result) {
        result = result.data;
        if (result.response.result.eventData.length > 0) {
          setEventsData(result.response.result.eventData);
        } else {
          setErrorMsg("No event found.");
        }
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  };

  const [registrationEventId, setRegistrationEventId] = useState("");
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false);
  const [registrationEventPrice, setRegistrationEventPrice] = useState(0);
  const [errorMsgRegistration, setErrorMsgRegistration] = useState("");
  const [registrationQuantity, setRegistrationQuantity] = useState(0);
  const [regTotalBookingAmount, setRegTotalBookingAmount] = useState(0);
  const [regShowHaveCouponDiv, setRegregShowHaveCouponDiv] = useState(false);
  const [eventsRegData, setEventsRegData] = useState([]);

  const [
    errorMsgRegistrationCouponVallidate,
    setErrorMsgRegistrationCouponVallidate,
  ] = useState("");
  const [regShowCouponDiv, setRegShowCouponDiv] = useState(false);
  const [regShowCouponAppliedDiv, setRegShowCouponAppliedDiv] = useState(false);
  const [regAppliedCoupon, setRegAppliedCoupon] = useState("");
  const [
    isRegistrationrSubmitButtonLoading,
    setIsRegistrationrSubmitButtonLoading,
  ] = useState(false);
  const [isRegCouponVerifyButtonLoading, setIsRegCouponVerifyButtonLoading] =
    useState(false);

  const [showRegistrationPop, setShowRegistrationPop] = useState(false);
  const handleCloseRegistrationPop = () => {
    setRegistrationEventId("");
    setShowRegistrationPop(false);
  };

  //cancel confirmation booking modal 

  const [showCancelTicket,setShowCacelTicket]=useState(false);
  const [showCancelTicket2,setShowCacelTicket2]=useState(false);
  const handleCloseCancelTicket=()=>{
    setShowCacelTicket(false);
  }
  const handleCloseCancelTicket2=()=>{
    setShowCacelTicket2(false);
    window.location = "/attending";
  }
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  const [regForm, setRegForm] = useState({
    user_name: "",
    user_email: "",
    user_mobile: "",
    user_quantity: 0,
    is_coupon_used: 0,
    coupon_text: "",
    coupon_id: 0,
    coupon_amount: 0,
    coupon_type: "",
    sub_variation_id: 0,
  });

  const {
    errorsRegistration,
    validateRegistrationForm,
    onBlurRegistrationrField,
  } = useBookEventFormValidator(regForm);


  const onUpdateCpuponField = (e) => {
    let currValue = 0;
    if (e.target.checked) {
      setRegShowCouponDiv(true);
      currValue = 1;
    } else {
      setRegShowCouponDiv(false);
      currValue = 0;
    }
    const field = "is_coupon_used";
    const nextFormState = { ...regForm, [field]: currValue };
    const field1 = "coupon_text";
    const nextFormState1 = { ...nextFormState, [field1]: "" };
    const field2 = "coupon_id";
    const nextFormState2 = { ...nextFormState1, [field2]: 0 };
    const field3 = "coupon_amount";
    const nextFormState3 = { ...nextFormState2, [field3]: 0 };
    const field4 = "coupon_type";
    const nextFormState4 = { ...nextFormState3, [field4]: "" };
    setRegForm(nextFormState4);
    setRegShowCouponAppliedDiv(false);
  };

  const onUpdateRegistrationrField = (e) => {
    const field = e.target.name;
    let fieldValue = e.target.value;
    const nextFormState = { ...regForm, [field]: fieldValue };
    setRegForm(nextFormState);
    if (field != "coupon_text") {
      if (errorsRegistration[field].dirty)
        validateRegistrationForm({
          regForm: nextFormState,
          errorsRegistration,
          field,
        });
    }
  };

  const verifyRegBookingCoupon = async (e) => {
    e.preventDefault();
    let formData = regForm;
    if (!formData.coupon_text) {
      setErrorMsgRegistrationCouponVallidate("Coupon is required!");
    } else {
      setErrorMsgRegistrationCouponVallidate("");
      const userCurrLoc = getUserCurrLoc();

      formData.userFrom = userFrom;
      formData.userIpAdress = userCurrLoc.IPv4;
      formData.eventId = registrationEventId;
      //console.log(formData);

      try {
        setIsRegistrationrSubmitButtonLoading(true);
        setIsRegCouponVerifyButtonLoading(true);
        // here Api call for Home page
        let result = await axios.post(
          apiBaseUrl + eventBookCouponVerifyApiUrl,
          formData,
          multipartRequestOptions
        );
        if (result) {
          result = result.data;
          //console.log(result);
          //console.log(result.response.result.couponData);
          if (result.statusCode === "success") {
            setRegregShowHaveCouponDiv(false);
            setRegShowCouponDiv(false);
            setErrorMsgRegistrationCouponVallidate("");
            setRegShowCouponAppliedDiv(true);
            setRegAppliedCoupon(
              result.response.result.couponData.coupon_code
                .toString()
                .toUpperCase()
            );
            let net_amt = registrationEventPrice * registrationQuantity;
            let final_amt = net_amt;
            let amt = result.response.result.couponData.coupon_amount;
            let discounted_amount = amt;
            if (result.response.result.couponData.coupon_type == "percentage") {
              discounted_amount = net_amt * (amt / 100);
            }
            final_amt = net_amt - discounted_amount;
            setRegTotalBookingAmount(final_amt);
            const field = "coupon_id";
            const nextFormState = {
              ...regForm,
              [field]: result.response.result.couponData.coupon_id,
            };
            const field1 = "coupon_amount";
            const nextFormState1 = {
              ...nextFormState,
              [field1]: result.response.result.couponData.coupon_amount,
            };
            const field2 = "coupon_type";
            const nextFormState2 = {
              ...nextFormState1,
              [field2]: result.response.result.couponData.coupon_type,
            };
            setRegForm(nextFormState2);
          } else {
            setErrorMsgRegistrationCouponVallidate(result.statusMessage);
            setRegAppliedCoupon("");
            setRegShowCouponAppliedDiv(false);
            const field = "coupon_id";
            const nextFormState = { ...regForm, [field]: 0 };
            const field1 = "coupon_amount";
            const nextFormState1 = { ...nextFormState, [field1]: 0 };
            const field2 = "coupon_type";
            const nextFormState2 = { ...nextFormState1, [field2]: "" };
            setRegForm(nextFormState2);
          }
          setIsRegistrationrSubmitButtonLoading(false);
          setIsRegCouponVerifyButtonLoading(false);
        }
      } catch (error) {
        setErrorMsgRegistrationCouponVallidate(
          "Failed to create payment link, Please try later!"
        );
      }
    }
  };

  const cancelRegAppliedCoupon = (e) => {
    setRegregShowHaveCouponDiv(true);
    setRegShowCouponDiv(false);
    setErrorMsgRegistrationCouponVallidate("");
    setRegShowCouponAppliedDiv(false);
    setRegAppliedCoupon("");
    let net_amt = registrationEventPrice * registrationQuantity;
    setRegTotalBookingAmount(net_amt);
    const field = "is_coupon_used";
    const nextFormState = { ...regForm, [field]: 0 };
    const field1 = "coupon_text";
    const nextFormState1 = { ...nextFormState, [field1]: "" };
    const field2 = "coupon_id";
    const nextFormState2 = { ...nextFormState1, [field2]: 0 };
    const field3 = "coupon_amount";
    const nextFormState3 = { ...nextFormState2, [field3]: 0 };
    const field4 = "coupon_type";
    const nextFormState4 = { ...nextFormState3, [field4]: 0 };
    setRegForm(nextFormState4);
  };


  const onSubmitRegistrationForm = async (e) => {
    e.preventDefault();
    const { isValid } = validateRegistrationForm({
      regForm,
      errorsRegistration,
      forceToucherrorsRegistration: true,
    });
    if (!isValid) return;
    const user = getUser();

    const userCurrLoc = getUserCurrLoc();

    setIsRegistrationrSubmitButtonLoading(true);
    let formData = regForm;
    formData.userFrom = userFrom;
    formData.userIpAdress = userCurrLoc.IPv4;
    formData.eventId = registrationEventId;

    try {
      let regresult = await axios.post(
        apiBaseUrl + eventBookRegistrationrApiUrl,
        formData,
        multipartRequestOptions
      );
      if (regresult) {
        //regresult      =   await regresult.json();
        regresult = regresult.data;

        if (regresult.statusCode === "success") {
          if (regresult.response.result.eventCostType == "paid") {
            let orderData = regresult.response.result.orderData;

            const res = await loadScript(
              "https://checkout.razorpay.com/v1/checkout.js"
            );
            if (!res) {
              //setErrorMsgRegistration('Razorpay SDK failed to load. Are you online?');
              setErrorMsgRegistration(
                "Failed to book event, Please try later!"
              );
              return;
            }

            //Open razorpay payment popup
            let logo = "/homepage/images/splashLogo.png";
            const options = {
              key: razorpayKey, // Enter the Key ID generated from the Dashboard
              amount: orderData.amount.toString(), // Order amount
              currency: orderData.currency, //currency,
              name: "Doolally",
              description: "Doolally Events",
              image: logo,
              order_id: orderData.id,
              handler: async function (response) {
                const payResData = {
                  orderCreationId: orderData.id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpayOrderId: response.razorpay_order_id,
                  razorpaySignature: response.razorpay_signature,
                  userFrom: formData.userFrom,
                  userIpAdress: formData.userIpAdress,
                  eventId: formData.eventId,
                  amount: orderData.amount,
                  currency: orderData.currency,
                  name: formData.user_name,
                  email: formData.user_email,
                  contact: formData.user_mobile,
                };

                setIsRegistrationrSubmitButtonLoading(true);
                // here Api call for success payment
                let result = await axios.post(
                  apiBaseUrl + eventRazorpayResponseApiUrl,
                  payResData,
                  postRequestOptions
                );
                if (result) {
                  result = result.data;

                  if (result.statusCode === "success") {
                    setUserSession(
                      result.response.result.userToken,
                      result.response.result.userData[0]
                    );
                    // alert(result.statusMessage);
                    setResult(result.statusMessage);
                    setShowRegistrationPop(false);
                    setShowCacelTicket2(true);


                    // window.location = "/attending";
                    setShowPaymentConfirmation(true);
                  } else {
                    setErrorMsgRegistration(result.statusMessage);
                  }
                  setIsRegistrationrSubmitButtonLoading(false);
                }
              },
              prefill: {
                name: formData.user_name,
                email: formData.user_email,
                contact: formData.user_mobile,
              },
              notes: {
                address: "Doolally Taproom",
              },
              theme: {
                color: "#6FAC2F",
              },
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          } else {
            setUserSession(
              regresult.response.result.userToken,
              regresult.response.result.userData[0]
            );
            setResult(regresult.statusMessage);
       
                    setShowRegistrationPop(false);
                    setShowCacelTicket2(true);


            // window.location = "/";
          }
        } else {
          setErrorMsgRegistration(regresult.statusMessage);
        }
        setIsRegistrationrSubmitButtonLoading(false);
      }
    } catch (e) {
      setIsRegistrationrSubmitButtonLoading(false);
      setResult("Entered quantity is out of limit");
      setShowRegistrationPop(false);
      setShowCacelTicket2(true);
      // window.location = "/attending";
    }
  };

  const incrementRegBookingCount = (e) => {
    console.log(e);
    let currQuantity = registrationQuantity + 1;
    setRegistrationQuantity(currQuantity);
    const field = "user_quantity";

    const nextFormState = { ...regForm, [field]: currQuantity };
    const field1 = "is_coupon_used";
    const nextFormState1 = { ...nextFormState, [field1]: 0 };
    const field2 = "coupon_text";
    const nextFormState2 = { ...nextFormState1, [field2]: "" };
    const field3 = "coupon_id";
    const nextFormState3 = { ...nextFormState2, [field3]: 0 };
    const field4 = "coupon_amount";
    const nextFormState4 = { ...nextFormState3, [field4]: 0 };
    const field5 = "coupon_type";
    const nextFormState5 = { ...nextFormState4, [field5]: "" };
    setRegForm(nextFormState5);
    if (errorsRegistration[field].dirty)
      validateRegistrationForm({
        regForm: nextFormState5,
        errorsRegistration,
        field,
      });
    setRegTotalBookingAmount(registrationEventPrice * currQuantity);
    setRegregShowHaveCouponDiv(true);
    setRegShowCouponDiv(false);
    setRegShowCouponAppliedDiv(false);
  };

  const decrementTicketBookCount = (e) => {
    let currQuantity = cancelQty - 1;
    if (currQuantity < 0) currQuantity = 0;
    setcancelQty(currQuantity);
  };

  const incrementTicketBookCount = (e) => {
    let currQuantity = cancelQty + 1;
    setcancelQty(currQuantity);
  };

  const decrementRegBookingCount = (e) => {
    let currQuantity = registrationQuantity - 1;
    if (currQuantity < 0) currQuantity = 0;
    setRegistrationQuantity(currQuantity);
    const field = "user_quantity";
    const nextFormState = { ...regForm, [field]: currQuantity };
    const field1 = "is_coupon_used";
    const nextFormState1 = { ...nextFormState, [field1]: 0 };
    const field2 = "coupon_text";
    const nextFormState2 = { ...nextFormState1, [field2]: "" };
    const field3 = "coupon_id";
    const nextFormState3 = { ...nextFormState2, [field3]: 0 };
    const field4 = "coupon_amount";
    const nextFormState4 = { ...nextFormState3, [field4]: 0 };
    const field5 = "coupon_type";
    const nextFormState5 = { ...nextFormState4, [field5]: "" };
    setRegForm(nextFormState5);
    if (errorsRegistration[field].dirty)
      validateRegistrationForm({
        regForm: nextFormState5,
        errorsRegistration,
        field,
      });
    setRegTotalBookingAmount(registrationEventPrice * currQuantity);
    setRegregShowHaveCouponDiv(true);
    setRegShowCouponDiv(false);
    setRegShowCouponAppliedDiv(false);
  };
  const [eventBookingType, setEventBookingType] = useState("");
  const [quantityCheck, setQuantityCheck] = useState("");
  const [showTernNCond, setTernNCond] = useState(false);
  const handleBookingEventPop = (currEventId, currEventPrice) => {
    setEventBookingType("bookingEvent");
    setRegistrationEventId(currEventId);
    setRegistrationEventPrice(currEventPrice);
    setTernNCond(true);
  };

  const bookTicket = (e) => {
    handleBookingEventPop(e.eventId, e.eventPrice);
    setQuantityCheck(e.eventCapacity);
    let x = getUser();
    let name = x.userName;
    let email = x.emailId;
    let number = x.mobNum;
    const nextFormState = {
      ...regForm,
      user_name: name,
      user_email: email,
      user_mobile: number,
    };
    setRegForm(nextFormState);
  };

 console.log(eventsData);
  return (
    <>
      <div className="container-fluid">
        {isloading && <LoadingSpinner />}
        <Header />

        <div className="d_main_panel myEventDetails pb-4 ">
          <div
            className="row gy-4 gray_bg_color pb-4"
            style={{ width: "50%", margin: "0px auto" }}
          >
            <h4 className="d_main_title text-center ">
              Events you are attending at Doolally
            </h4>
            {setEventsData.length > 0 ? (
              ""
            ) : (
              <div className="row mt-4">
                <h6 className="col-7">Opps! No Events you Booked Till. </h6>
                <Link to="/events" className="col-5 text-end">
                  <button className=" btn-deco">Go to Book Event</button>
                </Link>
              </div>
            )}
            {eventsData.map((item, index) => (
              // <MY_event_box key={index} eventsData={item} eventCompleted={eventCompleted} commDetails={commDetails} prevCharges={prevCharges} signupList={signupList} />
              <>
                <div key={index} className="col-md-12 col-lg-12">
                  <div className=" d_featured_events_box gray_bg_color">
                    <figure className="mb-0">
                      <img
                        src={showCorrectImage(item.filename)}
                        alt=""
                        style={{ height: "400px" }}
                      />
                    </figure>
                    <div className="box_padding">
                      <h3
                        className="d_feat_event_title"
                        style={{ height: "20px", marginLeft: "-5px" }}
                      >
                        {item.eventName}
                      </h3>
                      <p
                        className="d_event_name "
                        style={{
                          color: " #a2c760",

                          height: "20px",
                        }}
                      >
                        {" "}
                        By {item.creatorName}
                      </p>
                      <p className="d_feat_event_nam" style={{ wordWrap: "break-word"}}>
                        {item.eventDescription.substring(0, 160)}
                      </p>
                      <ul
                        className=" row d_feat_event_list  mt-4"
                        style={{ listStyleType: "none" }}
                      >
                        <li className="col-8">
                          {(item.isEventEverywhere == EVENT.STATUS_NO &&
                            item.at_multiple_locations == EVENT.STATUS_NO) ||
                          item.isSpecialEvent == EVENT.STATUS_YES ? (
                            <a href={item.mapLink} target="_blank">
                              <RoomOutlinedIcon />
                              {item.customLocation ? (
                                <>
                                  <span>{item.customLocation}</span>
                                </>
                              ) : item.isSpecialEvent == EVENT.STATUS_YES ? (
                                <>
                                  <span>1st Brewhouse, Pune</span>
                                </>
                              ) : item.isEventEverywhere == EVENT.STATUS_YES &&
                                item.eventId == 2530 ? (
                                <>
                                  <span>All Taprooms</span>
                                </>
                              ) : item.at_multiple_locations ==
                                EVENT.STATUS_YES ? (
                                <>
                                  <span>Multiple Taprooms</span>
                                </>
                              ) : item.locName == "sanpada" ? (
                                <>
                                  <span>Palm Beach Rd</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.locName}</span>
                                </>
                              )}
                            </a>
                          ) : (
                            <a href="javascript:void(0);">
                              {item.customLocation ? (
                                <>
                                  <span>{item.customLocation}</span>
                                </>
                              ) : item.isSpecialEvent == EVENT.STATUS_YES ? (
                                <>
                                  <span>1st Brewhouse, Pune</span>
                                </>
                              ) : item.isEventEverywhere == EVENT.STATUS_YES &&
                                item.eventId == 2530 ? (
                                <>
                                  <span>All Taprooms</span>
                                </>
                              ) : item.at_multiple_locations ==
                                EVENT.STATUS_YES ? (
                                <>
                                  <span>Multiple Taprooms</span>
                                </>
                              ) : item.locName == "sanpada" ? (
                                <>
                                  <span>Palm Beach Rd</span>
                                </>
                              ) : (
                                <>
                                  <span>{item.locName}</span>
                                </>
                              )}
                            </a>
                          )}
                        </li>
                        <li className="col-4">
                          {item.showEventPrice == EVENT.STATUS_YES && (
                            <span className="p_gray poppins mb-0 ">
                              {item.costType == 1 ? (
                                <>
                                  <strong>Free</strong>
                                </>
                              ) : (
                                <>
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/icons/event_rate.svg"
                                    }
                                    alt=""
                                    style={{
                                      width: "25px",

                                      padding: "2%",
                                    }}
                                  />
                                  <strong>
                                    {numberWithCommas(item.eventPrice)}
                                  </strong>
                                </>
                              )}
                            </span>
                          )}
                        </li>
                        <li className="col">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/schedule-date.svg"
                            }
                            alt=""
                          />
                          {item.showEventDate == EVENT.STATUS_YES &&
                            item.showEventTime == EVENT.STATUS_YES && (
                              <>
                                {item.showEventTime && (
                                  <>
                                    <span>
                                      {format(
                                        new Date(
                                          item.showeventDate +
                                            " " +
                                            item.startTime
                                        ),
                                        "hh a"
                                      )}{" "}
                                      -{" "}
                                      {format(
                                        new Date(
                                          item.showeventDate +
                                            " " +
                                            item.endTime
                                        ),
                                        "hh a"
                                      )}
                                    </span>
                                  </>
                                )}
                                {item.showEventDate == EVENT.STATUS_YES ? (
                                  <>
                                    <span>
                                      {format(
                                        new Date(item.eventDate),
                                        ", iii, LLL dd, yyyy"
                                      )}
                                    </span>
                                  </>
                                ) : item.eventType == "Presentation" ? (
                                  <>
                                    <span>Every Wednesday</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Every Sunday</span>
                                  </>
                                )}
                              </>
                            )}
                        </li>
                        {/* <li>&nbsp;</li> */}
                      </ul>
                      <div className="mdl-grid host-main-specs">
                        <div className="mdl-cell--12-col eventDash-stats">
                          <div
                            className="attendee-pay-info text-center mb-3"
                            style={{ backgroundColor: "#f2f2f2" }}
                          >
                            <i className="fa fa-money pb-2 pt-2 "></i> Booking
                            Information
                          </div>
                          <div className="row">
                            <div className="col-6">
                              {item.canceledQuantity > 0 ? (
                                <>
                                  <p>
                                    <span className="my-display-inline">
                                      Quantity:{" "}
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                          opacity: "0.8",
                                        }}
                                      >
                                      {item.canceledQuantity}
                                        
                                      </span>
                                      &nbsp;
                                      
                                      { item.quantity- item.canceledQuantity}
                                    </span>
                                  </p>
                                </>
                              ) : (
                                <>
                                  <p>
                                    <span className="my-display-inline">
                                      Quantity: {item.quantity}
                                    </span>
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="col-6">
                              {item.showEventPrice == EVENT.STATUS_YES && (
                                <p>
                                  <span className="my-display-inline">
                                    Amount Paid:
                                    {item.costType == 1 ? (
                                      <>
                                        <strong>Free</strong>
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/images/icons/event_rate.svg"
                                          }
                                          alt=""
                                          style={{
                                            width: "25px",

                                            padding: "2%",
                                          }}
                                        />
                                        <strong>
                                      {  numberWithCommas((item.quantity - item.canceledQuantity)*(item.eventPrice))}
                                        </strong>
                                      </>
                                    )}
                                  </span>
                                </p>
                              )}
                            </div>
                            <div className="col-6">
                              <p>
                                <span class="my-display-inline">
                                  Booking Date: {"   "}
                                  {format(
                                    new Date(item.createdDT),
                                    "iii, LLL dd"
                                  )}
                                </span>
{" "}
                                <span id="more-information" onClick={()=>{getHistoryData(item)
                                setShowForHistoryInfo(true)
                                }}><InfoIcon/></span>
                              </p>
                            </div>
                            <div className="col-6">
                              <p>
                                <span class="my-display-inline">
                                  Booking Id:{" "}
                                  {item.bookerId.toString().length == "2"
                                    ? "D" + "0000" + item.bookerId
                                    : item.bookerId.toString().length == "3"
                                    ? "D" + "000" + item.bookerId
                                    : item.bookerId.toString().length == "4"
                                    ? "D" + "00" + item.bookerId
                                    : "D" + "0" + item.bookerId}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {item.isEventCancel=='2'? <button className="d_feat_event_btn " style={{border:"none", outline:"none", borderRadius:"5px",backgroundColor:"white", margin:"0 auto", color:"red", padding:"2%" }}> Event Cancelled !</button>:
                      <div className="row gy-4  attaind-pg-btn">

                      <div className="col-6">
                          <button
                              // disabled={ isDisableCancelButton(item.quantity, item.canceledQuantity, item.eventDate) == 0? "disabled" : ""}
                            onClick={() => {
                              bookTicket(item);
                              setShowRegistrationPop(true);
                            }}
                          >
                            Book More Tickets 
                          </button>
                        </div>
                    
                        <div className=" col-6 ">
                          <button
                      disabled={ isDisableCancelButton(item.quantity, item.canceledQuantity, item.eventDate) == 0? "disabled" : ""}
                            onClick={(e) => {
                              setEVENTID(item.eventId);
                              handleShow(e, item);
                            }}
                            data-eventid={item.eventId}
                          >
                             {item.quantity == item.canceledQuantity? "Cancelled" : "Cancel Booking"}
                          </button>
                        </div>
                        <div className="col-6">
                          <button
                            id="basic-button"
                            data-eventid={item.eventId}
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => {
                              handleClick(e);
                              setEVENTID(item.eventId);
                              setOrganiserContactNo(item.creatorPhone);
                              setEvntId(item.eventId)
                              setSendEmailData(prevState => ({ ...prevState, eventId: item.eventId}));
                            }}
                          >
                            Contact Organiser
                          </button>
                        </div>
                    
                        <div className="col-6">
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
                            <button>Share</button>
                          </RWebShare>
                        </div>
                      </div>
                    }
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
        <Modal show={show} onHide={handleClose1}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div className="content-block">
                <h5>
                  <strong>Cancel Event</strong>
                </h5>

                <h6>Do you want to cancel event?</h6>
                <div className="row">
                  <table className="table">
                    <thead>
                      <th>Available Qty</th>
                      <th>Quantity</th>

                      {/* <th>Status</th> */}
                      <th>Action</th>
                    </thead>

                    {/* {eventsRegData &&
                      eventsRegData.map((data, index) => ( */}
                    <tr className="cancel-pg-btn ">
                      <td className="text-center">{avaQty}</td>
                      <td>
                        {/* {data.quantity}{" "} */}
                        <div
                          className="wrapperr"
                          style={{ minWidth: "30%", height: "50px" }}
                        >
                          <span className="minus">
                            <ArrowDropDownIcon
                              onClick={decrementTicketBookCount}
                            />
                          </span>
                          <span className="num">{cancelQty}</span>
                          <span className="plus">
                            <ArrowDropUpIcon
                              onClick={incrementTicketBookCount}
                              id="inc"
                            />
                          </span>
                        </div>
                      </td>

                      {/* <td>{data.isUserCancel == 1 ? "Cancel" : "Live"}</td> */}
                      <td>
                        {/* {data.isUserCancel == 0 && ( */}
                        <button
                          //data-id={data.bookerId}
                          disabled={(cancelQty)== 0 || cancelQty>avaQty? "disabled" : ""}
                          className="btn"
                          onClick={()=>{
                            setShow(false)
                            setShowCacelTicket(true)}}
                        >
                          Cancel
                        </button>
                        {/* )} */}
                      </td>
                    </tr>
                    {/* ))} */}
                  </table>
{avaQty<cancelQty?(
                  <span style={{color:"red", marginLeft:"63%"}}> Quantity Exceeded!</span>):""}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Link to={"#"} onClick={eventCancelRequest}>
              {/* <button
                className="btn-deco"
                style={{ width: "110px", height: "40px" }}
              >
                {isSubmitButtonLoading ? "Loading..." : "Cancel Event"}
              </button> */}
            </Link>
          </Modal.Footer>
        </Modal>
        <div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={()=>{handleClose()
            handleOpenMail()
            }}>
              <span onClick={handleOpenMail} className="font-contact-org" >
                {" "}
                <MailOutlineTwoToneIcon
                  style={{ padding: "2%", marginRight: "2%" }}
                />{" "}
                Email
              </span>
            </MenuItem>

            <MenuItem onClick={handleClose}>
              <a href={"https://wa.me/91" + organiserContactNo} target="_blank">
                <WhatsAppIcon style={{ padding: "2%", marginRight: "2%" }} />{" "}
                WhatsApp
              </a>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <a href={"tel:++91" + organiserContactNo} target="_blank">
                <CallIcon style={{ padding: "2%", marginRight: "2%" }} />{" "}
                {organiserContactNo}
              </a>
            </MenuItem>
          </Menu>
        </div>

        {/* mail pop up */}

        <ModalUI
          open={openMail}
          onClose={handleCloseMail}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <TextField
                onKeyUp={(e) => {
                  setSendEmailData((old) => ({
                    ...old,
                    message: e.target.value,
                  }));
                }}
                label="Message"
                multiline
                rows={4}
                cols={6}
                placeholder="Type your message"
                style={{ width: "100%" }}
              />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <button
                onClick={sendEmail}
                className="btn-deco"
                style={{ width: "100%", height: "40px" }}
              >
                {isSubmitButtonLoading ? "Loading..." : "Send message"}
              </button>
            </Typography>
          </Box>
        </ModalUI>
        {/* quantity increse modal */}

        <Modal show={showRegistrationPop} onHide={handleCloseRegistrationPop}>
          <Modal.Header closeButton>
            {" "}
            <h5>
              <strong>Book Tickets</strong>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={onSubmitRegistrationForm}>
              <div className="modal-body pt-0 monster">
                <div className="content-block">
                  <h5>Go ahead and pick your tickets.</h5>
                </div>
                <div className="d_create_event_form">
                  <div className="row g-3">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          className={clsx(
                            styles.formField,
                            errorsRegistration.user_email.dirty &&
                              errorsRegistration.user_email.error &&
                              styles.formFieldError
                          )}
                          type="text"
                          aria-label="Full Name"
                          name="user_name"
                          placeholder="Full Name"
                          value={regForm.user_name}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 poppins">
                      <div className="form-group">
                        <input
                          className={clsx(
                            styles.formField,
                            errorsRegistration.user_email.dirty &&
                              errorsRegistration.user_email.error &&
                              styles.formFieldError
                          )}
                          type="text"
                          aria-label="Email"
                          name="user_email"
                          placeholder="Email"
                          value={regForm.user_email}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 poppins">
                      <div className="form-group">
                        <input
                          className={clsx(
                            styles.formField,
                            errorsRegistration.user_email.dirty &&
                              errorsRegistration.user_email.error &&
                              styles.formFieldError
                          )}
                          type="number"
                          aria-label="Phone Number"
                          name="user_mobile"
                          placeholder="Phone Number"
                          value={regForm.user_mobile}
                        />
                      </div>
                    </div>
                    <div className="col-md-12 d-flex justify-content-between">
                      <div style={{ marginTop: "10px" }}>Quantity</div>
                      <div className="wrapperr">
                        <span className="minus">
                          <ArrowDropDownIcon
                            onClick={decrementRegBookingCount}
                          />
                        </span>
                        <span className="num">{regForm.user_quantity}</span>
                        <span className="plus">
                          <ArrowDropUpIcon onClick={incrementRegBookingCount} />
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        color: "red",

                        marginLeft: "65%",
                      }}
                    >
                      {quantityCheck < regForm.user_quantity
                        ? "Quantity Exceeded!"
                        : ""}
                    </span>

                    <div
                      className="col-md-12 poppins"
                      style={
                        regShowHaveCouponDiv
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                     
                    {regTotalBookingAmount==0?"":(
                      <div className="form-grou">
                        <input
                          type="checkbox"
                          name="is_coupon_used"
                          id="is_coupon_used"
                          value="1"
                          onChange={onUpdateCpuponField}
                          checked={regForm.is_coupon_used == 1}
                        />
                        Have Coupon?
                      </div>
                      )}
                      <input
                        type="hidden"
                        name="coupon_id"
                        id="coupon_id"
                        value={regForm.coupon_id}
                      />
                      <input
                        type="hidden"
                        name="coupon_amount"
                        id="coupon_amount"
                        value={regForm.coupon_amount}
                      />
                      <input
                        type="hidden"
                        name="coupon_type"
                        id="coupon_type"
                        value={regForm.coupon_type}
                      />
                    </div>
                    <span
                      className="col-md-12 poppins"
                      style={
                        regShowCouponDiv
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div
                        className="form-grou"
                        style={{
                          width: "60%",
                          marginRight: "20px",
                          float: "left",
                        }}
                      >
                        <input
                          className={clsx(styles.formField)}
                          type="text"
                          aria-label="XXXXX"
                          name="coupon_text"
                          placeholder="XXXXX"
                          value={regForm.coupon_text}
                          onChange={onUpdateRegistrationrField}
                          onBlur={onBlurRegistrationrField}
                        />
                        {errorMsgRegistrationCouponVallidate && (
                          <p className="errorMsg" style={{color:"red"}}>
                            {errorMsgRegistrationCouponVallidate}
                          </p>
                        )}
                      </div>
                      <div
                        className="App"
                        style={{ width: "30%", float: "left" }}
                      >
                        <span
                          onClick={verifyRegBookingCoupon}
                          style={{
                            padding: "3px 10px",
                            border: "solid 1px #6c757d",
                            float: "left",
                            cursor: "pointer",
                          }}
                        >
                          {isRegCouponVerifyButtonLoading
                            ? "Loading..."
                            : "Verify"}
                        </span>
                      </div>
                    </span>
                    <div
                      className="col-md-12 poppins"
                      style={
                        regShowCouponAppliedDiv
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      <div className="form-grou">
                        Coupon Applied: {regAppliedCoupon}
                        <span
                          onClick={cancelRegAppliedCoupon}
                          style={{
                            padding: "3px 10px",
                            border: "solid 1px #6c757d",
                            marginLeft: "20px",
                            cursor: "pointer",
                          }}
                        ></span>
                      </div>
                    </div>
                    <div className="col-md-12 poppins">
                      <div className="form-grou">
                        {" "}
                        Net Amount Rs.{numberWithCommas(regTotalBookingAmount)}
                      </div>
                    </div>
                    <div className="col-md-12">
                      {/* {errorMsgRegistration && (
                        <p className="errorMsg">{errorMsgRegistration}</p>
                      )} */}
                      <button
                        className="d_comn_btn d-block d-md-inline-block"
                        style={{ width: "100%", marginRight: "10px" }}
                      >
                        {isRegistrationrSubmitButtonLoading
                          ? "Loading..."
                          : "Proceed"}
                      </button>
                      {/* <Button variant="secondary" onClick={handleCloseRegistrationPop}>{isRegistrationrSubmitButtonLoading ? 'Loading...' : 'Close'}</Button> */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </Modal.Body>
        </Modal>

        {/*  when a user cancel ticket , popup open to ensure yes or no */}

        <Modal
      show={showCancelTicket} onHide={handleCloseCancelTicket}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cancelQty===0 ? <p>Please select Quantity !</p>:<p>
         Do you want to cancel {cancelQty} ticket!
        </p>}
        
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={()=>{handleCloseCancelTicket()
      setShow(true)}}>No</Button>
        {/* <button className="btn-deco " onClick={()=>{eventCancelRequest()
        setIsSubmitButtonLoading(true)}} style={{height:"40px"}}>
       {isSubmitButtonLoading==true?"loading...":"Yes"}</button> */}
       <button className="btn-deco " onClick={()=>{eventCancelRequest()
        }}  style={{height:"40px"}}>
Yes
       </button>
      </Modal.Footer>
    </Modal>

    <Modal
      show={showCancelTicket2} onHide={handleCloseCancelTicket2}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
{result} 
      </Modal.Body>
      <Modal.Footer>
    
        <button className="btn-deco" onClick={()=>{handleCloseCancelTicket2()
       setIsSubmitButtonLoading(false) 

      const nextFormState = { ...regForm, user_quantity: 0 };
      setRegForm(nextFormState );
       }} style={{height:"40px",width:"60px"}}>Ok</button>
      </Modal.Footer>
    </Modal>


    {/* more info history popup modal */}

    <Modal show={showForHistoryInfo} onHide={handleClose5}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div className="content-block">
                <h5>
                  <strong>Booking/Cancellation History</strong>
                </h5>

                {/* <h6>Do you want to cancel event?</h6> */}
                <div className="row">
                  <table className="historyData">
                    <thead>
                      <th>Booking Id</th>
                      <th>Booking Date</th>
                      <th>Total Quantity</th>
                      <th>Cancelled Quantity</th>
                    </thead>

{historyData.map((item, index) => (
                    <tr className="cancel-pg-btn table ">
                      <td className="text-center">{item.bookerId.toString().length == "2"
                                    ? "D" + "0000" + item.bookerId
                                    : item.bookerId.toString().length == "3"
                                    ? "D" + "000" + item.bookerId
                                    : item.bookerId.toString().length == "4"
                                    ? "D" + "00" + item.bookerId
                                    : "D" + "0" + item.bookerId}</td>
                      <td>
                      {format(
                                    new Date(item.createdDT),
                                    "iii, LLL dd"
                                  )}
                      </td>

                      <td className="text-center"> {item.quantity}</td>
                      <td className="text-center">
                    
{item.canceledQuantity}
                      </td>
                    </tr>
))}
                  </table>

                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose5}>
              Close
            </Button>
            <Link to={"#"} >
      
            </Link>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </>
  );
};
export default MyEvents;