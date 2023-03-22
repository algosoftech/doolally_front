import React, { useState ,useEffect} from "react";
import axios from 'axios';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import TermNCondition from "../components/TermNConditionWeb";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import HeaderMob from '../components/HeaderMob';
import FooterMob from '../components/FooterMob';
import styles from "../components/validators/createvent/CreateEventForm.module.css";
import { useEditEventFormValidator } from "../components/validators/createvent/useEditEventFormValidator";
//croper
import Crop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

//
import { getRequestOptions, postRequestOptions, multipartRequestOptions, apiBaseUrl, userCreateEventPageApiUrl, userEditEventApiUrl, 
         eventShareBaseUrl, createEventDoolallyFee, userFrom, EVENT } from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken } from '../utils/UserAuthenticate';
import {showCorrectImage, numberWithCommas,isCorrectStartTime,isCorrectEndTime} from '../utils/Common';
import { format } from "date-fns";

const EditEventDetails=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [eventcategory, setEventcategory] = useState([]);
    const [alertStartTime,setAlertStartTime]=useState("");
    const [alertEndTime,setAlertEndTime]=useState("");
    const [eventLocation, setEventLocation] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [eventDate, setEventDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));
    const [errorMsg, setErrorMsg] = useState('');
    const [currentPerpersonFee, setCurrentPerpersonFee] = useState(0);
    const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
    const [eventId, setEventId] = useState(0);

    const [eventImageDiv, setEventImageDiv] = useState('button');
    const [currEventImage, setCurrEventImage] = useState('');
    const [oldEventImage, setOldEventImage] = useState('');

    const [timeValue, onChange] = useState('10:00');
    const [selectedCheckboxes, setSelectedCheckboxes]= useState([]);

