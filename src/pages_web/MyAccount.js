import React, { useState ,useEffect} from "react";

import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { format } from 'date-fns'
import Dropdown from 'react-bootstrap/Dropdown';

import { getRequestOptions, apiBaseUrl, userEventsApiUrl, EVENT } from '../config/constant';

import { setUserCurrLoc, getUserCurrLoc, getUser, getToken } from '../utils/UserAuthenticate';
import {isEventFinished, isEventApproved} from '../utils/Common';

const MyEvents = () => {
    const [eventsData,setEventsData]= useState([]);
    const [comEventsData,setComEventsData]= useState([]);
    const [isloading, setIsloading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(()=>{
        Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
        if(!getUserCurrLoc()){ setUserCurrLoc();};
        if(!getUser()){ window.location = '/login/my-accounts'; }
        getData();
    },[]);

    const getData= async()=>{
        try {   
            setIsloading(true);
            const user = getUser();
            // here Api call for Home page
            let result  =   await fetch(apiBaseUrl+userEventsApiUrl+'?userId='+user.userId,getRequestOptions);
            if(result){
                result      =   await result.json();
                if(result.response.result.eventData.length > 0){    
                    setEventsData(result.response.result.eventData);
                    setComEventsData(result.response.result.comEventData);
                } else {
                    setErrorMsg('No event found.');
                }
                setTimeout(() => {setIsloading(false)}, 500); 
            }
        } catch (error) {
            setErrorMsg('Error while loading data. Try again later.');
        }
    }
    return (
        <>
            <Header />
            <div className=" box_padding gray_bg_color profile-page" >
            <div className="text-center">
                <img src={process.env.PUBLIC_URL + "/images/icons/user.png"} />
                <p>My Profile</p>
            </div> 
            <form className="profile-form">
                <div className="row ">
                    <div className="col-md-12 col-10  poppins">
                        <div className="form-group">
                            <label>Name</label><br/>
                            <input type="text" className="control-input p_gray" id="formGroupExampleInput" placeholder="Enter Your Name" />
                        </div>
                    </div>  
                    <div className="col-md-12 col-10 poppins">
                        <div className="form-group">
                            <label>Mobile Number</label><br/>
                            <input type="number" className=" control-input p_gray" id="formGroupExampleInput" placeholder="Mobile Number" />
                        </div>
                    </div>
                    <div className="col-md-12 col-10 poppins">
                        <div className="form-group">
                            <label>Email Address</label><br/>
                            <input type="email" className="control-input p_gray" id="formGroupExampleInput" placeholder="Email Address" required />
                        </div>
                    </div>
                    <div className="col-md-12 col-10 poppins">
                        <div className="form-group">
                            <label>Address</label><br/>
                            <input type="password" className="control-input p_gray" id="formGroupExampleInpu" placeholder="Enter Address" />
                        </div>
                    </div>
                    <div className="col-md-12 col-10  mt-4  text-center">
                        <button className="d_comn_btn d-block d-md-inline-block poppins ">UPDATE DETAILS</button>
                    </div>
                </div>
                <img className="mb-4 pb-4 mt-4" src={process.env.PUBLIC_URL + "/images/membership.png"} id="profile" />
            </form>
            </div>
            <Footer/>
        </>
    );
}
export default MyEvents;
