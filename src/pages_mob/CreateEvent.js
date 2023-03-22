
import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import dayjs from "dayjs";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import TermNCondition from "../components/TermNConditionWeb";
import Helper from "../utils/Helper";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
//croper
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
//

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
import { showCorrectImage, numberWithCommas,isCorrectStartTime,isCorrectEndTime } from "../utils/Common";

const CreateEvent = () => {

  const userData = getUser();
  const [value, setValue] = React.useState(dayjs(""));
  const [value2, setValue2] = React.useState(dayjs(""));

const [alertStartTime,setAlertStartTime]=useState("");
const [alertEndTime,setAlertEndTime]=useState("");
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

  const [OTPshow, setOTPshow] = useState(false);
  const OTPhandleClose = () => setOTPshow(false);
  const [currUserMobile, setCurrUserMobile] = useState("");
  const [currUserOTP, setCurrUserOTP] = useState("");
  const [OTPerrorMsg, setOTPErrorMsg] = useState("");
  const[  ermsge,setErmsge]=useState("")
  const [isOTPSubmitButtonLoading, setIsOTPSubmitButtonLoading] =
    useState(false);

    const getData2 = () => {

      {userData?(setForm({...form,creatorName:userData.userName , creatorEmail:userData.emailId,creatorPhone:userData.mobNum
      })): console.log("")}
  
    }
    const [showModal, setShowModal] = useState(false);
    const handleCloseModal = () => {
      setShowModal(false);
      window.location = "/my-events";
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
    setShow(true);
    getData2()
    getData();
  }, []);
