import * as React from "react";
import  { Component,useState,useEffect, useRef } from "react";
import Slider from "react-slick";
import Helper from "../utils/Helper";
import locatinBlackIcon from '../images/icons/Location-icon.png';
import locatiGreenIcon from '../images/icons/Location-iconC.png';

import { getRequestOptions, apiBaseUrl, homePageApiUrl, fBDImageBaseUrl, eventImageBaseUrl } from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken, removeUserSession } from '../utils/UserAuthenticate';
import {showCorrectImage, numberWithCommas} from '../utils/Common';


const  Hangout_ph=()=>{

 
  const [hangout,setHangout]=useState([]);
  const  [n1,setN1]= useState();
  const  [n2,setN2]= useState();
  const slider1 = useRef ();
  const slider2 = useRef ();



    useEffect(()=>{ 
      Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
      if(!getUserCurrLoc()){ setUserCurrLoc();};
      getData();
      //removeUserSession();
  },[]);

  const getData= async()=>{
    try {   
        // setIsloading(true);
        // here Api call for Home page
        let result  =   await fetch(apiBaseUrl+homePageApiUrl,getRequestOptions);
        if(result){
            result      =   await result.json();
        
   
         
            setHangout(result.response.result.hangout);
    
            // setTimeout(() => {setIsloading(false)}, 500); 
        }
    } catch (error) {
        console.log("error", error);
    }
}

    return (
      <div>
        
        <div>
          <Slider
          asNavFor={n1}
          ref={slider2=>setN1(slider2)}
           slidesToShow={2}
           rows={2}
          swipeToSlide={true}
          focusOnSelect={true}
          dots={true}
          speed={2000}
          autoplay= {true}
          >
       {hangout.map((item,id)=>
                                                <div>
                                                <div className="slideHangOut">
                                                  <a data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                    <div className="d_product_box">
                                                      <figure className="d_product_img mb-0">
                                                      <img src={item.hangoutImage} alt=""/>
                                                      </figure>
                                                      <p className="d_product_title">{item.hangoutName}</p>
                                                    </div>
                                                  </a>
                                                </div>
                                              </div> 
                                            )}        
          </Slider>
        </div>
      </div>
    );
  }

export default Hangout_ph;