const [eVntPrice,setEVntPrice]=useState();

    useEffect(()=>{
        Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
        if(!getUserCurrLoc()){ setUserCurrLoc();};
        if(!getUser()){ window.location = '/login/my-events'; }
        setShow(false);
        getData();
       
    },[]);

    const { eventSlug } = useParams();

    const [form, setForm] = useState({
        eventImage: "",
        eventName: "",
        eventDesc: "",
        eventDate: '',//new Date(Date.now() + ( 3600 * 1000 * 24)),
        startTime: "",
        endTime: "",
        eventPlace: "",
        locName: "",
        eventCapacity: "",
        costType: 2,
        eventPrice: "",
		cateId: "",
        termNCondition: "",        
    });

    const { errors, validateForm, onBlurField } = useEditEventFormValidator(form);
    //time picker slot filled dynamically

    const [selectedStartTime,setSelectedStart]=useState(new Date(`1970-01-01T${form.startTime}`));
    const [selectedEndTime,setSelectedEnd]=useState();

    const onUpdateField = e => {  
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

        if(e.target.name === "eventPrice"){
            if(form.costType == 2){
                setEVntPrice(parseInt(e.target.value)); 
                if(parseInt(e.target.value) > 0)
                    setCurrentPerpersonFee(parseInt(e.target.value)+parseInt(createEventDoolallyFee));
                else
                    setCurrentPerpersonFee(0); 
            } else {
                //fieldValue = 0;
                setCurrentPerpersonFee(0);
            }
        } 

        if(e.target.name === "cateId"){
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
        const nextFormState = { ...form, [field]: fieldValue, };
        setForm(nextFormState);
        if (errors[field].dirty) validateForm({ form: nextFormState, errors, field, });

    
    };
    


    /*
    const onUpdateSelectField = (selectedOption) => {
        const field = "eventPlace"; 
        const nextFormState = { ...form, [field]: selectedOption.value, };
        setForm(nextFormState);
        if (errors[field].dirty) validateForm({ form: nextFormState, errors, field, });
    };
    */

    const handleImageFile = event => {
        const field = "eventImage"; 
        const nextFormState = { ...form, [field]: URL.createObjectURL(event.target.files[0]), };
        setForm(nextFormState);
        //if (errors[field].dirty) validateForm({ form: nextFormState, errors, field, });
        setEventImageDiv('image');
        setCurrEventImage(event.target.files[0]);
        console.log(URL.createObjectURL(event.target.files[0]));
    };

    const removeImageFile = event => {
        const field = "eventImage"; 
        const nextFormState = { ...form, [field]: '', };
        setForm(nextFormState);
        //if (errors[field].dirty) validateForm({ form: nextFormState, errors, field, });
        setEventImageDiv('button');
        setCurrEventImage('');
    };

    const onSubmitForm = async(e) => {
        e.preventDefault();
        const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
        if (!isValid) return;
        //console.log(JSON.stringify(form, null, 2));
        const user = getUser();
        const userCurrLoc = getUserCurrLoc();
        // Create an object of formData
        const formData = new FormData();

        // Set the formData object
        if(currEventImage){
            formData.append("eventThumbnail",currEventImage,currEventImage.name);
        }

        formData.append('oldEventImage', oldEventImage);
        formData.append('eventName', form.eventName);
        formData.append('eventDesc', form.eventDesc);
        //formData.append('eventDate', form.eventDate);
        formData.append('eventDate', eventDate);
        formData.append('startTime', form.startTime);
        formData.append('endTime', form.endTime);
        formData.append('eventPlace', form.eventPlace);
        formData.append('eventCapacity', form.eventCapacity);
        formData.append('costType', form.costType);
        formData.append('eventPrice', form.eventPrice);
        //formData.append('cateId', form.cateId);
        formData.append('cateId', selectedCheckboxes);
        formData.append('termNCondition', form.termNCondition);     

        formData.append('currEventId', eventId);
        formData.append('currEventSlug', eventSlug);
        formData.append('userFrom', userFrom);
        formData.append('userId', user.userId);
        formData.append('userIpAdress', userCurrLoc.IPv4);
        formData.append('doolallyFee', parseInt(createEventDoolallyFee));
        formData.append('eventSlug', form.eventName.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''));
        formData.append('eventShareLink', eventShareBaseUrl+form.eventName.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,''));

        //console.log(formData);
        try {   
            setIsSubmitButtonLoading(true);
            // here Api call for Home page 
            let result  =   await axios.post(apiBaseUrl+userEditEventApiUrl, formData, multipartRequestOptions);
            if(result){
                result      =   result.data;
                //console.log(result);
                if(result.statusCode === 'success'){
                    alert(result.statusMessage);
                    window.location = '/my-events';
                } else {
                    setErrorMsg(result.statusMessage);
                }
                setIsSubmitButtonLoading(false);
            }
        } catch (error) {
            setErrorMsg('Error while update event. Try again later.');
        }
    };
    
    const getData= async()=>{
        try {   
            setIsloading(true);
            const user = getUser();
            // here Api call for Get Location and Category
            let result      =   await fetch(apiBaseUrl+userCreateEventPageApiUrl+'?userId='+user.userId+'&eventSlug='+eventSlug,getRequestOptions);
            if(result){
                result      =   await result.json();
                setEventcategory(result.response.result.categoryData);
                setEventLocation(result.response.result.locationData);
                setTimeout(() => {setIsloading(false)}, 500); 
                //console.log(result);
                let curEventData                        =   result.response.result.eventData[0];
            setEVntPrice(curEventData.eventPrice-curEventData.doolallyFee);
            setSelectedEnd(curEventData.endTime)

                if(curEventData.ifActive == EVENT.ACTIVE && curEventData.ifApproved == EVENT.APPROVED){
                    let currentForm                         =   form;
                        currentForm.eventImage              =   curEventData.filename;
                        currentForm.eventName               =   curEventData.eventName;
                        currentForm.eventDesc               =   curEventData.eventDescription;
                        currentForm.eventDate               =   new Date(curEventData.eventDate);
                        currentForm.startTime               =   curEventData.startTime;
                        currentForm.endTime                 =   curEventData.endTime;
                        currentForm.eventPlace              =   curEventData.eventPlace;
                        currentForm.locName                 =   curEventData.locName;
                        currentForm.eventCapacity           =   curEventData.eventCapacity;
                        currentForm.costType                =   curEventData.costType;
                        currentForm.eventPrice              =   curEventData.eventPrice;
                        //currentForm.cateId                  =   curEventData.categoryList[0].cateId;
                        currentForm.termNCondition          =   'Yes';
                        if(curEventData.categoryList.length >0){
                            for(let i=0; i < curEventData.categoryList.length; i++){
                                const currSelectedCheckboxes = selectedCheckboxes;
                                currSelectedCheckboxes.push(parseInt(curEventData.categoryList[i].cateId));
                                setSelectedCheckboxes(currSelectedCheckboxes);
                            }
                        }
                    //console.log(selectedCheckboxes);
                    //const nextFormState = { ...form, [field]: selectedOption.value, };
                    setForm(currentForm);
                    setEventId(curEventData.eventId);
                    setEventDate(currentForm.eventDate);
                    setOldEventImage(currentForm.eventImage);
                    if(currentForm.eventImage){
                        setEventImageDiv('image');
                    }
                    //console.log(form.startTime);
                } else {
                    window.location = '/my-events';
                }
            }
        } catch (error) {
            console.log("error", error);
        }
    }
    console.log(selectedEndTime)

  const HideShowPriceBlock=()=>{
 
const myDiv = document.querySelector('.myDiv');
const myDiv2 = document.querySelector('.myDiv2');
    if (myDiv.style.display === 'none') {
        myDiv.style.display = 'block';
      } else {
        myDiv.style.display = 'none';
      }
      if (myDiv2.style.display === 'none') {
        myDiv2.style.display = 'block';
      } else {
        myDiv2.style.display = 'none';
      }
  }

  //cropper

