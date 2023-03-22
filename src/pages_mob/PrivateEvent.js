import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Photos from "../Photos";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Review from "../Sliders/Review";
import Select from "react-select";
import DatePicker from "react-datepicker";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import TermNCondition from "../components/TermNConditionWeb";
import Helper from "../utils/Helper";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import ShareSharpIcon from "@material-ui/icons/ShareSharp";
import TwitterIcon from "@material-ui/icons/Twitter";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import NavLink from "react-bootstrap/esm/NavLink";
import { format, isValid } from "date-fns";
import styles from "../components/validators/createvent/CreateEventForm.module.css";
import { useCreatePrivateEventFormValidator } from "../components/validators/createvent/useCreatePrivateEventFormValidator";

import {
  getRequestOptions,
  postRequestOptions,
  multipartRequestOptions,
  apiBaseUrl,
  fBDImageBaseUrl,
  userCreatePrivateEventPageApiUrl,
  userCreatePrivateEventApiUrl,
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
import { showCorrectImage, numberWithCommas ,isCorrectStartTime,isCorrectEndTime} from "../utils/Common";

const CreateEvent = () => {
  const userData = getUser();
  const [alertStartTime,setAlertStartTime]=useState("");
const [alertEndTime,setAlertEndTime]=useState("");
  //  alert message in popup modal
  const [value, setValue] = React.useState(dayjs("10:00"));
  const [value2, setValue2] = React.useState(dayjs(""));
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
    window.location = "/";
  };
  const handleShowModal = () => setShowModal(true);
  const [message, setMessage] = useState();

  const [showModal2, setShowModal2] = useState(true);
  const handleCloseModal2 = () => setShowModal2(false);

  // end alert

  const [eventcategory, setEventcategory] = useState([]);
  const [eventLocation, setEventLocation] = useState([]);
  const [currentLocationSeats, setCurrentLocationSeats] = useState(" ");
  const [isloading, setIsloading] = useState(false);
  const [eventDate, setEventDate] = useState(
    new Date(Date.now() + 3600 * 1000 * 24)
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

  const [twitterView, settwitterView] = useState([]);
  const [whatsOnTap, setwhatsOnTap] = useState([]);
  const [whatHappingWeek, setwhatHappingWeek] = useState([]);
  const [testimonial, setTestimonial] = useState([]);

  const [showInfastructure, setShowInfastructure] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
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
    getData2();
    getData();
  }, []);

  const [form, setForm] = useState({
    taproom: "",
    eventcapacity: "",
    eventDate: new Date(Date.now() + 3600 * 1000 * 24),
    infrastructure: "Exclusive Space",
    foodpackage: "fnb package",
    activity: "NO",
    activityCheck: selectedCheckboxes,
    userName: "",
    userEmail: "",
    userMobile: "",
  });

  const getData2 = () => {

    {userData?(setForm({...form,userName:userData.userName ,  userEmail:userData.emailId,userMobile:userData.mobNum
    })): console.log("")}

  }
  const { errors, validateForm, onBlurField } =
    useCreatePrivateEventFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    let fieldValue = e.target.value;

    //   // Index > -1 means that the item exists and that the checkbox is checked
    //   // and in that case we want to remove it from the array and uncheck it
    if(field === "startTime"){
      let Stmime = e.target.value; 
      let time = Stmime.split(':');
      let a = isCorrectStartTime(time[0],time[1]);
      console.log(a);
      if(a == false){
        setAlertStartTime('Start time must in between 10:00AM to 08:00PM.');
      }else setAlertStartTime("")
    } else if(field === "endTime"){
      let Stime = form.startTime.split(':');
      let Etime = e.target.value.split(':');
      let a = isCorrectEndTime(Stime[0],Stime[1],Etime[0],Etime[1]);
      if(a === false){
        setAlertEndTime('End time must in greather than Start Time.');
      } else if( a === 401){
        setAlertEndTime('End time must in less than 9:00 PM.')
      } else if( a === 402){
        setAlertEndTime('End Time must be greater than one hour Start Date.')
      } else setAlertEndTime("")
    }
    if (e.target.name == "activityCheck") {
      const currSelectedCheckboxes = selectedCheckboxes;
      const findIdx = currSelectedCheckboxes.indexOf(fieldValue);
      if (findIdx > -1) {
        currSelectedCheckboxes.splice(findIdx, 1);
      } else {
        currSelectedCheckboxes.push(fieldValue);
      }
      setSelectedCheckboxes(currSelectedCheckboxes);
    }
    const nextFormState = { ...form, [field]: fieldValue };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });

    if (e.target.name == "activity") {
      if (e.target.value == "YES") {
        setShowActivity(true);
      } else {
        setShowActivity(false);
      }
    }
  };

  const onUpdateSelectField = (selectedOption) => {
    const field = "taproom";
    const nextFormState = { ...form, [field]: selectedOption.value };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });

    if (selectedOption.value == 2) {
      setCurrentLocationSeats("Seats 30 Only");
      setShowInfastructure(false);
    } else if (selectedOption.value == 3) {
      setCurrentLocationSeats("Seats 30 Only");
      setShowInfastructure(false);
    } else if (selectedOption.value == 5) {
      setCurrentLocationSeats("Seats 120 Only");
      setShowInfastructure(true);
    } else if (selectedOption.value == 6) {
      setCurrentLocationSeats("Seats 50 Only");
      setShowInfastructure(false);
    } else {
      setCurrentLocationSeats("Seats 30 Only");
      setShowInfastructure(false);
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    const user = getUser();
    const userCurrLoc = getUserCurrLoc();

    // Create an object of formData
    const formData = new FormData();

    // Set the formData object

    formData.append("taproom", form.taproom);
    formData.append("eventcapacity", form.eventcapacity);
    //formData.append('eventDate', form.eventDate);
    formData.append("eventDate", eventDate);
    formData.append("infrastructure", form.infrastructure);
    formData.append("foodpackage", form.foodpackage);
    formData.append("activity", form.activity);
    formData.append("activityCheck", form.activityCheck);
    formData.append("userName", form.userName);
    formData.append("userEmail", form.userEmail);
    formData.append("userMobile", form.userMobile);

    formData.append("userFrom", userFrom);
    formData.append("userId", user ? user.userId : "notlogin");
    formData.append("userIpAdress", userCurrLoc.IPv4);

    try {
      setIsSubmitButtonLoading(true);
      // here Api call for Home page
      let result = await axios.post(
        apiBaseUrl + userCreatePrivateEventApiUrl,
        formData,
        multipartRequestOptions
      );
      if (result) {
        result = result.data;
        //console.log(result);
        if (result.statusCode === "success") {
          // alert(result.statusMessage);
          setShowModal(true);
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
        apiBaseUrl + userCreatePrivateEventPageApiUrl,
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
     
      <div className="container-fluid"         style={{ marginTop: "90px" , marginBottom:"70px" }}>
      <Header />
      
        <div
                  className=" box_padding gray_bg_color"
         
                >
                  <form className={styles.form} onSubmit={onSubmitForm}>
                    <div className="d_title_box">
                      <p className="d_main_sub_title">
                        Private Event <span className="d_line"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
                      </p>
                      <p
                        className="p_gray poppins"
                        style={{ fontSize: "1rem" }}
                      >
                        Which Doolally Taproom would you like to plan your next
                        private event?{" "}
                      </p>
                    </div>
                    <div
                      className=" "
              
                    >
                      <div className="row g-3 poppins">
                        <div className="col-md-6">
                          <label>Event Place</label>
                          <div className="form-roup">
                            <Select
                              className="basic-single"
                              classNamePrefix="select"
                              //defaultValue={eventLocation[0]}
                              name="taproom"
                              options={eventLocation}
                              onChange={onUpdateSelectField}
                              //onBlur={onBlurField}
                            />
                            {errors.taproom.dirty && errors.taproom.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.taproom.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                          <p
                            style={{
                  marginTop:"-10px",
                              color: "green",
                              fontSize: "14px",
                              marginLeft:"2%"
                            }}
                          >
                            {currentLocationSeats}
                          </p>
                        </div>
                        <div className="col-11" style={{marginTop:"-2%"}}>
                          <label>How many people are you expecting?</label>
                          <div className="form-group">
                            <input
                              className={clsx(
                                styles.formField,
                                errors.eventcapacity.dirty &&
                                  errors.eventcapacity.error &&
                                  styles.formFieldError
                              )}
                              type="number"
                              aria-label="Event Capacity"
                              name="eventcapacity"
                              placeholder="Approx no. of people"
                              value={form.eventcapacity}
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                            />
                            {errors.eventcapacity.dirty &&
                            errors.eventcapacity.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.eventcapacity.message}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-11">
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
                          <div className="form-roup">
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
                            {/* {errors.startTime.dirty &&
                            errors.startTime.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.startTime.message}
                              </p>
                            ) : null} */}
<span style={{color:"red", fontSize:"15px"}}>
                            {alertStartTime==""?"":alertStartTime}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>End Time</label>
                          <div className="form-goup">
                        
                            <TextField
                              // className={clsx(
                              //   styles.formField,
                              //   errors.endTime.dirty &&
                              //     errors.endTime.error &&
                              //     styles.formFieldError
                              // )}
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
                            {/* {errors.endTime.dirty && errors.endTime.error ? (
                              <p className={styles.formFieldErrorMessage}>
                                {errors.endTime.message}
                              </p>
                            ) : null} */}
                            
                          </div>
                          <span style={{color:"red", fontSize:"15px"}}>
                            {alertEndTime==""?"":alertEndTime}
                            </span>
                        </div>
                      </div>

                      {/* {showInfastructure ? ( */}
                        <>
                          <div className="d_free_or_paid">
                            <div className="d_title_box">
                              <h3 className="d_main_title" style={{fontWeight:"500", fontSize:"16px"}}>
                                What infrastructure do you need for your private
                                event?
                              </h3>
                            </div>
                          </div>
                          <div
                            className="row g-2 d_event_list mt-1"
                            style={{ marginTop: "-17px" }}
                          >
                            <div className="col-md-3 form_check_box">
                              <label className="form_check_box_label">
                                {" "}
                                <span className="d_paid monster">
                                  Exclusive Space
                                </span>
                                <input
                                  type="checkbox"
                                  name="infrastructure"
                                  value="Exclusive Space"
                                  onChange={onUpdateField}
                                  onBlur={onBlurField}
                                  checked={
                                    form.infrastructure == "Exclusive Space"
                                  }
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                            <div className="col-md-3 form_check_box">
                              <label className="form_check_box_label">
                                {" "}
                                <span className="d_paid monster">
                                  Projector
                                </span>
                                <input
                                  type="checkbox"
                                  name="infrastructure"
                                  value="Projector"
                                  onChange={onUpdateField}
                                  onBlur={onBlurField}
                                  checked={form.infrastructure == "Projector"}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                            <div className="col-md-3 form_check_box">
                              <label className="form_check_box_label">
                                {" "}
                                <span className="d_paid monster">Mic</span>
                                <input
                                  type="checkbox"
                                  name="infrastructure"
                                  value="Mic & Sound"
                                  onChange={onUpdateField}
                                  onBlur={onBlurField}
                                  checked={form.infrastructure == "Mic & Sound"}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                            <div className="col-md-3 form_check_box">
                              <label className="form_check_box_label">
                                {" "}
                                <span className="d_paid monster">None</span>
                                <input
                                  type="checkbox"
                                  name="infrastructure"
                                  value="none"
                                  onChange={onUpdateField}
                                  checked={form.infrastructure == "none"}
                                />
                                <span className="checkmark"></span>
                              </label>
                            </div>
                          </div>
                        </>
                      {/* ) : null} */}

                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h6 className="d_main_titl">
                            Would you need an F&B package?
                          </h6>
                        </div>
                      </div>
                      <div className="row g-1">
                        <div className="col-md-6">
                          <label className="d_custome_raido">
                            {" "}
                            <span className="d_paid monster">Yes</span>
                            <input
                              type="radio"
                              name="foodpackage"
                              value="fnb package"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.foodpackage == "fnb package"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="d_custome_raido">
                            {" "}
                            <span className="d_paid monster">
                              I'll order à la carte
                            </span>
                            <input
                              type="radio"
                              name="foodpackage"
                              value="ala carte"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.foodpackage == "ala carte"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                      </div>
                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h6 className="d_main_titl">
                            Entertainment & Activity - Looking to include a fun
                            and entertaining activity?
                          </h6>
                        </div>
                      </div>
                      <div className="row g-1">

                      <div className="col-md-6">
                          <label className="d_custome_raido">
                            {" "}
                            <span className="d_paid monster">
                              Show me the activities
                            </span>
                            <input
                              type="radio"
                              name="activity"
                              value="YES"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.activity == "YES"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="d_custome_raido">
                            {" "}
                            <span className="d_paid monster">
                              {" "}
                              Board Games are fine
                            </span>
                            <input
                              type="radio"
                              name="activity"
                              value="NO"
                              onChange={onUpdateField}
                              onBlur={onBlurField}
                              checked={form.activity == "NO"}
                            />
                            <span className="checkmark"></span>
                          </label>
                        </div>
                       
                      </div>

                      {showActivity ? (
                        <>
                          <div className="d_create_event_form">
                            <div className="row g-3">
                              <div className="col-md-12 poppins">
                                <ul className="d_event_list">
                                  {eventcategory.map((item, index) => (
                                    <div className="form_check_box ">
                                      <label className="form_check_box_label">
                                        {item.cateShowName}
                                        <input
                                          type="checkbox"
                                          name="activityCheck"
                                          value={item.cateShowName}
                                          onChange={onUpdateField}
                                          onBlur={onBlurField}
                                          // checked={
                                          //   form.activityCheck == item.cateName
                                          // }
                                        />
                                        <span className="checkmark"></span>
                                      </label>
                                    </div>
                                  ))}
                                </ul>
                                {errors.activityCheck.dirty &&
                                errors.activityCheck.error ? (
                                  <p className={styles.formFieldErrorMessage}>
                                    {errors.activityCheck.message}
                                  </p>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : null}

                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h5 className="d_main_titl" style={{marginBottom:"-4%"}}>Personal Details</h5>
                        </div>
                      </div>
                      <div className="d_create_event_frm ">
                        <div className="row ">
                          <div className="col-11 poppins">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.userName.dirty &&
                                    errors.userName.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="User name"
                                name="userName"
                                placeholder="User name"
                                value={form.userName}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.userName.dirty &&
                              errors.userName.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.userName.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-11 poppins mt-2">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.userEmail.dirty &&
                                    errors.userEmail.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="Email id"
                                name="userEmail"
                                placeholder="Email id"
                                value={form.userEmail}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.userEmail.dirty &&
                              errors.userEmail.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.userEmail.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-11 mt-2">
                            <div className="form-group">
                              <input
                                className={clsx(
                                  styles.formField,
                                  errors.userMobile.dirty &&
                                    errors.userMobile.error &&
                                    styles.formFieldError
                                )}
                                type="text"
                                aria-label="Phone number"
                                name="userMobile"
                                placeholder="Phone number"
                                value={form.userMobile}
                                onChange={onUpdateField}
                                onBlur={onBlurField}
                              />
                              {errors.userMobile.dirty &&
                              errors.userMobile.error ? (
                                <p className={styles.formFieldErrorMessage}>
                                  {errors.userMobile.message}
                                </p>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-md-12 text-center mt-4">
                            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                            <button className="d_comn_btn d-block d-md-inline-block mt-4">
                              {isSubmitButtonLoading
                                ? "Loading..."
                                : "Submit enquiry"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
        <Modal show={showModal} onHide={handleCloseModal}
        
      aria-labelledby="contained-modal-title-vcenter"
      centered>
          <Modal.Body>
            <p className="box_padding">
              {" "}
              Woohoo! Thanks for thinking of us for your private event. The
              Community Manager will get in touch with you soon.{" "}
            </p>
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

        <Modal show={showModal2} onHide={handleCloseModal2}>
          <Modal.Body>
            <h4>Introduction</h4>
            <h6 className="container-fluid mt-4">
              We’ve got the space to host birthday parties (for people and
              pets!), official meetings, gatherings, and any sort of soirées.
              All under one roof!
            </h6>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCloseModal2}
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