console.log(userData);
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
    if(e.target.name==="eventCapacity"){
   
      if(fieldValue==0)
      setErmsge("please choose capacity");
      else  setErmsge("");
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
    if (e.target.id === "costType2") {
      document.getElementById("price-section").style.display = "block";
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
    // handleCrop()
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    const user = getUser();
    const userCurrLoc = getUserCurrLoc();

    // Create an object of formData for send OTP

    try {
      setIsSubmitButtonLoading(true);

      // Create an object of formData
      const formData = new FormData();

      // Set the formData object
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

      // here Api call for Home page
      let result = await axios.post(
        apiBaseUrl + userCreateEventApiUrl,
        formData,
        multipartRequestOptions
      );
      if (result) {
        result = result.data;
        if (result.statusCode === "success") {
          setUserSession(
            result.response.result.userToken,
            result.response.result.userData[0]
          );setShowModal(true);
          if (showModal == "false") {
            //window.location = '/';
            window.location = "/my-events";
          }
        } else {
          setErrorMsg(result.statusMessage);
        }
        setIsSubmitButtonLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error while create event. Try again later.");
    }
  };
  const onCheckVerificationOTP = () => {
    console.log("hi");
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
  const RemovePriceSection = () => {
    document.getElementById("price-section").style.display = "none";
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageSrc, setCroppedImageSrc] = useState(null);
  const imageRef = useRef(null);
  const cropperRef = useRef(null);

  const handleImageUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
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
const [croppedImage,setCroppedImage]=useState(null);

const handleCrop = () => {
  if (imageRef.current) {
    const cropper = new Cropper(imageRef.current, {
      aspectRatio: 1,
      viewMode: 1,
      minContainerWidth: imageRef.current.naturalWidth,
      minContainerHeight: imageRef.current.naturalHeight,
      ready: () => {
        cropper.getCroppedCanvas().toBlob(blob => {
          setCroppedImage(blob);
        });
      }
    });
  }
  const croppedImageData = cropperRef.current.getCroppedCanvas().toDataURL();
 
  const binaryImageData = atob(croppedImageData.split(',')[1]);
const arrayBufferData = new Uint8Array(binaryImageData.length);

for (let i = 0; i < binaryImageData.length; i++) {
  arrayBufferData[i] = binaryImageData.charCodeAt(i);
}

const blob = new Blob([arrayBufferData], {type: 'image/png'});

  // setCurrEventImage(cropperRef.current.getCroppedCanvas().toDataURL())
  // setCroppedImageSrc(cropperRef.current.getCroppedCanvas().toDataURL());
  // const blob = new Blob([croppedImageSrc], { type: 'image/jpeg' });
  // const file = new File([blob], `cropped-${new Date().toISOString()}`, { type: blob.type });
  setCurrEventImage(blob);


  setForm({
    ...form,
    eventImage: cropperRef.current.getCroppedCanvas().toDataURL(),
  }, );




  
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
    console.error('Error loading image');
  };

  const getRoundedCanvas = (sourceCanvas) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const width = sourceCanvas.width;
    const height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    context.globalCompositeOperation = 'destination-in';
    context.beginPath();
    context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
    context.fill();
    return canvas;
  };
  console.log(croppedImageSrc)
  console.log(currEventImage);

  return (
    <>

{/* <div className="col-lg-6" align="center">
          <label>Preview</label>
          <div id="cropped_image_result">
            {croppedImageSrc && <img style={{ width: '450px' }} src={croppedImageSrc} />}
            {croppedImageSrc && <img style={{ width: '450px' }} src={currEventImage} />}
          </div>
          <br />
          <button type="button" className="btn btn-success" onClick={handleCrop}>
           
</button>
</div> */}
      <div

        className="container mt-4 pt-4"
        style={{ marginBottom: "90px" }}
      >
     
        {/* {isloading &&  <LoadingSpinner /> } */}
        <Header />
        <section className="d_main_panel">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6  ">
                <div className=" box_padding gray_bg_color">
                  <form className={styles.form}>
                   
                    {/*onSubmit={onSubmitForm}> */}
                    <div className="d_title_box">
                      <p className="d_main_sub_title">
                        Create an event <span className="d_line"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
                        <span className="d_round"></span>
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
                              onChange={handleImageUpload}
                            />
                            <div className="drag-text">
                              <CameraAltOutlinedIcon
                                id="camera"
                                style={{ fontSize: "3rem" }}
                              />
                              <p className="p_gray poppins">
                                Add a cover photo
                              </p>
                              <p className="img_dimen poppins">
                               
                                Max Image Dimensions 1200x1200 pixels
                              </p>
                            </div>
                          </div>
                        )}
                        {eventImageDiv == "image" && (
                          <>
                            <div className="image-title-wrap text-end">
                              <span
                                type="button"
                                className="remove-image"
                                onClick={removeImageFile}
                              >
                                <span className="image-title">✖ </span>
                              </span>
                            </div>
                            <div
                              className="file-upload-content "
                              style={{
                                display: "block",
                                margin: " auto",
                                marginTop: "-30px",
                                width:"100%"
                              }}
                              show={show}
                            >
 
                              {/* <img
                                className="file-upload-image"
                                src={form.eventImage}
                                alt="your events"
                                style={{ width: "150px" }}
                              /> */}
                              {imageSrc && (
              <img
                ref={imageRef}
                onLoad={handleImageLoad}
                onError={handleImageError}
                src={form.eventImage}
          
                className="file-upload-image"
                            
                                alt="your events"
                                style={{ width: "150px" }}
              />
            )}
                            </div>
         
                          </>
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
                        <div className="col-md-6 mt-4">
                          <label>Start Time</label>
                          <div className="form-grup">
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
<span style={{color:"red", fontSize:"15px"}}>
                            {alertStartTime==""?"":alertStartTime}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <label>End Time</label>
                          <div className="form-grop">
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
                          <span style={{color:"red", fontSize:"15px"}}>
                            {alertEndTime==""?"":alertEndTime}
                            </span>
                        </div>
                        <div className="col-md-6 " >
                          <label>Event Place</label>
                          <div className="form-grop">
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
                               {ermsge?<p style={{color:"red", marginLeft:"2%"}}>{ermsge}</p>: ""}
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
                          <h3 className="d_main_titl mt-4" style={{fontWeight:"500", fontSize:"16px"}}>
                            Is the event Free or Paid ?
                          </h3>
                        </div>
                      </div>
                      <div className="row g-4">
                        <div className="col-md-6 col-6">
                          <label
                            className="d_custome_raido"
                            htmlFor="costType2"
                          >
                           
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
                            and beverages
                          </p>
                        </div>
                        <div className="col-md-6 col-6">
                          <label
                            className="d_custome_raido"
                            htmlFor="costType1"
                            onClick={RemovePriceSection}
                          >
                           
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
                        <div
                          className="col-md-6"
                          style={{ marginTop: "-1px" }}
                          id="price-section"
                        >
                         
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
                     
                          <div className="col-md-6 d-flex align-items-center mt-2 ">
                          <p className="p_gray" id="price-section ">
                            ( + Rs 300 Doolally Fee)      <br/>
                            <br/> Total Price: Rs.
                            {currentPerpersonFee}
                          </p>
                        </div>
                        </div>
                      
                      </div>
                      <div className="d_free_or_paid">
                        <div className="d_title_box">
                          <h3 className="d_main_titl" style={{fontWeight:"500", fontSize:"16px"}}>
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
                        <h3 className="d_main_title pt-4">Personal Details</h3>
                        {/* </div> */}
                      </div>
                      <div className="d_create_event_form" style={{marginTop:"-3%"}}>
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
                            <p className="p_gray poppins mt-md-4 mt-3 mb-md-4 mb-3">
                              All events are reviewed and approved by
                              Doolally.Once its approved by the admin the same
                              will go live on the platform.
                            </p>
                            <div className="form_check_box poppins  ">
                              <label
                                className="form_check_box_label"
                                htmlFor="termNCondition"
                                style={{fontSize:"12px"}}
                              >
                                <input
                                  type="checkbox"
                                  name="termNCondition"
                                  id="termNCondition"
                                  value="Yes"
                                  onChange={onUpdateField}
                                  onBlur={onBlurField}
                                  // checked=
                                  selected={form.termNCondition == "Yes"}
                                />
                                <span className="checkmark" style={{marginTop:"5px"}}></span>I agree to the
                                <Button
                                  variant="link"
                                  onClick={handleShow}
                                  style={{
                                    textDecoration: "none",
                                    color: "#A2C760",
                                  marginTop:"-2%",
                                  marginLeft:"-2%",
                                  fontSize:"14px"
                                  }}
                                >
                                guidelines.
                                </Button>
                              </label>
                            </div>
                          </div>
                          <div className="col-md-12 text-center  mb-4">
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

        <Modal show={showModal} onHide={handleCloseModal}   aria-labelledby="contained-modal-title-vcenter"
      centered>
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


