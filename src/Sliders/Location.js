import * as React from "react";
import  { Component,useState,useEffect, useRef } from "react";
import Slider from "react-slick";
import Helper from "../utils/Helper";
import locatinBlackIcon from '../images/icons/Location-icon.png';
import locatiGreenIcon from '../images/icons/Location-iconC.png';

import { getRequestOptions, apiBaseUrl, homePageApiUrl, fBDImageBaseUrl, eventImageBaseUrl } from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken, removeUserSession } from '../utils/UserAuthenticate';
import {showCorrectImage, numberWithCommas} from '../utils/Common';

// import './tesq.css';

//  class Location extends Component {

const  Location=()=>{

 
  const [location,setLocation]=useState([]); 
  const  [n1,setN1]= useState();
  const  [n2,setN2]= useState();
  const slider1 = useRef ();
  const slider2 = useRef ();

  // state = {
  //   display: true,
  //   width: 'auto'
  // };
  // render() {

    
  //   const settings = {
  //     // dots: true,
  //     arrows:true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 3,
  //     slidesToScroll: 1,

    
  //   };



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
              
              setLocation(result.response.result.location);
              // setTimeout(() => {setIsloading(false)}, 500); 
          }
      } catch (error) {
          console.log("error", error);
      }
  }

    return (
      <div>
        
        <div
          // style={{
          //   width: this.state.width + "px",
          //   display: this.state.display ? "block" : "none"
          // }}
        >
          <Slider
          asNavFor={n1}
          ref={slider2=>setN1(slider2)}
           slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
          >
          {location.map((item,key)=>
                                                <div className="col-4" >  
                                                    <div className="d_locat_boxx">
                                                        <div className="d_locat_cnt "  >
                                                            {key%2 == 0 ? (
                                                                <img src={locatinBlackIcon}/>
                                                            ) : (
                                                                <img src={locatiGreenIcon}/>
                                                            )}
                                                            <p className="d_locat_name poppins">{item.locName}</p>
                                                            <p className="d_cnt_locat poppins">Get Locations</p>
                                                        </div>                    
                                                    </div>
                                                </div>   
                                            )}        
          </Slider>
        </div>
      </div>
    );
  }

export default Location;