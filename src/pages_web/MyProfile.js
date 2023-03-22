import React from "react";
// import Header from "../Header"
// import Footer from "./Footer";

import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
const MyProfile = () => {

    return (
        <>
<div className="container-fluid">
            <Header />
           
                <div className=" box_padding gray_bg_color profile-page" id="profile-page-design" >
                   <div className="text-center">
                   <img src={process.env.PUBLIC_URL + "/images/profile.jpg"}  id="user_pro_pic"/>
                   <br/> <strong>My Profile</strong>
                    </div> 
                    <form className="profile-form" style={{margin:"0px auto"}}>
                    <div className="row " >

        
                            <div className="col-md-12 col-10  poppins" >
                                <div className="form-group">
                                <label>Name</label><br/>
                                    <input type="text" className="control-input p_gray" id="formGroupExampleInput" placeholder="Enter Your Name" style={{width:"280px"}}  />
                                </div>
                            </div>  
                  

                       
                        <div className="col-md-12 col-10 poppins">
                      
                        <div className="form-group">
                        <label>Mobile Number</label><br/>
                            <input type="number" className=" control-input p_gray" id="formGroupExampleInput" placeholder="Mobile Number" style={{width:"280px"}}  />
                        </div>
                    </div>
       
                    <div className="col-md-12 col-10 poppins">
                       
                        <div className="form-group">
                        <label>           Email Address</label><br/>
                            <input type="email" className="control-input p_gray" id="formGroupExampleInput" placeholder="Email Address" required style={{width:"280px"}}  />
                        </div>
                    </div>

                    <div className="col-md-12 col-10 poppins">
                      
                        <div className="form-group">
                     
                    <label>Address</label><br/>
                            <input type="password" className="control-input p_gray" id="formGroupExampleInpu" placeholder="Enter Address" style={{width:"280px"}} />
                        </div>
                    </div>
                    
                    <div className="col-md-12 col-10  mt-4  text-center">

                        <button className="d_comn_btn d-block d-md-inline-block  ">Update details</button>
                    </div>
                    </div>
                    
            {/* <img className="mb-4 pb-4 mt-4" src={process.env.PUBLIC_URL + "/images/membership.png"} id="profile" /> */}

            </form>
                </div>

          </div>  
          <Footer/>
        </>
    )
}
export default MyProfile;