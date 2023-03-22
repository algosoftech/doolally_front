import React, { useState ,useEffect, useCallback} from "react";
import axios from 'axios';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import TermNCondition from "../components/TermNConditionWeb";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";

//import styles from "../components/validators/createvent/CreateEventForm.module.css";

import { eventImageUplodeApiUrl, multipartRequestOptions, apiBaseUrl } from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken } from '../utils/UserAuthenticate';

import ReactDOM from 'react-dom'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
//import { withStyles } from '@material-ui/core/styles'
import { getOrientation } from 'get-orientation/browser'
//import ImgDialog from '../components/ImageCrop/ImgDialog'
import { getCroppedImg, getRotatedImage } from '../components/ImageCrop/canvasUtils'
import { styles } from '../components/ImageCrop/styles'

const ORIENTATION_TO_ANGLE = {
    '3': 180,
    '6': 90,
    '8': -90,
  }

const UploadEventImage=()=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [eventcategory, setEventcategory] = useState([]);
    const [eventLocation, setEventLocation] = useState([]);
    const [isloading, setIsloading] = useState(false);
    const [eventDate, setEventDate] = useState(new Date(Date.now() + ( 3600 * 1000 * 24)));
    const [errorMsg, setErrorMsg] = useState('');
    const [currentPerpersonFee, setCurrentPerpersonFee] = useState(0);
    const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

    const [eventImage, setEventImage] = useState(null);



    const [imageSrc, setImageSrc] = React.useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            var curCroppedImageData = new File([croppedImage], "cropped.jpg", { lastModified: new Date().getTime(), type: croppedImage.type });
            setEventImage(croppedImage);
            console.log('imagedata', { curCroppedImageData })

            setImageSrc(null);
            setShow(false);

            console.log(imageSrc);

        } catch (e) {
        console.error(e)
        }
    }, [imageSrc, croppedAreaPixels, rotation])

    const onClose = useCallback(() => {
        setCroppedImage(null)
    }, [])

    const onFileChange = async (e) => {
        setShow(true);
        if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0]
        let imageDataUrl = await readFile(file)
console.log(file);
        // apply rotation if needed
        const orientation = await getOrientation(file)
        const rotation = ORIENTATION_TO_ANGLE[orientation]
        if (rotation) {
            imageDataUrl = await getRotatedImage(imageDataUrl, rotation)
        }

        setImageSrc(imageDataUrl)
        }
    }












    useEffect(()=>{
        Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
        if(!getUserCurrLoc()){ setUserCurrLoc();};
        //if(!getUser()){ window.location = '/login'; }
    },[]);
    // On file select (from the pop up)
    // const onFileChange = event => {
    //     // Update the state
    //     setEventImage(event.target.files[0]);
    // };
    const onSubmitForm = async(e) => {
        e.preventDefault();
        
        // Create an object of formData
      const formData = new FormData();
      console.log(eventImage);
      // Update the formData object
      formData.append(
        "eventThumbnail",
        eventImage,
        eventImage.name
      );
    
      // Details of the uploaded file
      console.log(eventImage);
    
      // Request made to the backend api
      // Send formData object
      let result  =   axios.post(apiBaseUrl+eventImageUplodeApiUrl, formData, multipartRequestOptions);
        console.log(result);
    };
    if (isloading) {
        return <LoadingSpinner />;
    }
    
    return(
        <>
            <div className="back-button-header">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col-4 pt-2 pl-5 ">
                        <img src={process.env.PUBLIC_URL + "/images/icons/back.png"} alt="dhh"/>
                    </div>
                    <div className="col text-start poppins pt-3" style={{fontWeight:"600"}}>
                        Save Event
                    </div>
                </div>
            </div>
            <Header/>
            <section className="d_main_panel ">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-lg-3 mb-4">
                         <form className={styles.form} onSubmit={onSubmitForm}>

                        <div>
                                <h1>
                                GeeksforGeeks
                                </h1>
                                <h3>
                                File Upload using React!
                                </h3>
                                <div>
                                <input type="file" onChange={onFileChange} accept="image/*" />
                                    {/* <input type="file" onChange={onFileChange} />
                                    <button>
                                    Upload!
                                    </button> */}
                                    {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}
                                    <img src={croppedImage} alt="Cropped" style={{wodth:'400px',height:'400px'}} />
                                    <button>
                                    Upload!
                                    </button>
                                </div>
                            </div>






                            









                        
                        </form>
                        </div>
                    </div>
                </div>
            </section>
            <Modal show={show} onHide={handleClose} id="imageCropModal" size="lg">
            <Modal.Header>
                    <span>Crop Image</span>
                    <i onClick={handleClose} class="mdi mdi-close">X</i>
                    </Modal.Header>
                    <Modal.Body>
                        

      {imageSrc &&
        <React.Fragment>
          <div className={styles.cropContainer}>
            <Cropper
              image={imageSrc}
              crop={crop}
              rotation={rotation}
              zoom={zoom}
              cropSize={{ width: 400, height: 400 }}
              onCropChange={setCrop}
              onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            />
          </div>
          <div className={styles.controls}>
            <div className={styles.sliderContainer}>
              <Typography
                variant="overline"
                className={styles.sliderLabel}
              >
                Zoom
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                className={styles.slider }
                onChange={(e, zoom) => setZoom(zoom)}
              />
            </div>
            <div className={styles.sliderContainer}>
              <Typography
                variant="overline"
                className={styles.sliderLabel }
              >
                Rotation
              </Typography>
              <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                className={styles.slider}
                onChange={(e, rotation) => setRotation(rotation)}
              />
            </div>
            <Button
              onClick={showCroppedImage}
              variant="contained"
              color="primary"
              className={styles.cropButton}
            >
              Crop
            </Button>
          </div>
        </React.Fragment>
      }
  


                    </Modal.Body>
                </Modal>
            <div id="footer-desktop">
                <Footer /> 
            </div>
        </>
    );
}
function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}

export default UploadEventImage;

