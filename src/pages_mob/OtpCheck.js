import React from "react";
import { Link } from "react-router-dom";


const OtpCheck=()=>{

    return(
        <>
  {/* <Header/> */}
<div className="login_page">



        <section className="d_main_panel">
        <div className="container">
            <div class="d_create_event  box_padding ">
                <div class="d_title_box">
                    <p id ="dirty_hedline_font" style={{fontSize:"25px"}}>
                        
                    <div className="h-center justify-content-center">
    <img src={process.env.PUBLIC_URL + "/images/splashLogo.png" }alt="logo"  style={{width:"90px"}}/><br/>
    <span class="d_line "></span><span class="d_line"></span>
    </div> </p>
                         
                    <span  id="Averia_font"style={{fontWeight:"600", fontSize:"20px", marginLeft:"50px"}} >Awesome , Thanks   </span>
                  <br/> 
                   <span style={{marginLeft:"70px"}}>Please enter OTP</span> 
                 
                </div>
               
                    <form>
                        <div class="row g-3">
                            <div class="col-12 poppins">
                                <div class="form-group">
                               <img src={process.env.PUBLIC_URL + "/images/icons/user.png"}/>
                                    <input type="text" className="p_gray" id="formGroupExampleInput" placeholder="Enter OTP" required />
                                </div>
                            </div>

                            <div className="col-md-12 text-center">
                            <Link to="/signUp">         <button className="d_comn_btn ">Next</button></Link>
                            </div>

                        </div>
                    </form>
             

            </div>

        </div>
    </section>


</div>

        </>
    );
}
export default OtpCheck;