import React from "react";

import Footer from "./Footer";

import Header from "../Header";



const EventSave=()=>{
    return(

        <>
          
   <Header/>

     
   <section className="d_main_panel  d_margin" >
        <div className="container-fluid">
            <div className="d_create_event d_right_panal box_padding black_heading">
                <div className="d_title_box">
                    <p className="d_main_sub_title">Create an event <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                    </p>
                    <p className="p_gray poppins" style={{marginTop:'7px'}}>To organise an event, please read the event guidelines and then fill up the form.</p>
                </div>
                <div className="d_upload_img">
                    <div className="file-upload">
                        {/* <!-- <button className="file-upload-btn" type="button" onclick="$('.file-upload-input').trigger( 'click' )">Add Image</button> --> */}

                        <div className="image-upload-wrap">
                            <input className="file-upload-input" type='file' onchange="readURL(this);" accept="image/*" />
                            <div className="drag-text">
                                <img src={process.env.PUBLIC_URL + "/images/icons/upload_camera.svg"} alt=""/>
                                <p className="p_gray poppins">Add a cover photo</p>
                                <p className="img_dimen poppins"> Max Image Dimension 1200x1200 pixels</p>
                            </div>
                        </div>
                        <div className="file-upload-content">
                            <img className="file-upload-image" src="#" alt="your image" />
                            <div className="image-title-wrap">
                                <button type="button" onclick="removeUpload()" className="remove-image">Remove <span
                                        className="image-title">Uploaded Image</span></button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d_create_event_form">
                    {/* <form> */}

                        <div className="row g-3 poppins">
                            <div className="col-md-12">
                            <label>Name of event</label>
                                <div className="form-group">
                                   
            <input type="text" className=" p_gray" id="formGroupExampleInput" placeholder="Name of event"/>
                                </div>
                            </div>
                            <div className="col-md-12">
                            <label>Describe your event...</label>
                                <div className="form-gro  pt-3">
                                    <textarea rows="8" className="form-control p_gray d_textarea" id="exampleFormControlTextarea1"  placeholder="Describe your event..."  ></textarea>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <label>Date of event</label>
                                <div className="form-group">
 <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Date of event" onfocus="(this.type='date')" onblur="(this.type='text')"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <label>Start time</label>
                                <div className="form-group">
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Start time" onfocus="(this.type='time')" onblur="(this.type='text')"/>
                                </div>
                            </div>
                            <div className="col-md-4">
                            <label>End time</label>
                                <div className="form-group">
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="End time" onfocus="(this.type='time')" onblur="(this.type='text')"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <label>Event place</label>
                                <div className="form-group">
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Event place"/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <label>Capacity of event</label>
                                <div className="form-group">
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Capacity of event"/>
                                </div>
                            </div>
                        </div>
                        <div className="d_free_or_paid">
                            <div className="d_title_box">
                                <h3 className="d_main_title">Is the event Free or Paid?</h3>
                                </div>
                            </div>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="d_custome_raido"><span className="d_paid monster">Paid</span>
                                        <input type="radio" checked="checked" name="radio"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <p className="p_gray poppins">For paid events, we charge an additional Rs 300 per attendee which includes a pint or house fries.</p>
                                </div>
                                <div className="col-md-6">
                                    <label className="d_custome_raido"><span className="d_paid monster">Free</span>
                                        <input type="radio" name="radio"/>
                                        <span className="checkmark"></span>
                                    </label>
                                    <p className="p_gray poppins">If you don't charge, we don't charge</p>
                                </div>
                                <div className="col-md-6">  <label>Event Fees</label>
                                    <div className="form-group poppins">
                                        <input type="text" className="form-contrl p_gray" id="formGroupExampleInput" placeholder="Event Fees"/>
                                    </div>
                                </div>
                                <div className="col-md-6 d-flex align-items-center">
                                    <p className="p_gray poppins">( + Rs 300 Doolally Fee) Total Price: Rs. 0</p>
                                </div>
                                <div className="col-md-12 d-flex align-items-center justify-content-end">
                                    <button className="d_comn_btn d-block d-md-inline-block">Save event</button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

            </section>
            <div id="footer-desktop">
       <Footer /> 
   </div>
</>
    );
}

       



export default EventSave;