import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee,faHouse,faPhone,faCartShopping,faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import MoreVertOutlinedIcon from '@material-ui/icons/MoreVertOutlined';

const Footer=()=>{
    return(
        <>
    <div className="footer ph-none">
  
  <div className="container">
    <div className='row justify-content-md-center'>
        
     <div className='col-md-auto' >About Us</div>
     <div className='col-md-auto'id="f-line" >|</div>
     <div className='col-md-auto'  >FNB</div>
     <div className='col-md-auto' id="f-line">|</div>
     <div className='col-md-auto' >Events</div>
     <div className='col-md-auto' id="f-line">|</div>
     <div className='col-md-auto' >Mug Club</div>
     <div className='col-md-auto' id="f-line" >|</div>
     <div className='col-md-auto' >Testimonials</div>
     
     
     
    </div>
  </div>

    <div className="row justify-content-md-center"  >
      <div className="col-md-auto ">
      Contact Us
      </div>
      <div className="col-md-auto " id="f-line">
        |
      </div>
      <div className="col-md-auto">
        Terms & Conditions
      </div>
      <div className="col-md-auto " id="f-line">
        |
      </div>
      <div className="col-md-auto">
        Privacy Policy 
      </div>
      <div className="col-md-auto "  id="f-line">
        |
      </div>
      <div className="col-md-auto">
        Refunds & Cancellations 
      </div>
    </div>
    </div>
  <div id='end-footer'>  
    <div className="text-center p-3 ph-none"  >
      © 2022 Copyrights :  
      <a   >DOOLALLY. All Rights Reserved </a>
    </div>
    </div>


    {/* footer for phone view*/}

    <div className="row ph-footer ds-none">
      <div className="col-1"></div>
<div className="col">
  <div className="c1">
<HomeOutlinedIcon/>
</div>
</div>
<div className="col ">
  <div className="c1">
<PhoneOutlinedIcon />
</div>
</div>
<div className="col ">
  <div className="c1">
<ShoppingCartOutlinedIcon/>
</div>
</div>
<div className="col text-end">
  <div className="c1">
<MoreVertOutlinedIcon/>
</div>
</div>  
</div>
    
  
        </>
    )
}

export default Footer;