import React from "react";
import Header from "../Header";


const feedBack=()=>{
    return(

<>
<Header/>
<div className="box_padding profile-page">


<p className=" d_main_title">
     Send feedback
</p>
<p className=" poppins">
    tells us what you love about the app and our  orders, or what we could be doing better
</p>

<div class="form-outline">
  <textarea class="form-control" id="textAreaExample1" rows="4"></textarea>

</div>
<div className="col-md-12 mt-2">
                                <button className="d_comn_btn d-block d-md-inline-block">Submit</button>
                            </div>
</div>
</>

    )
}

export default feedBack;