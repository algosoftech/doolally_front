import React from "react";
import Header from "../Header";
import Footer from "./Footer";
import Review from "../Sliders/Review";

const Testimonial =()=>{
    return(
        <>
       
                 <Header/>

                 <div className="mb-4 pb-4" >



                 <div className="home-1st-col d-flex justify-content-around poppins pt-3  mt-4">

<p > <img src={process.env.PUBLIC_URL + "/images/buy.png"} className="h-1st-col" /> <br/> Buy now</p>
<p  > <img src={process.env.PUBLIC_URL + "/images/cheers.png"} className="h-1st-col" /><br/>Events</p>
<p  ><img src={process.env.PUBLIC_URL + "/images/map-pointer.png"}  className="h-1st-col"   /> <br/>Locations</p>
</div>

<div className="d_main_title mt-4 text-center">Testimonials</div>
<div className="d_main_sub_title mb-3 mt-4 ">Our latest reviews  <span class="d_line"></span><span class="d_round"></span><span class="d_round"></span><span class="d_round"></span>
</div>

<Review/>

<div className="d_main_sub_title mb-3 mt-4 "> Mumbai customer reviews <span class="d_line"></span><span class="d_round"></span><span class="d_round"></span><span class="d_round"></span>
</div>

<Review/>

<div className="d_main_sub_title mb-3 mt-4 "> Pune customer reviews <span class="d_line"></span><span class="d_round"></span><span class="d_round"></span><span class="d_round"></span>
</div>
<div className="mb-4 pb-4"><Review /></div>

        </div >
        <Footer/>
        </>
    )
}

export default Testimonial;