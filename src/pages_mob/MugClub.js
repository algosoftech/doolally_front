import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "./Footer";
import Review from "../Sliders/Review";
import Hangout from "../Sliders/hangout";
import HangoutC from "../components/Sliding/hangoutC";

const MugClub=()=>{
const arr =["Doolally Mug Club" ,"Share Gift From Doolally" ,"ph-none"];
const arr1 =[" " ,"ph-none"];
    const[state,setState]=useState(["0"]);


    const giftBox=()=>{
        if(state=="0"){
        setState("1"); 
        
       }
      
    }

    

    return(<>
  <Header/>
  
           
  <section className="d_main_panel checkout_page mug_club pt-4">
    <div className="container-fluid ">
        <div className="row">

            <div className="col-lg-3 mb-0 ph-none">
            <div className=" box_padding gray_bg_color">
                <div className="d_title_box " >
                    <h3 className="d_main_title">What's on Tap</h3>
                    <p className="d_main_sub_title">Beer products <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                    <div className="row g-3">
                    <div className="col-6">
                                <div className="d_product_box">
                                    <figure className="d_product_img mb-0">
                                    <img src={process.env.PUBLIC_URL + "/images/pro1.png"} />
                                    </figure>
                                    <p className="d_product_title">Apple Cider</p>
                                    <a href="#" className="d_overlay">
                                        <p>Explore more</p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d_product_box">
                                    <figure className="d_product_img mb-0">
                                    <img src={process.env.PUBLIC_URL + "/images/pro2.png"} />
                                    </figure>
                                    <p className="d_product_title">Mango Cider</p>
                                    <a href="#" className="d_overlay">
                                        <p>Explore more</p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d_product_box">
                                    <figure className="d_product_img mb-0">
                                    <img src={process.env.PUBLIC_URL + "/images/pro3.png"} />
                                    </figure>
                                    <p className="d_product_title">Mango Cider</p>
                                    <a href="#" className="d_overlay">
                                        <p>Explore more</p>
                                    </a>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="d_product_box">
                                    <figure className="d_product_img mb-0">
                                    <img src={process.env.PUBLIC_URL + "/images/pro4.png"} />
                                    </figure>
                                    <p className="d_product_title">Mango Cider</p>
                                    <a href="#" className="d_overlay">
                                        <p>Explore more</p>
                                    </a>
                                </div>
                            </div>
                </div>
                </div>
            </div>
            <div className=" box_padding gray_bg_color mt-3">
                <div className="d_title_box " >
                    <h3 className="d_main_title">Hangout at Doolally</h3>
                    <p className="d_main_sub_title">Beer products <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
         
                    <Hangout/>
                </div>
                
            </div>
                    </div>
            <div className="col-lg-6 mb-4">
                <div className=" box_paddng ray_bg_color">
                <div className="d_title_box" >
                    <h3 className="d_main_title ph-none">Welcome to Doolally Mug Club</h3>
                    <p className="d_main_sub_title ph-none">Mug Club MemberShip <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                    <div className={arr1[state]}>
                   <p className="poppins text-center">  The Doolally Mug Club table reservation, refer & Extend Refer Friend and extend 
                   Mug Club MemberShip by three months, extension gets applied as soon as refered user purchases Mug Club MemberShip
                   </p>
                   <div className="card " id="mug-c-card"style={{width: "auto"}}>
                    <div className="row">
                        <div className="col-md-4 col">   <img src={process.env.PUBLIC_URL + "/images/table-reserved.jpg"} />
                        </div>
                        <div className="col-md-8 col-12"><div className="card-body">
    <h5 className="card-title hglight-title ">Reserve a Table</h5>
    <p className="card-text text-center pb-2">As you are Mug Club Member we are offering you
   This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
   
  </div></div>
                    </div>
                
  
</div>

<div className="card mt-4" id="mug-c-card"style={{width: "auto"}}>
                    <div className="row">
                        <div className="col-md-4 col">   <img src={process.env.PUBLIC_URL + "/images/table-reserved.jpg"} />
                        </div>
                        <div className="col-md-8 col-12"><div className="card-body">
    <h5 className="card-title hglight-title ">Refund And Extend</h5>
    <p className="card-text text-center pb-2">As you are Mug Club Member we are offering you
   This is what happens when your Brewmaster goes on a diet. India's first "low carb beer."</p>
   
  </div></div>
                    </div>
                
  
</div>
   
<h3 className="d_main_title pt-4">Share A Gift From Doolally</h3>

<p className="d_main_sub_title">Mug Club MemberShip <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                    </div>
                    <div className="row ">
                  <div className="col-md-4 col-12 pt-3 ">  <HangoutC image={process.env.PUBLIC_URL + "/images/h1.png"} title={"Buy A Mug Club Membership" }/></div>
                  <div className="col-md-4 col-12 pt-3">  <HangoutC image={process.env.PUBLIC_URL + "/images/h1.png"}title={"Gift A Mug Club Membership" }/></div>
                  <div className="col-md-4 col-12 pt-3">  <HangoutC image={process.env.PUBLIC_URL + "/images/h1.png"}title={"Gift A Beer"}/></div>
                    </div>
                
                    </div>
                    </div>
                    </div>
            <div className="col-lg-3 mb-4 ph-none" id="mugClub-form">
                
            <div className="box_padding gray_bg_color">
                <div className="d_title_box " >
            <h3 className="d_main_title">Wish to proceed , Let us know a little about you as handshake..</h3>
                    <div className="justify-content-center">
                    <input type="text" className=" form-control-sm"placeholder="Full Name "/>
                  <br/>         <br/>
                    <input type="email" className=" form-control-sm" placeholder="Email Address "/>
                    <br/>    <br/>  
                    <input type="Number" className=" form-control-sm" placeholder="Mobile Number "/>
                    <br/>      <br/>
                    <textarea type="textArea" className=" form-control-lg" placeholder="Message "/>
                    <br/>      <br/>
                    <button className="d_comn_btn " style={{width:"100%", height:"44px"}}>Submit</button>
                </div>
                </div>
                </div>

                <div className=" d_main_panel_review">
<div className="d_right_panal box_padding">
                <div className="d_title_box">
                <h3 className="d_main_title">Reviews</h3>
                <p className="d_main_sub_title">What our happy client Says <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                   
                    <Review/>
                  
                    
        </div> 
        </div>
         </div>
            </div>
        </div>
    </div>
    </section>

    {/* <Footer/> */}
    </>);
}
export default MugClub;