import React from "react";
import Header from "../Header"
import Footer from "./Footer";
const myProfile = () => {

    return (
        <>

            <Header />
           
                <div className=" box_padding gray_bg_coor profile-page mb-4" >
                   <div className="text-center">
                   <img src={process.env.PUBLIC_URL + "/images/icons/user.png"} />
                    <p>My Profile</p>
                    </div> 
                    <form className="profile-form">
                    <div className="row " style={{marginLeft:"10%"}}>

        
                            <div className="col-md-12 col-10  poppins">
                                <div className="form-group">
                                <label>Name</label><br/>
                                    <input type="text" className="control-input p_gray" id="formGroupExampleInput" placeholder="Enter Your Name" />
                                </div>
                            </div>  
                  

                       
                        <div className="col-md-12 col-10 poppins">
                      
                        <div className="form-group">
                        <label>Mobile Number</label><br/>
                            <input type="number" className=" control-input p_gray" id="formGroupExampleInput" placeholder="Mobile Number" />
                        </div>
                    </div>
       
                    <div className="col-md-12 col-10 poppins">
                       
                        <div className="form-group">
                        <label>           Email Address</label><br/>
                            <input type="email" className="control-input p_gray" id="formGroupExampleInput" placeholder="Email Address" required />
                        </div>
                    </div>

                    <div className="col-md-12 col-10 poppins">
                      
                        <div className="form-group">
                     
                    <label>Address</label><br/>
                            <input type="password" className="control-input p_gray" id="formGroupExampleInpu" placeholder="Enter Address" />
                        </div>
                    </div>
                    
                    <div className="col-md-12 col-10  mt-2  text-center">

                        <button className="d_comn_btn d-block d-md-inline-block poppins ">UPDATE DETAILS</button>
                    </div>
                    </div>
                    
            <img className="mb-4 pb-4 mt-4" src={process.env.PUBLIC_URL + "/images/membership.png"} id="profile" />

            </form>
                </div>
<Footer/>
            
        </>
    )
}
export default myProfile;