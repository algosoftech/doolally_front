import React, { useState, useEffect, useRef } from "react";
// import { GoogleInput } from 'react-google-input-tool';
import axios from "axios";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import Photos from "../Photos";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
//croper
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";
//

import Review from "../Sliders/Review";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import TermNCondition from "../components/TermNConditionWeb";
import Helper from "../utils/Helper";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { format, isValid } from "date-fns";
import TextField from "@mui/material/TextField";
import styles from "../components/validators/createvent/CreateEventForm.module.css";
import { useCreateEventFormValidator } from "../components/validators/createvent/useCreateEventFormValidator";
import {
  getRequestOptions,
  postRequestOptions,
  multipartRequestOptions,
  apiBaseUrl,
  fBDImageBaseUrl,
  userCreateEventPageApiUrl,
  userCreateEventApiUrl,
  eventShareBaseUrl,
  createEventDoolallyFee,
  userFrom,
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
  isCorrectStartTime,
  isCorrectEndTime,
} from "../utils/Common";

const CreateEvent = () => {
  const userData = getUser();
  const [alertStartTime, setAlertStartTime] = useState("");
  const [alertEndTime, setAlertEndTime] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //  alert message in popup modal

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    window.location = "/my-events";
  };
  const handleShowModal = () => setShowModal(true);
  const [message, setMessage] = useState();

  //time validation
  const [value, setValue] = React.useState(dayjs(""));
  const [value2, setValue2] = React.useState(dayjs(""));

  // end alert
  const [eventcategory, setEventcategory] = useState([]);
  const [eventLocation, setEventLocation] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [eventDate, setEventDate] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPerpersonFee, setCurrentPerpersonFee] = useState(0);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
  const [ermsge, setErmsge] = useState("");
  const [eventImageDiv, setEventImageDiv] = useState("button");
  const [currEventImage, setCurrEventImage] = useState("");

  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

  const [timeValue, onChange] = useState("10:00");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const [OTPshow, setOTPshow] = useState(false);
  const OTPhandleClose = () => setOTPshow(false);
  const [currUserMobile, setCurrUserMobile] = useState("");
  const [currUserOTP, setCurrUserOTP] = useState("");
  const [OTPerrorMsg, setOTPErrorMsg] = useState("");
  const [isOTPSubmitButtonLoading, setIsOTPSubmitButtonLoading] =
    useState(false);

  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage";
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    setShow(true);
    getData2();
    getData();
  }, []);

  const [form, setForm] = useState({
    eventImage: "",
    eventName: "",
    eventDesc: "",
    eventDate: new Date(Date.now() + 3600 * 1000 * 24),
    startTime: "",
    endTime: "",
    eventPlace: "",
    eventCapacity: "",
    costType: 2,
    eventPrice: "",
    cateId: "",
    creatorName: "",
    creatorPhone: "",
    creatorEmail: "",
    aboutCreator: "",
    termNCondition: "",
  });
  const getData2 = () => {
    {
      userData
        ? setForm({
            ...form,
            creatorName: userData.userName,
            creatorEmail: userData.emailId,
            creatorPhonesetAlertStartTime: userData.mobNum,
          })
        : console.log("");
    }
  };
  const { errors, validateForm, onBlurField } =
    useCreateEventFormValidator(form);

  const onUpdateField = (e) => {
    console.log(e);
    const field = e.target.name;
    let fieldValue = e.target.value;
    if (field === "startTime") {
      let Stmime = e.target.value;
      let time = Stmime.split(":");
      let a = isCorrectStartTime(time[0], time[1]);
      console.log(a);
      if (a == false) {
        setAlertStartTime("Start time must in between 10:00AM to 08:00PM.");
      } else setAlertStartTime("");
    } else if (field === "endTime") {
      let Stime = form.startTime.split(":");
      let Etime = e.target.value.split(":");
      let a = isCorrectEndTime(Stime[0], Stime[1], Etime[0], Etime[1]);
      if (a === false) {
        setAlertEndTime("End time must in greather than Start Time.");
      } else if (a === 401) {
        setAlertEndTime("End time must in less than 9:00 PM.");
      } else if (a === 402) {
        setAlertEndTime("End Time must be greater than one hour Start Date.");
      } else setAlertEndTime("");
    }
    if (e.target.name === "eventPrice") {
      if (form.costType == 2) {
        if (parseInt(e.target.value) > 0)
          setCurrentPerpersonFee(
            parseInt(e.target.value) + parseInt(createEventDoolallyFee)
          );
        else setCurrentPerpersonFee(0);
      } else {
        //fieldValue = 0;
        setCurrentPerpersonFee(0);
      }
    }

    if (e.target.name === "eventCapacity") {
      if (fieldValue == 0) setErmsge("please choose capacity");
      else setErmsge("");
    }
    if (e.target.name === "cateId") {
      const currSelectedCheckboxes = selectedCheckboxes;
      // Find index
      const findIdx = currSelectedCheckboxes.indexOf(fieldValue);
      // Index > -1 means that the item exists and that the checkbox is checked
      // and in that case we want to remove it from the array and uncheck it
      if (findIdx > -1) {
        currSelectedCheckboxes.splice(findIdx, 1);
      } else {
        currSelectedCheckboxes.push(parseInt(fieldValue));
      }
      setSelectedCheckboxes(currSelectedCheckboxes);
    }

    const nextFormState = { ...form, [field]: fieldValue };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
    if (e.target.id === "costType1") {
      document.getElementById("remove_when_clicked").style.display = "none";
    }
    if (e.target.id === "costType2") {
      document.getElementById("remove_when_clicked").style.display = "flex";
    }
  };

  const onUpdateSelectField = (selectedOption) => {
    const field = "eventPlace";
    const nextFormState = { ...form, [field]: selectedOption.value };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
  };

  const handleImageFile = (event) => {
    const field = "eventImage";
    const nextFormState = {
      ...form,
      [field]: URL.createObjectURL(event.target.files[0]),
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
    setEventImageDiv("image");
    setCurrEventImage(event.target.files[0]);
  };

  const removeImageFile = (event) => {
    const field = "eventImage";
    const nextFormState = { ...form, [field]: "" };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
    setEventImageDiv("button");
    setCurrEventImage("");
  };

  const onUpdateCurrentOTPField = (otpdata) => {
    setCurrUserOTP(otpdata.target.value);
  };

  const onSubmitForm = async (e) => {
    handleCrop();

    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    console.log(isValid);
    if (!isValid) return;
    const user = getUser();
    const userCurrLoc = getUserCurrLoc();
    setIsSubmitButtonLoading(true);
    const formData = new FormData();
    formData.append("eventThumbnail", currEventImage, currEventImage.name);
    formData.append("eventName", form.eventName);
    formData.append("eventDesc", form.eventDesc);
    //formData.append('eventDate', form.eventDate);
    formData.append("eventDate", eventDate);
    formData.append("startTime", form.startTime);
    formData.append("endTime", form.endTime);
    formData.append("eventPlace", form.eventPlace);
    formData.append("eventCapacity", form.eventCapacity);
    formData.append("costType", form.costType);
    formData.append("eventPrice", form.eventPrice);
    //formData.append('cateId', form.cateId);
    formData.append("cateId", selectedCheckboxes);
    formData.append("creatorName", form.creatorName);
    formData.append("creatorPhone", form.creatorPhone);
    formData.append("creatorEmail", form.creatorEmail);
    formData.append("aboutCreator", form.aboutCreator);
    formData.append("termNCondition", form.termNCondition);

    formData.append("userFrom", userFrom);
    formData.append("userId", user ? user.userId : "notlogin");
    formData.append("userIpAdress", userCurrLoc.IPv4);
    formData.append("doolallyFee", parseInt(createEventDoolallyFee));
    formData.append(
      "eventSlug",
      form.eventName
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "")
    );
    formData.append(
      "eventShareLink",
      eventShareBaseUrl +
        form.eventName
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "")
    );
    let result = await axios.post(
      apiBaseUrl + userCreateEventApiUrl,
      formData,
      multipartRequestOptions
    );

    if (result) {
      result = result.data;

      //console.log(result);
      if (result.statusCode === "success") {
        setUserSession(
          result.response.result.userToken,
          result.response.result.userData[0]
        );
        // alert(result.statusMessage); /dfug

        setShowModal(true);
        if (showModal == "false") {
          //window.location = '/';
          window.location = "/my-events";
        }
      } else {
        setErrorMsg(result.statusMessage);
      }
      setIsSubmitButtonLoading(false);
    }
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

          // Create an object of formData

          // Set the formData object

          //console.log(formData);

          // here Api call for Home page
        } else {
          setOTPErrorMsg(otpresult.statusMessage);
        }
        setIsOTPSubmitButtonLoading(false);
      }
    } catch (error) {
      setOTPErrorMsg("Error while create event. Try again later.");
    }
  };

  const getData = async () => {
    try {
      //setIsloading(true);
      // here Api call for Get Location and Category
      let result = await fetch(
        apiBaseUrl + userCreateEventPageApiUrl,
        getRequestOptions
      );
      if (result) {
        result = await result.json();
        // setMessage(result.statusMessage);
        console.log(result.statusMessage);
        setEventcategory(result.response.result.categoryData);
        setEventLocation(result.response.result.locationData);

        settwitterView(result.response.result.twitterView);
        setwhatsOnTap(result.response.result.whatsOnTap);
        setwhatHappingWeek(result.response.result.whatHappingWeek);
        setTestimonial(result.response.result.testimobial);

        //setTimeout(() => {setIsloading(false)}, 500);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
    setEventImageDiv("image");
    const field = "eventImage";
    const nextFormState = {
      ...form,
      [field]: URL.createObjectURL(event.target.files[0]),
    };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
    setEventImageDiv("image");
    setCurrEventImage(event.target.files[0]);
  };
  const [croppedImage, setCroppedImage] = useState(null);
  const handleCrop = () => {
    if (imageRef.current) {
      const cropper = new Cropper(imageRef.current, {
        aspectRatio: 1,
        viewMode: 1,
        minContainerWidth: imageRef.current.naturalWidth,
        minContainerHeight: imageRef.current.naturalHeight,
        ready: () => {
          cropper.getCroppedCanvas().toBlob((blob) => {
            setCroppedImage(blob);
          });
        },
      });
    }

    setCroppedImageSrc(cropperRef.current.getCroppedCanvas().toDataURL());
    setForm({
      ...form,
      eventImage: croppedImageSrc,
    });
  };
  const handleImageLoad = () => {
    cropperRef.current = new Cropper(imageRef.current, {
      aspectRatio: 4 / 3, // set aspect ratio to 4:3
      viewMode: 3,
      background:false,
      ready: () => {
        // cropper ready
      },
    });
  };

  const handleImageError = () => {
    console.error("Error loading image");
  };

  const getRoundedCanvas = (sourceCanvas) => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = "destination-in";
    context.beginPath();
    context.arc(
      width / 2,
      height / 2,
      Math.min(width, height) / 2,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
    return canvas;
  };

  // const handleCropClick = () => {
  //   const canvas = document.createElement('canvas');
  //   canvas.width = crop.width;
  //   canvas.height = crop.height;
  //   const ctx = canvas.getContext('2d');
  //   const imageObj = new Image();
  //   imageObj.src = form.eventImage;
  //   imageObj.onload = () => {
  //     const scaleX = imageObj.naturalWidth / imageObj.width;
  //     const scaleY = imageObj.naturalHeight / imageObj.height;
  //     const originX = crop.x * scaleX;
  //     const originY = crop.y * scaleY;
  //     const width = crop.width * scaleX;
  //     const height = crop.height * scaleY;
  //     ctx.drawImage(imageObj, originX, originY, width, height, 0, 0, crop.width, crop.height);
  //     const croppedImage = canvas.toDataURL('image/png');
  //     console.log(croppedImage);

  //     // Update the form state with the cropped image URL
  //     setForm({
  //       ...form,
  //       eventImage: croppedImage,
  //     });
  //   };
  // };


  return (
    <>
      {/* <img src={form.eventImage}/> */}
      <div className="container-fluid">
        {/* {isloading &&  <LoadingSpinner /> } */}
        <Header />
        <section className="d_main_panel">
          <div className="container-fluid">
            <div className="row g-5">
              <div className="col-lg-3">
                <div
                  className="d_left_panal box_padding gray_bg_color"
                  id="CE-gallery"
                >
                  <div className="d_title_box">
                    <h5 className="d_main_title">Peek into our past events </h5>
                  </div>

                  <Photos />
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className=" d_midile_panal gray_bg_color">
                  <div className="location-section ">
                    <div className="d-flex justify-content-around pt-3">
                      <div className="adj-location">
                        <a href={"/attending"}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/attend-an-event.png"
                            }
                          />
                          <h5>Your events</h5>
                        </a>
                      </div>
                      <div className="adj-location" id="circle-effect">
                        <a href={"/create-event"}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/images/book-a-private-party.png"
                            }
                          />
                          <h5>Organise</h5>
                        </a>
                      </div>
                      <div className="adj-location">
                        <a href={"/create-private-event"}>
                          <img
                            src={
                              process.env.PUBLIC_URL + "/images/location.png"
                            }
                          />
                          <h5>Book a private event</h5>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className=" box_padding gray_bg_color"
                  style={{ marginTop: "-18px" }}
                >
                  <form className={styles.form}>
                    {" "}
                    {/*onSubmit={onSubmitForm}> */}
                    <div className="d_title_box">
                      <p className="d_main_sub_title">
                        Create your event <span className="d_line"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
                        <Button
                          className="d_comn_btn"
                          variant="secondary"
                          onClick={handleShow}
                          style={{ float: "right", fontSize: "13px" }}
                        >
                          Read Event Guidelines
                        </Button>
                      </p>
                      <p
                        className="p_gray"
                        style={{ marginTop: "7px", fontSize: "1rem" }}
                      >
                        To organise an event, please read the event guidelines
                        and then fill up the form.
                      </p>
                    </div>
                    <div className="d_upload_img pb-4">
                      <div className="file-upload">
                        {eventImageDiv == "button" && (
                          <div className="image-upload-wrap">
                            <input
                              className="file-upload-input"
                              type="file"
                              name="eventImage"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                            <div className="drag-text">
                              <CameraAltOutlinedIcon id="camera" />
                              <p className="p_gray poppins">
                                Add a cover photo
                              </p>
                              <p className="img_dimen poppins">
                                {" "}
                                Max Image Dimensions 1200x1200 pixels
                              </p>
                            </div>
                          </div>
                        )}
                        {eventImageDiv == "image" && (
                          <div
                            className="file-upload-content"
                            style={{
                              display: "block",

                              margin: "0 auto",
                            }}
                            show={show}
                          >
                            {imageSrc && (
                              <img
                                ref={imageRef}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                src={form.eventImage}
                                alt="Uploaded Picture"
                              />
                            )}

                            <div className="image-title-wrap">
                              <button
                                type="button"
                                className="remove-image"
                                onClick={removeImageFile}
                              >
                                <span className="image-title">✖ </span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      {errors.eventImage.dirty && errors.eventImage.error ? (
                        <p className={styles.formFieldErrorMessage}>
                          {errors.eventImage.message}
                        </p>
                      ) : null}
                    </div>
                    <div className="d_create_event_form">
                      <div className="row g-3 poppins">
                        <div className="col-md-12">
                          <label>Name of event</label>
                          <div className="form-group">
                            <input
                              className={clsx(
                                styles.formField,
                                errors.eventName.dirty &&
                                  errors.eventName.error &&
                                  styles.formFieldError
                              )}
                              type="text"
                              aria-label="Name of event"
                              name="eventName"
                              placeholder="Name of event"
                              value={form.eventName}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                            />
                            {errors.eventName.dirty &&
                            errors.eventName.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventName.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label>Describe your Event</label>
                          <div className="form-gro ">
                            {/* <GoogleInput
        id="example-textarea"
        name="eventDesc"
        language="hi"
        onChange={onUpdateField}
        value={form.eventDesc}
        onBlur={onBlurField}
      > */}
                            <textarea
                              className={clsx(
                                styles.formFieldTextarea,
                                errors.eventDesc.dirty &&
                                  errors.eventDesc.error &&
                                  styles.formFieldError
                              )}
                              aria-label="Describe your event"
                              name="eventDesc"
                              rows="3"
                              placeholder="Describe your event"
                              value={form.eventDesc}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                            />
                            {/* </GoogleInput> */}
                            {errors.eventDesc.dirty &&
                            errors.eventDesc.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventDesc.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <label>Event Date</label>
                          <div className="form-group">
                            <DatePicker
                              name="eventDate"
                              dateFormat="dd-MM-yyyy"
                              minDate={new Date(Date.now() + 3600 * 1000 * 24)}
                              selected={eventDate}
                              value={form.eventDate}
                              onChange={(date) => setEventDate(date)}
                              onBlur={onBlurField}
                              className={clsx(
                                styles.formField,
                                errors.eventDate.dirty &&
                                  errors.eventDate.error &&
                                  styles.formFieldError
                              )}
                              placeholder="Date of Event"
                              aria-label="Date of Event"
                            />
                            {errors.eventDate.dirty &&
                            errors.eventDate.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventDate.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>Start Time</label>
                          <div className="form-group">
                            <TextField
                              className={clsx(
                                styles.formField,
                                errors.startTime.dirty &&
                                  errors.startTime.error &&
                                  styles.formFieldError
                              )}
                              name="startTime"
                              label="."
                              type="time"
                              defaultValue={form.startTime}
                              InputLabelProps={{
                                shrink: false,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                              sx={{ width: "100%" }}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                            />
                            {errors.startTime.dirty &&
                            errors.startTime.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.startTime.message}
                              </p>
                            ) : null}
                            <span style={{ color: "red", fontSize: "15px" }}>
                              {alertStartTime == "" ? "" : alertStartTime}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>End Time</label>
                          <div className="form-group">
                            {/* <input
                                                            className={clsx(
                                                                styles.formField,
                                                                errors.endTime.dirty && errors.endTime.error && styles.formFieldError
                                                            )}
                                                            type="text"
                                                            aria-label="End Time"
                                                            name="endTime"
                                                            placeholder="End Time"
                                                            value={form.endTime}
                                                            onChange={onUpdateField}
                                                            onBlur={onBlurField}
                                                            />
                                                            {errors.endTime.dirty && errors.endTime.error ? (
                                                                <p className={styles.formFieldErrorMessage}>{errors.endTime.message}</p>
                                                            ) : null} */}
                            <TextField
                              className={clsx(
                                styles.formField,
                                errors.endTime.dirty &&
                                  errors.endTime.error &&
                                  styles.formFieldError
                              )}
                              name="endTime"
                              label="."
                              type="time"
                              defaultValue={form.endTime}
                              InputLabelProps={{
                                shrink: false,
                              }}
                              inputProps={{
                                step: 300, // 5 min
                              }}
                              sx={{ width: "100%" }}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                            />
                            {errors.endTime.dirty && errors.endTime.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.endTime.message}
                              </p>
                            ) : null}
                          </div>
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {alertEndTime == "" ? "" : alertEndTime}
                          </span>
                        </div>
                        <div className="col-md-6">
                          <label>Event Place</label>
                          <div className="form-group">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              //defaultValue={eventLocation[0]}
                              name="eventPlace"
                              options={eventLocation}
                              onChange={onUpdateSelectField}
                              //onBlur={onBlurField}
                            />
                            {errors.eventPlace.dirty &&
                            errors.eventPlace.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventPlace.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>Event Capacity</label>
                          <div className="form-group">
                            <input
                              className={clsx(
                                styles.formField,
                                errors.eventCapacity.dirty &&
                                  errors.eventCapacity.error &&
                                  styles.formFieldError
                              )}
                              type="number"
                              aria-label="Event Capacity"
                              name="eventCapacity"
                              placeholder="Event Capacity"
                              value={form.eventCapacity}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              min="1"
                              style={{ height: "38.9px" }}
                            />
                            {ermsge ? (
                              <p style={{ color: "red", marginLeft: "2%" }}>
                                {ermsge}
                              </p>
                            ) : (
                              ""
                            )}
                            {errors.eventCapacity.dirty &&
                            errors.eventCapacity.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventCapacity.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h3 className="d_main_title">
                            Is the event Free or Paid?
                          </h3>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6">
                          <label
                            className="d_custome_raido"
                            htmlFor="costType2"
                          >
                            {" "}
                            <span className="d_paid monster">Paid</span>
                            <input
                              type="radio"
                              name="costType"
                              id="costType2"
                              value="2"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.costType == 2}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <p className="p_gray">
                            Cover charge of Rs 300 is fully redeemable for food
                            & beverages
                          </p>
                        </div>
                        <div className="col-md-6">
                          <label
                            className="d_custome_raido"
                            htmlFor="costType1"
                          >
                            {" "}
                            <span className="d_paid monster">Free</span>
                            <input
                              type="radio"
                              name="costType"
                              id="costType1"
                              value="1"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.costType == 1}
                            />
                            <span className="checkmark"></span>
                          </label>
                          <p className="p_gray">
                            If you don't charge, we don't charge.
                          </p>
                        </div>
                        <div className="row " id="remove_when_clicked">
                          <div className="col-md-6" style={{ marginTop: "" }}>
                            {" "}
                            <label>Event Fees</label>
                            <div className="form-group poppins">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.eventPrice.dirty &&
                                    errors.eventPrice.error &&
                                    styles.formFieldError
                                )}
                                type="number"
                                aria-label="Event Fees"
                                name="eventPrice"
                                placeholder="Event Fees"
                                value={form.eventPrice}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.eventPrice.dirty &&
                              errors.eventPrice.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.eventPrice.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div
                            className="col-md-6"
                            style={{ marginTop: "17px" }}
                          >
                            <p className="p_gray">
                              ( + Rs 300 Doolally Fee) Total Price:<br></br> Rs.{" "}
                              {currentPerpersonFee}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h3 className="d_main_title">
                            Choose a few categories that best represent your
                            event's genre
                          </h3>
                        </div>
                      </div>
                      <div className="d_event_list">
                        {eventcategory.map((item, index) => (
                          <div className="form_check_box poppins">
                            <label
                              className="form_check_box_label"
                              key={item.cateId}
                            >
                              {item.cateName}
                              <input
                                type="checkbox"
                                name="cateId"
                                value={item.cateId}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                                // checked={form.cateId == item.cateId}
                                selected={selectedCheckboxes.includes(
                                  item.cateId
                                )}
                              />
                              <span className="checkmark"></span>
                            </label>
                          </div>
                        ))}
                        {errors.cateId.dirty && errors.cateId.error ? (
                          <p className={styles.formFieldErrorMessage}>
                            {errors.cateId.message}
                          </p>
                        ) : null}
                      </div>
                      <div className="d_free_or_paid">
                        <h3 className="d_main_title">Personal Details</h3>
                        {/* </div> */}
                      </div>
                      <div className="d_create_event_form">
                        <div className="row g-3">
                          <div className="col-md-12 poppins">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.creatorName.dirty &&
                                    errors.creatorName.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="Your name"
                                name="creatorName"
                                placeholder="Your full name"
                                value={form.creatorName}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.creatorName.dirty &&
                              errors.creatorName.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.creatorName.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-12 poppins">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.creatorPhone.dirty &&
                                    errors.creatorPhone.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="Phone number"
                                name="creatorPhone"
                                placeholder="Mobile number"
                                value={form.creatorPhone}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.creatorPhone.dirty &&
                              errors.creatorPhone.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.creatorPhone.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-12 poppins">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.creatorEmail.dirty &&
                                    errors.creatorEmail.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="Email id"
                                name="creatorEmail"
                                placeholder="Email id"
                                value={form.creatorEmail}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.creatorEmail.dirty &&
                              errors.creatorEmail.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.creatorEmail.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-12 poppins">
                            {/* tell something about yourself  */}
                            {/* <div className="form-grou">
                              <textarea
                                className={clsx(
                                  styles.formFieldTextarea,
                                  errors.aboutCreator.dirty &&
                                    errors.aboutCreator.error &&
                                    styles.formFieldError
                                )}
                                aria-label="Something about yourself (Optional)"
                                name="aboutCreator"
                                rows="3"
                                placeholder="Something about yourself (Optional)"
                                value={form.aboutCreator}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.aboutCreator.dirty &&
                              errors.aboutCreator.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.aboutCreator.message}
                                </p>
                              ) : null}
                            </div> */}
                            <p className="p_gray poppins mb-md-4 mb-3">
                              All events are reviewed and approved by Doolally.
                              You'll receive an email from us with more details.
                            </p>
                            <div className="form_check_box poppins">
                              <label
                                className="form_check_box_label"
                                htmlFor="termNCondition"
                              >
                                <input
                                  type="checkbox"
                                  name="termNCondition"
                                  id="termNCondition"
                                  value="Yes"
                                  onChange={onUpdateField}
                                  onBlur={onBlurField}
                                  // checked={form.termNCondition == "Yes"}
                                  selected={selectedCheckboxes.includes(
                                    (form.termNCondition = "yes")
                                  )}
                                />
                                <span
                                  className="checkmark"
                                  style={{ marginTop: "7px" }}
                                ></span>
                                I have read and agree to the
                                <Button
                                  variant="link"
                                  onClick={handleShow}
                                  style={{
                                    textDecoration: "none",
                                    color: "#A2C760",
                                    marginTop: "-3px",
                                    marginLeft: "-5px",
                                  }}
                                >
                                  event guidelines.
                                </Button>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12 text-center">
                            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                            {/* <button className="d_comn_btn d-block d-md-inline-block">{isSubmitButtonLoading ? 'Loading...' : 'Submit Event'}</button> */}
                            <a
                              href="javascript:void(0);"
                              className="d_comn_btn d-block d-md-inline-block"
                              onClick={onSubmitForm}
                            >
                              {isSubmitButtonLoading
                                ? "Loading..."
                                : "Submit Event"}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-3">
                <div
                  className="d_right_panal box_padding whatHappingWeek"
                  style={{ height: "500px" }}
                >
                  <div className="d_title_box">
                    <h5 className="d_main_title">What's Happening This Week</h5>
                    <p className="d_main_sub_title">
                      Day Plan
                      <span className="d_line"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                      <span className="d_round"></span>
                    </p>
                  </div>
                  {whatHappingWeek.map((item, id) => (
                    <div className="d_days_box mb-4">
                      {item.eventDate && (
                        <h3 className="d_days_title">
                          {format(new Date(item.eventDate), "iiii")}
                        </h3>
                      )}
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <Link
                              to={
                                "/event-details/" +
                                item.eventSlugs +
                                "__" +
                                item.eventIds
                              }
                            >
                              <img
                                src={showCorrectImage(item.eventImage, "w_80")}
                                alt=""
                              />
                            </Link>
                          </figure>
                        </div>
                        <Link
                          to={
                            "/event-details/" +
                            item.eventSlugs +
                            "__" +
                            item.eventIds
                          }
                        >
                          <p className="d_days_subtitle ">{item.eventNames}</p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" d_main_panel_review ">
                  <div className="d_right_panal box_padding">
                    <div className="d_title_box">
                      <h5 className="d_main_title">Recommendations</h5>
                      <p className="d_main_sub_title">
                        What Our Happy Client Says
                        <span className="d_line"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
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
        <Modal show={show} onHide={handleClose}>
          <Modal.Body>
            <TermNCondition />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
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

                  <div className="form-group mt-3">
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
            <Button className="btn-secondary" onClick={onCheckVerificationOTP}>
              {isOTPSubmitButtonLoading ? "Loading..." : "Verify"}
            </Button>
          </Modal.Footer>
        </Modal>

        {/* modal for let you go to my event edit page */}
        <Modal
          show={showModal}
          onHide={handleCloseModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header></Modal.Header>
          <Modal.Body>
            Thank you for creating an event, we have sent you a confirmation
            email, please check for event status in My Event section
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </Modal.Footer>
        </Modal>

        <Footer />
      </div>
    </>
  );
};

export default CreateEvent;
