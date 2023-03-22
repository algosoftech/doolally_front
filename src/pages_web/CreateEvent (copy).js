import React, { useState, useEffect } from "react";
import axios from "axios";
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
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import TwitterIcon from "@material-ui/icons/Twitter";
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
} from "../config/constant";
import {
  setUserCurrLoc,
  getUserCurrLoc,
  setUserSession,
  getUser,
  getToken,
} from "../utils/UserAuthenticate";
import { showCorrectImage, numberWithCommas } from "../utils/Common";

const CreateEvent = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [eventcategory, setEventcategory] = useState([]);
  const [eventLocation, setEventLocation] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [eventDate, setEventDate] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPerpersonFee, setCurrentPerpersonFee] = useState(0);
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

  const [eventImageDiv, setEventImageDiv] = useState("button");
  const [currEventImage, setCurrEventImage] = useState("");

  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

  const [timeValue, onChange] = useState("10:00");
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

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

  const { errors, validateForm, onBlurField } =
    useCreateEventFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    let fieldValue = e.target.value;
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    console.log(isValid);
    if (!isValid) return;
    const user = getUser();
    const userCurrLoc = getUserCurrLoc();

    // Create an object of formData
    const formData = new FormData();

    // Set the formData object
    formData.append("eventThumbnail", currEventImage, currEventImage.name);

    formData.append("eventName", form.eventName);
    formData.append("eventDesc", form.eventDesc);
    formData.append("eventDate", form.eventDate);
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
    //console.log(formData);
    try {
      setIsSubmitButtonLoading(true);
      // here Api call for Home page
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
          alert(result.statusMessage);
          //window.location = '/';
          window.location = "/my-events";
        } else {
          setErrorMsg(result.statusMessage);
        }
        setIsSubmitButtonLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error while create event. Try again later.");
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

  return (
    <>
      <div className="container-fluid">
        {/* {isloading &&  <LoadingSpinner /> } */}
        <Header />
        <section className="d_main_panel">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 mb-4">
                <div className="d_left_panal box_padding gray_bg_color">
                  <div className="d_title_box"></div>
                  {/* # Tag section  */}
                  <div>
                    <div
                      className="card"
                      style={{ padding: "3%", marginBottom: "5%" }}
                    >
                      <div className=" d-flex">
                        <img
                          src={process.env.PUBLIC_URL + "/images/lgo.jpg"}
                          style={{ marginTop: "-7px" }}
                        />
                        <span>
                          <p className="mt-2">@godoolally </p>
                        </span>
                        <TwitterIcon id="t-icon" />
                      </div>
                      <p>
                        Our taps are pouring at the Andheri and Khar taprooms
                        for dine in
                      </p>
                    </div>
                    <div
                      className="card"
                      style={{ padding: "3%", marginBottom: "5%" }}
                    >
                      <div className=" d-flex">
                        <img
                          src={process.env.PUBLIC_URL + "/images/lgo.jpg"}
                          style={{ marginTop: "-7px" }}
                        />
                        <span>
                          <p className="mt-2">@godoolally </p>
                        </span>
                        <TwitterIcon id="t-icon" />
                      </div>
                      <p>
                        Our taps are pouring at the Andheri and Khar taprooms
                        for dine in
                      </p>
                    </div>
                  </div>
                  <h3 className="d_main_title">What's On Tap </h3>
                  <p className="d_main_sub_title">
                    Beer Products
                    <span className="d_line"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                    <span className="d_round"></span>
                  </p>
                  <div className="row gy-2 gx-4">
                    {whatsOnTap.slice(0, 6).map((item, index) => (
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
                  <div className="location-section ">
                    <div className="d-flex justify-content-around pt-3">
                      <div className="adj-location">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/images/attend-an-event.png"
                          }
                        />
                        <h5>Attend</h5>
                      </div>
                      <div className="adj-location">
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
                <div className=" box_padding gray_bg_color">
                  <form className={styles.form}>
                    {" "}
                    {/*onSubmit={onSubmitForm}> */}
                    <div className="d_title_box">
                      <p className="d_main_sub_title">
                        Create an event <span className="d_line"></span>
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
                        className="p_gray poppins"
                        style={{ marginTop: "7px" }}
                      >
                        To organise an event, please read the event guidelines
                        and then fill up the form.
                      </p>
                    </div>
                    <div className="d_upload_img">
                      <div className="file-upload">
                        {eventImageDiv == "button" && (
                          <div className="image-upload-wrap">
                            <input
                              className="file-upload-input"
                              type="file"
                              name="eventImage"
                              accept="image/*"
                              onChange={handleImageFile}
                            />
                            <div className="drag-text">
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  "/images/icons/upload_camera.svg"
                                }
                                alt=""
                              />
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
                              width: "400px",
                              margin: "0 auto",
                            }}
                            show={show}
                          >
                            <img
                              className="file-upload-image"
                              src={form.eventImage}
                              alt="your events"
                              width={"200px"}
                            />
                            <div className="image-title-wrap">
                              <button
                                type="button"
                                className="remove-image"
                                onClick={removeImageFile}
                              >
                                <span className="image-title">
                                  Remove Image
                                </span>
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
                          <div className="form-gro  pt-3">
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
                            {/* <input
                                                            className={clsx(
                                                                styles.formField,
                                                                errors.startTime.dirty && errors.startTime.error && styles.formFieldError
                                                            )}
                                                            type="text"
                                                            aria-label="Start Time"
                                                            name="startTime"
                                                            placeholder="Start Time"
                                                            value={form.startTime}
                                                            onChange={onUpdateField}
                                                            onBlur={onBlurField}
                                                            />
                                                            {errors.startTime.dirty && errors.startTime.error ? (
                                                                <p className={styles.formFieldErrorMessage}>{errors.startTime.message}</p>
                                                            ) : null} */}
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
                            />
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
                            Is the event Free or Paid or Private?
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
                            For paid events, we charge an additional Rs 300 per
                            attendee which includes a pint or house fries.
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
                        <div className="col-md-6">
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
                        <div className="col-md-6 d-flex align-items-center">
                          <p className="p_gray">
                            ( + Rs 300 Doolally Fee) Total Price:<br></br> Rs.{" "}
                            {currentPerpersonFee}
                          </p>
                        </div>
                      </div>
                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h3 className="d_main_title">Chose Category</h3>
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
                        <div className="d_title_box">
                          <h3 className="d_main_title">Personal Details</h3>
                        </div>
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
                                placeholder="Your name"
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
                                placeholder="Phone number"
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
                            <div className="form-grou">
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
                            </div>
                            <p className="p_gray poppins mt-md-4 mt-3 mb-md-4 mb-3">
                              All events are reviewed and approved by Doolally.
                              Once approved, we will create an Instamojo payment
                              link and accept payments on your behalf.
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
                                  checked={form.termNCondition == "Yes"}
                                />
                                <span
                                  className="checkmark"
                                  style={{ marginTop: "9px" }}
                                ></span>
                                I have read and agree to the
                                <Button
                                  variant="link"
                                  onClick={handleShow}
                                  style={{
                                    textDecoration: "none",
                                    color: "#A2C760",
                                  }}
                                >
                                  Event Guidelines.
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
                <div className="d_right_panal box_padding">
                  <div className="d_title_box">
                    <h3 className="d_main_title">What's Happening This Week</h3>
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
                      <h3 className="d_days_title">
                        {format(new Date(item.eventDate), "iiii")}
                      </h3>
                      <div className="d_days_iner_box mb-3">
                        <div>
                          <figure className="mb-0">
                            <a href={"/event-details/" + item.eventSlugs}>
                              <img
                                src={showCorrectImage(item.eventImage, "w_80")}
                                alt=""
                              />
                            </a>
                          </figure>
                        </div>
                        <a href={"/event-details/" + item.eventSlugs}>
                          <p className="d_days_subtitle poppins">
                            {item.eventNames}
                          </p>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className=" d_main_panel_review ">
                  <div className="d_right_panal box_padding">
                    <div className="d_title_box">
                      <h3 className="d_main_title">Recommendations</h3>
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
        <Footer />
      </div>
    </>
  );
};

export default CreateEvent;
