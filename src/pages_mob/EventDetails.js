import React, { useState, useEffect } from "react";
import axios from "axios";
import { RWebShare } from "react-web-share";
import { atcb_action } from "add-to-calendar-button";
import "add-to-calendar-button/assets/css/atcb.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Helper from "../utils/Helper";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import TwitterIcon from "@material-ui/icons/Twitter";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { format } from "date-fns";
import styles from "../components/validators/createvent/BookEventForm.module.css";
import clsx from "clsx";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import TermNCondition from "../components/validators/TermEvent";
import { useBookEventFormValidator } from "../components/validators/createvent/useBookEventFormValidator";

import {
  getRequestOptions,
  apiBaseUrl,
  eventDetailsApiUrl,
  eventReminderMeApiUrl,
  postRequestOptions,
  eventBookRegistrationrApiUrl,
  eventRazorpayResponseApiUrl,
  eventBookCouponVerifyApiUrl,
  multipartRequestOptions,
  eventImageBaseUrl,
  EVENT,
  userFrom,
  razorpayKey,
  fnbRequesOptions,
  userSendVerificationOTPApiUrl,
  userCheckVerificationOTPApiUrl,
} from "../config/constant";
import {
  setUserCurrLoc,
  getUserCurrLoc,
  setUserSession,
  getUser,
  getToken,
} from "../utils/UserAuthenticate";
import {
  showCorrectImage,
  numberWithCommas,
  isEventFinished,
  isEventStarted,
} from "../utils/Common";

