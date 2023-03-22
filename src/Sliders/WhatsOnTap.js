import * as React from "react";
import  { Component,useState,useEffect, useRef } from "react";
import Slider from "react-slick";
import Helper from "../utils/Helper";
import locatinBlackIcon from '../images/icons/Location-icon.png';
import locatiGreenIcon from '../images/icons/Location-iconC.png';

import { getRequestOptions, apiBaseUrl, homePageApiUrl, fBDImageBaseUrl, eventImageBaseUrl } from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken, removeUserSession } from '../utils/UserAuthenticate';
import {showCorrectImage, numberWithCommas} from '../utils/Common';


const  WhatsOnTap=()=>{

 
  const [whatsOnTap,setwhatsOnTap]=useState([]);
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
            setwhatsOnTap(result.response.result.whatsOnTap);
    
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
          >
           { whatsOnTap.slice(0, 8).map((item,index)=>
                                                <div>
    
                                                <div className="slideHangOut">
                                      <div className="d_product_box ">
                                      
                                          <figure className="d_product_img mb-0" key={index}>
                                      
                                          <img src={fBDImageBaseUrl+'thumb/'+item.filename} alt=""/>
                                          </figure>
                                      
                                          <p className="d_product_title">{item.itemName}</p>
                                      
                                          <a  className="d_overlay">
                                      
                                              <p>Explore more</p>
                                      
                                          </a>
                                      </div>
                                      </div>
                                        
                                        
                                                  </div>
                                            )}        
          </Slider>
        </div>
      </div>
    );
  }

export default WhatsOnTap;