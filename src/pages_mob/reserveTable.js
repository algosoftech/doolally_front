import React from "react";
import Header from "../Header";
import Footer from "./Footer";

const reserveTable=()=>{
    return(

        <>
<div className="d_margin mb-4 pb-4">
        <Header/>

        
        <div className="mb-4 box_padding gry_bg_color profile-page" >
        <p className="d_main_title text-center"> Reserve a Table</p>
        <div className="row mt-4 " style={{paddingLeft:"12%"}} >

        
<div className="col-md-12 col-10  poppins">
    <div className="form-group">
    <label>Mug number</label><br/>
        <input type="text" className="control-input p_gray" id="formGroupExampleInput" placeholder="Enter between 100 and 9999" />
    </div>
</div>  

 
<div className="col-md-12 col-10  poppins">
    <div className="form-group">
    <label>Email address</label><br/>
        <input type="text" className="control-input p_gray" id="formGroupExampleInput" placeholder="Email address" />
    </div>
</div> 

<div className="col-md-12 col-10 poppins">
                      
                        <div className="form-group">
                        <label>Mobile number</label><br/>
                            <input type="number" className=" control-input p_gray" id="formGroupExampleInput" placeholder="Mobile number" />
                        </div>
                    </div>
                    <div className="col-md-12 col-10 poppins mt-2 ">
                        <div className="form-grop">        
                        <label> Taproom preference</label><br/>
                                    <select class="form-control" id="cityselection" required name="city">
                                                <option value="mumbai">Select taproom preference</option>                     
                                                
                                                 </select>
                                                 </div>
                                                 </div>
                                                 
                    <div className="col-md-12 col-10 poppins mt-2 ">
                        <div className="form-grop">        
                        <label> No. of seats</label><br/>
                                    <select class="form-control" id="cityselection" required name="city">
                                                <option value="mumbai">Select taproom preference</option>                     
                                                
                                                 </select>
                                                 </div>
                                                 </div>

                                                 <div className="col-md-12 col-10 poppins mt-2 ">
                        <div className="form-group  " >        
                        <label > Reserve date<br/>
<input type="date" placeholder="select a reserve date"  /></label>
                        </div>
                        </div>

                        <div className="col-md-12 col-10 poppins mt-2 ">
                        <div className="form-group ">        
                        <label> Reserve time</label><br/>
<input type="text" placeholder=" 05:35pm" className="control-input"/>
                        </div>
                        </div>



                        <div className="col-md-12 col-10 poppins mt-3 ">
                        <div className="form-grop">        
                        <label> Expected table choice !</label><br/>
                                    <select class="form-control mt-1" id="cityselection" required name="city">
                                                <option value="mumbai">Select expected table choice!</option>                     
                                                
                                                 </select>
                                                 </div>
                                                 </div>

                                                 <div className="form_check_box poppins mt-3">
                                    <label className="form_check_box_label">I have read and agree to the <a href="#"
                                            className="checkbox_link" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop">Table reservation guidelines.</a>
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>

                                <div className="col-10 mt-2">
                                <button className="d_comn_btn d-block d-md-inline-block" style={{marginLeft:"7px"}}>Submit</button>
                            </div>
</div>

        </div>
        <Footer/>
        </div>
        
        </>
    )
}
export default reserveTable;