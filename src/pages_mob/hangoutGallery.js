import React from "react";
import Header from "../Header";
import Footer from "./Footer"



const HangoutGallery=()=>{
    return(
<>
<div className="d_margin mb-4 pb-4">
<Header/>

{/* searchbar */}
<div className=" col-6 search_order ds-none ">
    <input type="text" class="  form-controll item_search_txt" placeholder="Search for event, beer & delicious food" />
    <img src={process.env.PUBLIC_URL + "/images/icons/search-icon.png" }alt="search-icon" style={{width:"20px", marginTop:"-4px"}}/>
 </div> 

{/* title section */}
<div className="container">
<div className="mt-4">
<p className="d_main_title"> Pet friendly</p>
<p className="d_main_sub_title">Multi events & exciting funs</p>
</div>

{/* gallery section */}
<div className=" row g-2 gallery">
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h4.png"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h8.png"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/wh3.jpeg"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h4.png"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h4.png"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h8.png"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/wh3.jpeg"}/>
<img className="col-6 col-md-4" src={process.env.PUBLIC_URL + "/images/h4.png"}/>
</div>
</div>


<Footer/>
</div>

</>

    )
}

export default HangoutGallery;