const EventDetails = () => {
  const { eventSlug } = useParams();

  const userData = getUser();
  //console.log(useParams());
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [twitterView, settwitterView] = useState([]);
  const [hangout, setHangout] = useState([]);
  const [eventCategory, setEventCategory] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [showCancelTicket2, setShowCacelTicket2] = useState(false);
  const handleCloseCancelTicket2 = () => {
    setShowCacelTicket2(false);
    window.location = "/attending";
  };

  const [eventsData, setEventsData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const user = getUser();

  const [priceVariations, setPriceVariations] = useState([]);
  const [eventCompleted, setEventCompleted] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [userBooked, setUserBooked] = useState(false);
  const [isUnderReview, setIsUnderReview] = useState(false);

  const [showReminderPop, setShowReminderPop] = useState(false);
  const [reminderMeEventId, setReminderMeEventId] = useState("");
  const [reminderMeEmailAddress, setReminderMeEmailAddress] = useState("");
  const [errorMsgReminderMe, setErrorMsgReminderMe] = useState("");
  const [isReminderSubmitButtonLoading, setIsReminderSubmitButtonLoading] =
    useState(false);
  const handleCloseReminderPop = () => setShowReminderPop(false);
  const handleShowReminderPop = (currEventId) => {
    setReminderMeEventId(currEventId);
    setShowReminderPop(true);
  };

  const [showTernNCond, setTernNCond] = useState(false);
  const [eventBookingType, setEventBookingType] = useState("");

  const [showRegistrationPop, setShowRegistrationPop] = useState(false);
  const [registrationEventId, setRegistrationEventId] = useState("");
  const [registrationEventPrice, setRegistrationEventPrice] = useState(0);
  const [errorMsgRegistration, setErrorMsgRegistration] = useState("");
  const [registrationQuantity, setRegistrationQuantity] = useState(0);
  const [regTotalBookingAmount, setRegTotalBookingAmount] = useState(0);
  const [regShowHaveCouponDiv, setRegregShowHaveCouponDiv] = useState(false);
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
  const handleCloseRegistrationPop = () => {
    setRegistrationEventId("");
    setShowRegistrationPop(false);
  };

  const [result, setResult] = useState("");
  const [OTPshow, setOTPshow] = useState(false);
  const OTPhandleClose = () => setOTPshow(false);
  const [currUserMobile, setCurrUserMobile] = useState("");
  const [currUserOTP, setCurrUserOTP] = useState("");
  const [OTPerrorMsg, setOTPErrorMsg] = useState("");
  const [isOTPSubmitButtonLoading, setIsOTPSubmitButtonLoading] =
    useState(false);

  const handleBookingEventPop = (currEventId, currEventPrice) => {
    setEventBookingType("bookingEvent");
    setRegistrationEventId(currEventId);
    setRegistrationEventPrice(currEventPrice);
    setTernNCond(true);
  };

  const handleCloseTernNCond = () => {
    setShowRegistrationPop(true);
    setTernNCond(false);
  };

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

  const incrementRegBookingCount = (e) => {
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
  const config = {
    headers: {
      "app-key": "eik70po2szaj13nh6qg5ymcv9b4dtf8x",
      "app-secret": "2bd57f88eae50f8d07716820a8d07e6db99ad987",
      "access-token": "1081a1a8cc7fe83a9d08483490d87b8a8922c860",
      "Content-Type": "application/json",
    },
  };
  const url =
    "https://moneysaverz.com:8080/front/v1/common/get-restaurant-menus";
  const data = {
    restID: "9nv7ebkz",
  };

  const getData2 = () => {
    {
      userData
        ? setRegForm({
            ...regForm,
            user_name: userData.userName,
            user_email: userData.emailId,
            user_mobile: userData.mobNum,
          })
        : console.log("");
    }
  };
  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage?redirect_to="+eventSlug ;
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    getData2();
    getData();
    const data = {
      restID: "9nv7ebkz",
    };

    // const getFnbData = async () => {
    //   let result = await fetch(
    //     "https://moneysaverz.com:8080/front/v1/common/get-restaurant-menus",
    //     fnbRequesOptions,
    //     data
    //   );
    //   if (result) {
    //     console.log(result);
    //   }
    // };
    // getFnbData();
    const x = axios
      .get(url, data, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(x);
  }, []);

  const getData = async () => {
    try {
      setIsloading(true);
      let currGetDataUrl =
        apiBaseUrl +
        eventDetailsApiUrl +
        "?eventSlug=" +
        eventSlug +
        "&userId=";
      const user = getUser();
      if (user) {
        currGetDataUrl =
          apiBaseUrl +
          eventDetailsApiUrl +
          "?eventSlug=" +
          eventSlug +
          "&userId=" +
          user.userId;
      }
      // here Api call for Home page
      let result = await fetch(currGetDataUrl, getRequestOptions);
      if (result) {
        result = await result.json();
        //console.log(result);
        if (result.response.result.eventData.length > 0) {
          setEventsData(result.response.result.eventData);
          setPriceVariations(result.response.result.price_variations);
          setEventCompleted(result.response.result.eventCompleted);
          setUserCreated(result.response.result.userCreated);
          setUserBooked(result.response.result.userBooked);
          setIsUnderReview(result.response.result.isUnderReview);

          settwitterView(result.response.result.twitterView);
          setHangout(result.response.result.hangout);
          setEventCategory(result.response.result.categoryData);
          setwhatHappingWeek(result.response.result.whatHappingWeek);
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

  const onUpdateReminderMeField = (e) => {
    setReminderMeEmailAddress(e.target.value);
    let reminderEmail = e.target.value;
    if (!reminderEmail) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderEmail)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }
  };

  const onBlureReminderMeField = (e) => {
    let reminderEmail = e.target.value;
    if (!reminderEmail) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderEmail)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }
  };

  const onSubmitReminderMeForm = async (e) => {
    e.preventDefault();
    if (!reminderMeEmailAddress) {
      setErrorMsgReminderMe("Your Email is required");
    } else if (!new RegExp(/\S+@\S+\.\S+/).test(reminderMeEmailAddress)) {
      setErrorMsgReminderMe("Incorrect email format");
    } else {
      setErrorMsgReminderMe("");
    }

    const userCurrLoc = getUserCurrLoc();
    // Create an object of formData
    const formData = new FormData();

    // Set the formData object
    formData.append("emailId", reminderMeEmailAddress);
    formData.append("eventId", reminderMeEventId);
    formData.append("userFrom", userFrom);
    formData.append("userIpAdress", userCurrLoc.IPv4);

    //console.log(formData);
    try {
      setIsReminderSubmitButtonLoading(true);
      // here Api call for Home page
      let result = await axios.post(
        apiBaseUrl + eventReminderMeApiUrl,
        formData,
        multipartRequestOptions
      );
      if (result) {
        result = result.data;
        //console.log(result);
        if (result.statusCode === "success") {
          setResult(result.statusMessage);
          setShowCacelTicket2(true);
        } else {
          setErrorMsgReminderMe(result.statusMessage);
        }
        setIsReminderSubmitButtonLoading(false);
      }
    } catch (error) {
      setErrorMsgReminderMe("Error while set reminder me. Try again later.");
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

  const onUpdateCurrentOTPField = (otpdata) => {
    setCurrUserOTP(otpdata.target.value);
  };
  const onSubmitRegistrationForm = async (e) => {
    console.log(regForm);
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
    //postRequestOptions.body         =   JSON.stringify(formData, null, 2);
    //console.log(postRequestOptions);
    //console.log(formData);

    // setIsRegistrationrSubmitButtonLoading(true);
    // here Api call for Home page
    //let regresult  =   await fetch(apiBaseUrl+eventBookRegistrationrApiUrl,postRequestOptions);
    try {
      let regresult = await axios.post(
        apiBaseUrl + eventBookRegistrationrApiUrl,
        formData,
        multipartRequestOptions
      );
      if (regresult) {
        //regresult      =   await regresult.json();
        regresult = regresult.data;
        //console.log(regresult);
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
                //console.log(response);
                setIsRegistrationrSubmitButtonLoading(true);
                // here Api call for success payment
                let result = await axios.post(
                  apiBaseUrl + eventRazorpayResponseApiUrl,
                  payResData,
                  postRequestOptions
                );
                if (result) {
                  result = result.data;
                  //console.log(result);
                  if (result.statusCode === "success") {
                    setUserSession(
                      result.response.result.userToken,
                      result.response.result.userData[0]
                    );
                    setResult(result.statusMessage);
                    setShowRegistrationPop(false);
                    setShowCacelTicket2(true);

                    // window.location="/attending"
                    // setShowPaymentConfirmation(true);
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
            //console.log(options);
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
          } else {
            setUserSession(
              regresult.response.result.userToken,
              regresult.response.result.userData[0]
            );
            alert(regresult.statusMessage);

            window.location = "/";
          }
        } else {
          setErrorMsgRegistration(regresult.statusMessage);
        }
        setIsRegistrationrSubmitButtonLoading(false);
      }
    } catch (e) {
      setIsRegistrationrSubmitButtonLoading(false);
      alert("Entered quantity is out of limit");

      // console.log(e.toJSON());
    }
    // here Api call for Home page
    // let result = await axios.post(
    //   apiBaseUrl + userSendVerificationOTPApiUrl,
    //   otpformData,
    //   multipartRequestOptions
    // );
    //   if (result) {
    //     result = result.data;
    //     //console.log(result);
    //     if (result.statusCode === "success") {
    //       //alert(result.statusMessage);
    //       setCurrUserMobile(regForm.user_mobile);
    //       setOTPshow(true);
    //     } else {
    //       setErrorMsgRegistration(result.statusMessage);
    //     }
    //   }
    // } catch (error) {
    //   setErrorMsgRegistration("Failed to book event, Please try later!");
    // }
  };

  const onCheckVerificationOTP = async (e) => {
    e.preventDefault();
    const user = getUser();
    const userCurrLoc = getUserCurrLoc();
    // Create an object of formData for send OTP
    const otpformData = new FormData();
    otpformData.append("mobile", currUserMobile);
    otpformData.append("otp", currUserOTP);
    otpformData.append("userFrom", userFrom);
    otpformData.append("userId", user ? user.userId : "notlogin");
    otpformData.append("userIpAdress", userCurrLoc.IPv4);

    try {
      setIsOTPSubmitButtonLoading(true);
      // here Api call for Home page
      let otpresult = await axios.post(
        apiBaseUrl + userCheckVerificationOTPApiUrl,
        otpformData,
        multipartRequestOptions
      );
      if (otpresult) {
        otpresult = otpresult.data;
        //console.log(otpresult);
        if (otpresult.statusCode === "success") {
          //alert(otpresult.statusMessage);
          setOTPshow(false);

          let formData = regForm;
          formData.userFrom = userFrom;
          formData.userIpAdress = userCurrLoc.IPv4;
          formData.eventId = registrationEventId;
          //postRequestOptions.body         =   JSON.stringify(formData, null, 2);
          //console.log(postRequestOptions);
          //console.log(formData);

          setIsRegistrationrSubmitButtonLoading(true);
          // here Api call for Home page
          //let regresult  =   await fetch(apiBaseUrl+eventBookRegistrationrApiUrl,postRequestOptions);
          let regresult = await axios.post(
            apiBaseUrl + eventBookRegistrationrApiUrl,
            formData,
            multipartRequestOptions
          );
          if (regresult) {
            //regresult      =   await regresult.json();
            regresult = regresult.data;
            //console.log(regresult);
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
                    //console.log(response);
                    setIsRegistrationrSubmitButtonLoading(true);
                    // here Api call for success payment
                    let result = await axios.post(
                      apiBaseUrl + eventRazorpayResponseApiUrl,
                      payResData,
                      postRequestOptions
                    );
                    if (result) {
                      result = result.data;
                      //console.log(result);
                      if (result.statusCode === "success") {
                        setUserSession(
                          result.response.result.userToken,
                          result.response.result.userData[0]
                        );
                        //alert(result.statusMessage);
                        window.location = "/attending";
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
                //console.log(options);
                const paymentObject = new window.Razorpay(options);
                paymentObject.open();
              } else {
                setUserSession(
                  regresult.response.result.userToken,
                  regresult.response.result.userData[0]
                );
                alert(regresult.statusMessage);
                window.location = "/";
              }
            } else {
              setErrorMsgRegistration(regresult.statusMessage);
            }
            setIsRegistrationrSubmitButtonLoading(false);
          }
        } else {
          setOTPErrorMsg(otpresult.statusMessage);
        }
        setIsOTPSubmitButtonLoading(false);
      }
    } catch (error) {
      setOTPErrorMsg("Error while verify OTP. Try again later.");
    }
  };

  const [calendarDateDesc, setCalendarDateDesc]=useState([]);
  // const config2 = {
  //   name: calendarDateDesc.eventName,
  //   description:calendarDateDesc.eventDescription,
  // startDate:calendarDateDesc.showeventDate
  // ,

  //   options: ["Google", "apple"],
  //   timeZone: "Europe/Berlin",
  //   trigger: "click",
  //   iCalFileName: "Reminder-Event",
  // };
  const config2 = {
    name: "Reminder to star the add to calendar button repo",
    description:
      "Check out the maybe easiest way to include add to calendar buttons to your website at.",
    startDate: "2023-01-14",
    endDate: "2023-01-18",
    options: ["Google", "apple"],
    timeZone: "Europe/Berlin",
    trigger: "click",
    iCalFileName: "Reminder-Event",
  };


  const calenderAddToDate=(e)=>{
    setCalendarDateDesc(e)
    atcb_action(config2)
    console.log(calendarDateDesc);
  
  }

  return (
    <>
      <div className="mb-4 container-fluid ">
        <Header />

        <div className="d_main_panel">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-9 mb-4">
                <div className="d_event_detl black_heading box_paddisg gray_b_color">
                  {eventsData.map((item, index) => (
                    <>
                      <div className="d_title_box">
                        <p className="d_main_sub_title ph-none">
                          {item.cateName} events{" "}
                          <span className="d_line"></span>
                          <span className="d_round"></span>
                          <span className="d_round"></span>
                          <span className="d_round"></span>
                        </p>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-8">
                          <div className="d_featured_events_box shadow-none">
                            <figure
                              className="mb-0"
                              style={{ margin: "1px auto" }}
                            >
                              <img
                                src={showCorrectImage(item.filename)}
                                alt={item.eventName}
                                style={{ height: "260px" }}
                              />
                              {/* <img src={process.env.PUBLIC_URL + "/images/e9.jpeg"} alt="load don done require" style={{width:"330px",height:"280px"}}/> */}

                              <span id="price-on-pic" className="poppins">
                                Rs {item.eventPrice}
                              </span>
                            </figure>
                            <div className="d_feat_event_cnt poppins px-0">
                              <p
                                className="d_feat_event_title2"
                                // style={{ marginLeft: "-5px" }}
                              >
                                {item.eventName}
                              </p>
                              <br />
                              <p
                                className="d_feat_event_name"
                                style={{
                                  paddingLeft: "3%",
                                  marginTop: "-13px",
                                }}
                              >
                                By {item.creatorName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="d_art_craft"
                        style={{ marginTop: "-20px" }}
                      >
                        <span className="p_gray poppins">
                          {(item.isEventEverywhere == EVENT.STATUS_NO &&
                            item.at_multiple_locations == EVENT.STATUS_NO) ||
                          item.isSpecialEvent == EVENT.STATUS_YES ? (
                            <a href={item.mapLink} target="_blank">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/icons/me_location.svg"
                                }
                                alt="locationme"
                              />
                              {item.customLocation ? (
                                <>{item.customLocation}</>
                              ) : item.isSpecialEvent == EVENT.STATUS_YES ? (
                                <>1st Brewhouse, Pune</>
                              ) : item.isEventEverywhere == EVENT.STATUS_YES &&
                                item.eventId == 2530 ? (
                                <>All Taprooms</>
                              ) : item.at_multiple_locations ==
                                EVENT.STATUS_YES ? (
                                <>Multiple Taprooms</>
                              ) : item.locName == "sanpada" ? (
                                <>Palm Beach Rd</>
                              ) : (
                                <>{item.locName}</>
                              )}
                            </a>
                          ) : (
                            <a href="javascript:void(0);">
                              {item.customLocation ? (
                                <>{item.customLocation}</>
                              ) : item.isSpecialEvent == EVENT.STATUS_YES ? (
                                <>1st Brewhouse, Pune</>
                              ) : item.isEventEverywhere == EVENT.STATUS_YES &&
                                item.eventId == 2530 ? (
                                <>All Taprooms</>
                              ) : item.at_multiple_locations ==
                                EVENT.STATUS_YES ? (
                                <>Multiple Taprooms</>
                              ) : item.locName == "sanpada" ? (
                                <>Palm Beach Rd</>
                              ) : (
                                <>{item.locName}</>
                              )}
                            </a>
                          )}
                        </span>
                        <br />
                        <span className="p_gray poppins"     onClick={()=>calenderAddToDate(item)}>
                        
                        <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/icons/ic_events_date.svg"
                                  }
                                  alt=""
                                  style={{ width: "13px" }}
                                />
                          {item.showEventDate == EVENT.STATUS_YES &&
                            item.showEventTime == EVENT.STATUS_YES && (
                              <>
                              {item.showEventDate == EVENT.STATUS_YES ? (
                                  <>
                                    {format(
                                      new Date(item.eventDate),
                                      " iii, LLL dd, yyyy"
                                    )}
                                  </>
                                ) : item.eventType == "Presentation" ? (
                                  <>Every Wednesday</>
                                ) : (
                                  <>Every Sunday</>
                                )}
                                     {" "}
                              
                                 <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/icons/bx_time-five.svg"
                            }
                            alt=""
                            style={{ width: "17px", marginLeft:"12px" }}
                          />


                                {item.showEventTime && (
                                  <>
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
                                        item.showeventDate + " " + item.endTime
                                      ),
                                      "hh a"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                        </span>
                        <br />
                        {/* here price listing */}
                        {/* {item.showEventPrice == EVENT.STATUS_YES && (
                          <span className="p_gray poppins mb-0 ">
                            {item.costType == 1 ? (
                              <>Free</>
                            ) : (
                              <>
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/images/icons/event_rate.svg"
                                  }
                                  alt=""
                                />{" "}
                                Entry Rs. {numberWithCommas(item.eventPrice)}
                              </>
                            )}
                          </span>
                        )}
                        <div className="ph-none">
                          <span className="p_gray poppins mb-0 ">
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                "/images/icons/event_rate.svg"
                              }
                              alt=""
                            />
                            Entry Rs. 2200
                          </span>
                        </div> */}
                        <p
                          className="p_gray mt-lg-5  mt-2 mb-4 poppins"
                          style={{ wordWrap: "break-word" }}
                        >
                          {" "}
                          {item.eventDescription}
                        </p>

                        {item.otherPaymentLink && item.eventPaymentLink ? (
                          <>
                            <div
                              className="col d_comn_btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                            >
                              <Link
                                to={item.eventPaymentLink}
                                className="other-booking-btn"
                              >
                                Rs. 500 single pass
                              </Link>
                            </div>
                            <div
                              className="col d_comn_btn"
                              data-bs-toggle="offcanvas"
                              data-bs-target="#offcanvasRight"
                              aria-controls="offcanvasRight"
                            >
                              <Link
                                to={item.otherPaymentLink}
                                className="other-booking-btn"
                              >
                                Rs. 1000 all day pass
                              </Link>
                            </div>
                          </>
                        ) : (
                          <>
                            {item.isOlympicsEvent &&
                            item.isOlympicsEvent == 1 ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                <Link to={"http://beerolympics.in/register"}>
                                  Visit Now
                                </Link>
                              </div>
                            ) : isEventFinished(
                                item.eventDate,
                                item.endTime
                              ) ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Event Over
                              </div>
                            ) : isEventStarted(
                                item.eventDate,
                                item.startTime
                              ) ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Event Started
                              </div>
                            ) : //) : eventCompleted == true ? (
                            //    <div className="col d_comn_btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Thank you for creating!</div>
                            userCreated == true ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Thank you for creating!
                              </div>
                            ) : userBooked == true ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Thank you for registering!
                              </div>
                            ) : item.isRegFull == 1 ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Registration Full!
                              </div>
                            ) : isUnderReview == true ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Under Review
                              </div>
                            ) : item.ifActive == EVENT.NOT_ACTIVE ||
                              item.isEventCancel == EVENT.CANCEL_REVIEW ||
                              item.isEventCancel == EVENT.CANCEL_FINAL ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Event Canceled
                              </div>
                            ) : item.insider_link ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                <Link to={item.insider_link}>Book Now</Link>
                              </div>
                            ) : item.eventType == "Presentation" ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                                onClick={() =>
                                  handleShowReminderPop(item.eventId)
                                }
                              >
                                Remind Me
                              </div>
                            ) : item.eventType == "Internal" ? (
                              <div
                                className="col d_comn_btn"
                                data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvasRight"
                                aria-controls="offcanvasRight"
                              >
                                Walk in
                              </div>
                            ) : item.eventType == "paytm" ? ( //book-instamojo
                              <div className="d_feat_event_btn mt-4">
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ width: "150%", height: "40px" }}
                                  onClick={() =>
                                    handleBookingEventPop(
                                      item.eventId,
                                      item.eventPrice
                                    )
                                  }
                                >
                                  Book Event{" "}
                                </button>
                                <span className="bell">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/icons/bell1.jpg"
                                    }
                                    alt="ff"
                                    style={{ width: "30px" }}
                                  />
                                </span>
                              </div>
                            ) : item.eventType == "razorpay" ? ( //book-instamojo
                              <div className="d_feat_event_btn mt-4">
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ width: "150%", height: "40px" }}
                                  onClick={() =>
                                    handleBookingEventPop(
                                      item.eventId,
                                      item.eventPrice
                                    )
                                  }
                                >
                                  Book Event{" "}
                                </button>
                                <span className="bell">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/icons/bell1.jpg"
                                    }
                                    alt="ff"
                                    style={{ width: "30px" }}
                                  />
                                </span>
                              </div>
                            ) : item.priceVariation &&
                              item.priceVariation == 1 ? ( //book-instamojo
                              <div className="d_feat_event_btn mt-4">
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ width: "150%", height: "40px" }}
                                  onClick={() =>
                                    handleBookingEventPop(
                                      item.eventId,
                                      item.eventPrice
                                    )
                                  }
                                >
                                  Book Event{" "}
                                </button>
                                <span className="bell">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/icons/bell1.jpg"
                                    }
                                    alt="ff"
                                    style={{ width: "30px" }}
                                  />
                                </span>
                              </div>
                            ) : item.eventType == "Lyra" ? (
                              <div className="d_feat_event_btn mt-4">
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ width: "150%", height: "40px" }}
                                  onClick={() =>
                                    handleBookingEventPop(
                                      item.eventId,
                                      item.eventPrice
                                    )
                                  }
                                >
                                  Book Event{" "}
                                </button>
                                <span className="bell">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/images/icons/bell1.jpg"
                                    }
                                    alt="ff"
                                    style={{ width: "30px" }}
                                  />
                                </span>
                              </div>
                            ) : (
                              <div className="d_feat_event_btn mt-4">
                                <button
                                  type="button"
                                  className="d_book_event "
                                  style={{ width: "150%", height: "40px" }}
                                  onClick={() =>
                                    handleBookingEventPop(
                                      item.eventId,
                                      item.eventPrice
                                    )
                                  }
                                >
                                  Book Event{" "}
                                </button>
                                <NavLink className="bell">
                                  {item.eventType !== "Internal" && (
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
                                      <button
                                        style={{
                                          marginLeft: "30px",
                                          outline: "none",
                                          border: "none",
                                          backgroundColor: "#a2c760",
                                          height: "29px",
                                          width: "30px",
                                          color: "white",
                                          borderRadius: "5px",
                                        }}
                                      >
                                        <ShareSharpIcon
                                          // onClick={() =>
                                          //   handleShowReminderPop(item.eventId)
                                          // }
                                          style={{
                                            width: "60%",
                                            marginTop: "-5px",
                                          }}
                                        />
                                      </button>
                                    </RWebShare>
                                  )}
                                </NavLink>
                              </div>
                              // <div className="col d_comn_btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" onClick={() => handleBookingEventPop(item.eventId,item.eventPrice)}>Book Now</div>
                            )}
                          </>
                        )}
                      </div>
                    </>
                  ))}{" "}
                </div>
              </div>
              <div className="col-lg-3 ph-none">
                <div className="d_event_sidepanel mb-4">
                  <figure className="mb-0">
                    <img
                      src={
                        process.env.PUBLIC_URL + "/images/andheri-doolally.png"
                      }
                      alt=""
                    />
                  </figure>
                  <div className="d_btn">Submit event</div>
                </div>
                <div className="d_event_sidepanel d_private_party">
                  <figure className="mb-0">
                    <img
                      src={process.env.PUBLIC_URL + "/images/Frame.png"}
                      alt=""
                    />
                  </figure>
                  <div className="d_comn_btn">Book your party</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div className="content-block">
                <h5>
                  <strong>Please login first then create event.</strong>
                </h5>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Link to={"/login/create-event"}>
              <div className="btn btn-success">Login</div>
            </Link>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showReminderPop} onHide={handleCloseReminderPop}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div className="content-block">
                <h5>
                  <strong>
                    We'll send you a reminder 24 hours before the event:{" "}
                  </strong>
                </h5>
                <input
                  className={styles.formField}
                  type="text"
                  aria-label="Email address"
                  name="reminderMeEmailAddress"
                  placeholder="Email address"
                  value={reminderMeEmailAddress}
                  onChange={onUpdateReminderMeField}
                  onBlur={onBlureReminderMeField}
                />
                {errorMsgReminderMe && (
                  <p className="errorMsg">{errorMsgReminderMe}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onSubmitReminderMeForm}>
              {isReminderSubmitButtonLoading ? "Loading..." : "Reminder Me"}
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showTernNCond} onHide={handleCloseTernNCond}>
          <Modal.Body>
            <TermNCondition />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseTernNCond}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showRegistrationPop} onHide={handleCloseRegistrationPop}>
          <Modal.Header closeButton>
            {" "}
            <h5>
              <strong>Book Tickets</strong>
            </h5>
          </Modal.Header>
          <Modal.Body>
            <form className={styles.form} onSubmit={onSubmitRegistrationForm}>
              <div className="modal-body pt-0 monster">
                <div className="content-block">
                  <h5>Go ahead and pick your tickets.</h5>
                </div>
                <div className="d_create_event_form">
                  <div className="row g-3">
                    <div className="col-md-12 poppins">
                      <div className="form-group">
                        <input
                          className={clsx(
                            styles.formField,
                            errorsRegistration.user_name.dirty &&
                              errorsRegistration.user_name.error &&
                              styles.formFieldError
                          )}
                          type="text"
                          aria-label="Full Name"
                          name="user_name"
                          placeholder="Full Name"
                          value={regForm.user_name}
                          onChange={onUpdateRegistrationrField}
                          onBlur={onBlurRegistrationrField}
                        />
                        {errorsRegistration.user_name.dirty &&
                        errorsRegistration.user_name.error ? (
                          <p className={styles.formFieldErrorMessage}>
                            {errorsRegistration.user_name.message}
                          </p>
                        ) : null}
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
                          onChange={onUpdateRegistrationrField}
                          onBlur={onBlurRegistrationrField}
                        />
                        {errorsRegistration.user_email.dirty &&
                        errorsRegistration.user_email.error ? (
                          <p className={styles.formFieldErrorMessage}>
                            {errorsRegistration.user_email.message}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12 poppins">
                      <div className="form-group">
                        <input
                          className={clsx(
                            styles.formField,
                            errorsRegistration.user_mobile.dirty &&
                              errorsRegistration.user_mobile.error &&
                              styles.formFieldError
                          )}
                          type="number"
                          aria-label="Phone Number"
                          name="user_mobile"
                          placeholder="Phone Number"
                          value={regForm.user_mobile}
                          onChange={onUpdateRegistrationrField}
                          onBlur={onBlurRegistrationrField}
                        />
                        {errorsRegistration.user_mobile.dirty &&
                        errorsRegistration.user_mobile.error ? (
                          <p className={styles.formFieldErrorMessage}>
                            {errorsRegistration.user_mobile.message}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12 d-flex justify-content-between">
                      <div style={{ marginTop: "10px" }}>Quantity</div>
                      <div className="wrapperr" style={{ minWidth: "200px" }}>
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
                    <div
                      className="col-md-12 poppins"
                      style={
                        regShowHaveCouponDiv
                          ? { display: "block" }
                          : { display: "none" }
                      }
                    >
                      {regTotalBookingAmount == 0 ? (
                        ""
                      ) : (
                        <div className="form-grou">
                          <input
                            type="checkbox"
                            name="is_coupon_used"
                            id="is_coupon_used"
                            value="1"
                            onChange={onUpdateCpuponField}
                            checked={regForm.is_coupon_used == 1}
                          />
                          <span style={{ marginLeft: "2%" }}>Have Coupon?</span>
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
                          <p className="errorMsg">
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
                        >
                          X
                        </span>
                      </div>
                    </div>
                    <div className="col-md-12 poppins">
                      <div className="form-grou">
                        {" "}
                        Net Amount Rs.{numberWithCommas(regTotalBookingAmount)}
                      </div>
                    </div>
                    <div className="col-md-12">
                      {errorMsgRegistration && (
                        <p className="errorMsg">{errorMsgRegistration}</p>
                      )}
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
        <Modal show={OTPshow} onHide={OTPhandleClose}>
          <Modal.Body>
            <div className="modal-body pt-0 monster">
              <div
                className="content-block"
                style={{ height: "70px", overflow: "auto" }}
              >
                <center>
                  <h5>
                    <strong>OTP sent to {currUserMobile}:</strong>
                  </h5>

                  <div className="form-group">
                    <input
                      className="CreateEventForm_formField__OyDQb"
                      type="text"
                      aria-label="Enter OTP"
                      name="currentOTP"
                      placeholder="Enter OTP"
                      value={currUserOTP}
                      onChange={onUpdateCurrentOTPField}
                      onBlur={onUpdateCurrentOTPField}
                    />
                  </div>
                </center>
              </div>
              {OTPerrorMsg && <p className="errorMsg">{OTPerrorMsg}</p>}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCheckVerificationOTP}>
              {isOTPSubmitButtonLoading ? "Loading..." : "Verify"}
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showCancelTicket2}
          onHide={handleCloseCancelTicket2}
          size="md"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Confirmation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{result}</Modal.Body>
          <Modal.Footer>
            <button
              className="btn-deco"
              onClick={() => {
                handleCloseCancelTicket2();
                //  setIsSubmitButtonLoading(false)

                // const nextFormState = { ...regForm, user_quantity: 0 };
                // setRegForm(nextFormState );
              }}
              style={{ height: "40px", width: "60px" }}
            >
              Ok
            </button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    </>
  );
};
export default EventDetails;