const [src, setSrc] = useState(null);
const [crop, setCrop] = useState({    src: null,
  
    unit: "%",
    x: 0,
    y: 0,
    width: 80,
    height: 80
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

const onImageLoaded = image => {
  console.log(image);
};

const onCropComplete = crop => {
  makeClientCrop(crop);
};

const makeClientCrop = async crop => {
  if (src && crop.width && crop.height) {
    const croppedImage = await getCroppedImg(src, crop);
    setCroppedImageUrl(croppedImage);
  }
};

const getCroppedImg = (url, crop) => {
  const imageAspectRatio = crop.width / crop.height;
  const canvas = document.createElement('canvas');

  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      const canvasAspectRatio = image.width / image.height;
      canvas.width = crop.width;
      canvas.height = crop.width / canvasAspectRatio;

      const ctx = canvas.getContext('2d');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = 'newFile.jpeg';
        window.URL.revokeObjectURL(croppedImageUrl);
        const newFile = new File([blob], 'newFile.jpeg', { type: 'image/jpeg' });
        resolve(window.URL.createObjectURL(newFile));
      }, 'image/jpeg');
    };
    image.onerror = error => {
      reject(error);
    };
  });
};






const onCropChange = crop => {
  setCrop(crop);
};
//


    return(
        <>

     <div className="ph-n" style={{width:"99%"}}>
     <Header/>
     </div>      



<Container>
<div className="ds-n mt-4 pt-4" >
<HeaderMob/>
</div>




            <section className="d_main_panel ">
            
                <div className="container-fluid">
                    <div className="d_create_event d_right_panal box_padding black_heading" id="edit-event">
                        <form className={styles.form}> {/* onSubmit={onSubmitForm}> */}
                            <div className="d_title_box">
                                <p className="d_main_sub_title">Edit your event 
                                    <span className="d_line"></span>
                                    <span className="d_round"></span>
                                    <span className="d_round"></span>
                                    <span className="d_round"></span>
                                    {/* <Button variant="secondary" onClick={handleShow} style={{float:'right'}}>Read Event Guidelines</Button> */}
                                </p>
                                <p className="p_gray poppins" style={{marginTop:'7px'}}>To organise an event, please read the event guidelines and then fill up the form.</p>
                            </div>
                            <div className="d_upload_img">
                                <div className="file-upload">
                            
                                    {eventImageDiv == 'button' &&
                                        <div className="image-upload-wrap">
                                            <input className="file-upload-input" type='file' name="eventImage" accept="image/*" onChange={handleImageFile} />
                                            <div className="drag-text">
                                                <img src={process.env.PUBLIC_URL + "/images/icons/upload_camera.svg"} alt=""/>
                                                <p className="p_gray poppins">Add a cover photo</p>
                                                <p className="img_dimen poppins"> Max Image Dimensions 1200x677 pixels</p>
                                            </div>
                                        </div>
                                    }
                                    {eventImageDiv == 'image' &&
                                        <div className="file-upload-content" style={{display:"block",margin:'0 auto'}} show={show}>
                                        <div className="image-title-wrap">
                                                <button type="button" className="remove-image" onClick={removeImageFile} style={{float:"right"}}> 
                                                <span className="image-title">✖ </span></button>
                                            </div>
                                         
        <Crop
        //   src={form.eventImage}
          crop={crop}
          onImageLoaded={onImageLoaded}
          onComplete={onCropComplete}
          onChange={onCropChange}
          locked
         
        >
                                            <img className="file-upload-image" id="file-uplod-img" src={showCorrectImage(form.eventImage)} alt="your events" width={'200px'} />
                                       
     </Crop>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="d_create_event_form">
                                <div className="row g-3 poppins">
                                    <div className="col-md-12">
                                        <label>Name of event</label>
                                        <div className="form-group">
                                            <input
                                                className={clsx(
                                                    styles.formField,
                                                    errors.eventName.dirty && errors.eventName.error && styles.formFieldError
                                                )}
                                                type="text"
                                                aria-label="Name of event"
                                                name="eventName"
                                                placeholder="Name of event"
                                                value={form.eventName}
                                                onChange={onUpdateField}
                                                onBlur={onBlurField}
                                                />
                                                {errors.eventName.dirty && errors.eventName.error ? (
                                                    <p className={styles.formFieldErrorMessage}>{errors.eventName.message}</p>
                                                ) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Describe your Event</label>
                                        <div className="form-gro  pt-3">
                                            <textarea
                                                className={clsx(
                                                    styles.formFieldTextarea,
                                                    errors.eventDesc.dirty && errors.eventDesc.error && styles.formFieldError
                                                )}
                                                aria-label="Describe your event"
                                                name="eventDesc"
                                                rows="3"
                                                placeholder="Describe your event"
                                                value={form.eventDesc}
                                                onChange={onUpdateField}
                                                onBlur={onBlurField}
                                                />
                                                {errors.eventDesc.dirty && errors.eventDesc.error ? (
                                                    <p className={styles.formFieldErrorMessage}>{errors.eventDesc.message}</p>
                                                ) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Event Date</label>
                                        <div className="form-group">
                                            <DatePicker 
                                            name="eventDate" 
                                            dateFormat="dd-MM-yyyy" 
                                            minDate={new Date(Date.now() + ( 3600 * 1000 * 24))}
                                            selected={eventDate} 
                                            value={form.eventDate}
                                            onChange={(date) => setEventDate(date)} 
                                            onBlur={onBlurField}
                                            className={clsx(
                                                styles.formField,
                                                errors.eventDate.dirty && errors.eventDate.error && styles.formFieldError
                                            )}
                                            placeholder="Date of Event"
                                            aria-label="Date of Event" 
                                            />
                                            {errors.eventDate.dirty && errors.eventDate.error ? (
                                                <p className={styles.formFieldErrorMessage}>{errors.eventDate.message}</p>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                          <label>Start Time</label>
                          <div className="form-grou">
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
                              value={form.startTime}
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
                              value={form.endTime}
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
                                    <div className="col-md-6">
                                        <label>Event Place</label>
                                        <div className="form-group">
                                    
                                            <input
                                                className={styles.formField}
                                                type="text"
                                                aria-label="Event Place"
                                                name="locName"
                                                placeholder="Event Place"
                                                value={form.locName}
                                                disabled={true}
                                                />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Event Capacity</label>
                                        <div className="form-group">
                                            <input
                                                className={clsx(
                                                    styles.formField,
                                                    errors.eventCapacity.dirty && errors.eventCapacity.error && styles.formFieldError
                                                )}
                                                type="number"
                                                aria-label="Event Capacity"
                                                name="eventCapacity"
                                                placeholder="Event Capacity"
                                                value={form.eventCapacity}
                                                onChange={onUpdateField}
                                                onBlur={onBlurField}
                                                />
                                                {errors.eventCapacity.dirty && errors.eventCapacity.error ? (
                                                    <p className={styles.formFieldErrorMessage}>{errors.eventCapacity.message}</p>
                                                ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="d_free_or_paid">
                                    <div className="d_title_box">
                                        <h3 className="d_main_title">Is the event Free or Paid or Private?</h3>
                                    </div>
                                </div>
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="d_custome_raido" htmlFor="costType2"> <span className="d_paid monster">Paid</span>
                                            <input type="radio" name="costType" id="costType2" value="2" onChange={onUpdateField} onBlur={onBlurField} checked={form.costType == 2} onClick={HideShowPriceBlock}/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="p_gray">Cover charge of Rs 300 is fully redeemable for food & beverages</p>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="d_custome_raido" htmlFor="costType1"> <span className="d_paid monster">Free</span>
                                            <input type="radio" name="costType" id="costType1" value="1" onChange={onUpdateField} onBlur={onBlurField} checked={form.costType == 1} onClick={HideShowPriceBlock}/>
                                            <span className="checkmark"></span>
                                        </label>
                                        <p className="p_gray">If you don't charge, we don't charge.</p>
                                    </div>
                                    <div className="col-md-6 editCreatedEvent myDiv" >  <label>Event Fees</label>
                                        <div className="form-group poppins">
                                            <input
                                                className={clsx(
                                                    styles.formField,
                                                    errors.eventPrice.dirty && errors.eventPrice.error && styles.formFieldError
                                                )}
                                                type="number"
                                                aria-label="Event Fees"
                                                name="eventPrice"
                                                placeholder="Event Fees"
                                                value={eVntPrice}
                                                onChange={onUpdateField}
                                                onBlur={onBlurField}
                                                />
                                                {errors.eventPrice.dirty && errors.eventPrice.error ? (
                                                    <p className={styles.formFieldErrorMessage}>{errors.eventPrice.message}</p>
                                                ) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center ">
                                        <p className="p_gray myDiv2">( + Rs 300 Doolally Fee) Total Price: Rs. {form.eventPrice?form.eventPrice:currentPerpersonFee}</p>
                                    </div>
                                </div>
                                <div className="d_free_or_paid">
                                    <div className="d_title_box">
                                        <h3 className="d_main_title">Chose Category</h3>
                                    </div>
                                </div>
                                <div className="d_event_list">
                                    { eventcategory.map((item, index) =>
                                    <div className="form_check_box poppins">
                                        <label className="form_check_box_label">{item.cateName}
                                            <input 
                                                type="checkbox" 
                                                name="cateId" 
                                                value={item.cateId} 
                                                onChange={onUpdateField} 
                                                onBlur={onBlurField} 
                                                //checked={form.cateId == item.cateId}
                                                selected={selectedCheckboxes.includes(item.cateId)}
                                                />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    )}
                                    {errors.cateId.dirty && errors.cateId.error ? (
                                        <p className={styles.formFieldErrorMessage}>{errors.cateId.message}</p>
                                    ) : null}
                                </div>
                                <div className="d_create_event_form">
                                    <div className="row g-3">
                                        <div className="col-md-12 poppins">
                                            <p className="p_gray poppins mt-md-4 mt-3 mb-md-4 mb-3">All events are reviewed and approved by Doolally. Once approved, we will create an Instamojo payment link and accept payments on your behalf.</p>
                                            <div className="form_check_box poppins">
                                                <label className="form_check_box_label" htmlFor="termNCondition">
                                                    <input type="checkbox" name="termNCondition" id="termNCondition" value="Yes" onChange={onUpdateField} onBlur={onBlurField} checked={form.termNCondition == 'Yes'}/>
                                                    <span className="checkmark"></span>
                                                    I have read and agree to the {" "}
                                                    <span  onClick={handleShow}>event guidelines.</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-md-12 text-center">
                                            {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                                            {/* <button className="d_comn_btn d-block d-md-inline-block">{isSubmitButtonLoading ? 'Loading...' : 'Submit Event'}</button> */}
                                            <a href="javascript:void(0);" className="d_comn_btn d-block d-md-inline-block" onClick={onSubmitForm}>{isSubmitButtonLoading ? 'Loading...' : 'Submit Event'}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <div className="ds-n mt-4 pt-4" >
<FooterMob/>
</div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <TermNCondition />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
            </Container>
            <div className="ph-n">
    <Footer/>
</div>

        </>
    );
}

export default EditEventDetails;
