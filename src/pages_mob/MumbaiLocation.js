import React from "react";
import Header from "../Header";
import Review from "../Sliders/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot} from '@fortawesome/free-solid-svg-icons';
import Footer from "./Footer";

const MumbaiLocation=()=>{
    return(
<>

<div className="d_margin mb-4 pb-4" >
<Header/>

<div className=" col-6 search_order ">
                                <input type="text" class="  form-controll item_search_txt" placeholder="Search for event, beer & food" />
                                <img src={process.env.PUBLIC_URL + "/images/icons/search-icon.png" }alt="search-icon" style={{width:"20px", marginTop:"-4px"}}/>

                            </div>
<div className=" ds-none  home-1st-col d-flex justify-content-center poppins  mt-2 " style={{margin:"1px auto"}}>

<p> <img src={process.env.PUBLIC_URL + "/images/mumbai.png"} className="h-1st-col" alt="mumbai"/> <br/>Mumbai</p>

<p> <img src={process.env.PUBLIC_URL + "/images/pune.png"} className="h-1st-col" alt="pune"/> <br/>Pune</p>
{/* <p> <img src={process.env.PUBLIC_URL + "/images/pune.png"} className="h-1st-col"/><br/>Pune</p> */}

</div>

<div className="ds-none d_main_panel_review mt-4">
<div className="d_right_panl box_paddng">
                <div className="d_title_box">
                <h3 className="d_main_title">Latest reviews</h3>
                <p className="d_main_sub_title">Beer reviews, food ratings experiences  <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                   
                    <Review/>
                  
                    
        </div> 


  
     
        <h3 className="d_main_title">Mumbai customer reviews </h3>     
<div className="d_main_sub_title mb-3  ">What's the word on the street  <span class="d_line"></span><span class="d_round"></span><span class="d_round"></span><span class="d_round"></span>
</div>

<Review/>

</div>
</div>




<div class="d-flex food-menu mt-4">
<div >
<h5 className="poppins"> Taproom in Khar</h5>
<img src={process.env.PUBLIC_URL + "/images/icons/star.jpg"} style={{width:"60px",margin:"0px auto", marginTop:"-20px"}}/>
<p style={{fontSize:"14px", color:'grey', width:"200px"}}>All of Belgium’s modern brewing  can be traced to sustenance brewing, either on the family farm or in monasteries. The witbier style, also known as bière blanche in the French</p>

</div>

<div className="text-center" > 
<FontAwesomeIcon icon={faLocationDot} style={{marginLeft:"90px", marginBottom:"-13px",position:"relative", color:"#9BC059", fontSize:"30px"}}/>
<img src={process.env.PUBLIC_URL + "/images/map.png"} style={{ width:"120px",height:"125px", marginTop:"-20px"}}/>

    <br/> 

   <strong >Taproom in Khar</strong>
   <p style={{fontSize:"14px", color:'grey'}}>10:00am-12:00pm</p>
</div>


</div>
<div class="d-flex food-menu ">
<div >
<h5 className="poppins"> Taproom in Andheri</h5>
<img src={process.env.PUBLIC_URL + "/images/icons/star.jpg"} style={{width:"60px",margin:"0px auto", marginTop:"-20px"}}/>
<p style={{fontSize:"14px", color:'grey', width:"200px"}}>All of Belgium’s modern brewing  can be traced to sustenance brewing, either on the family farm or in monasteries. The witbier style, also known as bière blanche in the French</p>

</div>

<div className="text-center" > 
<FontAwesomeIcon icon={faLocationDot} style={{marginLeft:"90px", marginBottom:"-13px",position:"relative", color:"#9BC059", fontSize:"30px"}}/>
<img src={process.env.PUBLIC_URL + "/images/map.png"} style={{ width:"120px",height:"125px", marginTop:"-20px"}}/>

    <br/> 

   <strong >Taproom in Andheri</strong>
   <p style={{fontSize:"14px", color:'grey'}}>10:00am-12:00pm</p>
</div>


</div>
<div class="d-flex food-menu">
<div >
<h5 className="poppins"> Taproom in Dadar</h5>
<img src={process.env.PUBLIC_URL + "/images/icons/star.jpg"} style={{width:"60px",margin:"0px auto", marginTop:"-20px"}}/>
<p style={{fontSize:"14px", color:'grey', width:"200px"}}>All of Belgium’s modern brewing  can be traced to sustenance brewing, either on the family farm or in monasteries. The witbier style, also known as bière blanche in the French</p>

</div>

<div className="text-center" > 
<FontAwesomeIcon icon={faLocationDot} style={{marginLeft:"90px", marginBottom:"-13px",position:"relative", color:"#9BC059", fontSize:"30px"}}/>
<img src={process.env.PUBLIC_URL + "/images/map.png"} style={{ width:"120px",height:"125px", marginTop:"-20px"}}/>

    <br/> 

   <strong >Taproom in Dadar</strong>
   <p style={{fontSize:"14px", color:'grey'}}>10:00am-12:00pm</p>
</div>


</div>
<div class="d-flex food-menu mb-4">
<div >
<h5 className="poppins"> Taproom in Thane</h5>
<img src={process.env.PUBLIC_URL + "/images/icons/star.jpg"} style={{width:"60px",margin:"0px auto", marginTop:"-20px"}}/>
<p style={{fontSize:"14px", color:'grey', width:"200px"}}>All of Belgium’s modern brewing  can be traced to sustenance brewing, either on the family farm or in monasteries. The witbier style, also known as bière blanche in the French</p>

</div>

<div className="text-center" > 
<FontAwesomeIcon icon={faLocationDot} style={{marginLeft:"90px", marginBottom:"-13px",position:"relative", color:"#9BC059", fontSize:"30px"}}/>
<img src={process.env.PUBLIC_URL + "/images/map.png"} style={{ width:"120px",height:"125px", marginTop:"-20px"}}/>

    <br/> 

   <strong >Taproom in Thane</strong>
   <p style={{fontSize:"14px", color:'grey'}}>10:00am-12:00pm</p>
</div>


</div>

<Footer/>
</div>

</>

    )
}

export default MumbaiLocation;