import React from "react";
import Header from "../Header";

import Footer from "../pages/Footer";

const EventSubmit=()=>{
    return(
        <>

        <div className="d_margin mb-4 pb-4">
      <Header/>

        <section className="d_main_panel ">
        <div className="container-fluid">
            <div className="d_create_event d_right_panal box_padding black_heading">
                <div className="d_title_box">
                    <h6 className="d_main_sub_titl hglight" >Fill details & event will be live on doolally </h6>
                    <p className="p_gray poppins">To organise an event, please read the event guidelines and then fill up the form.</p>
                    
                </div>
                <div className="d_detail_heading hglight">
                     Personal Details
                </div>
                <div className="d_create_event_form login_page">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-12 poppins">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/user.png"}/>
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Your name" style={{disabledBorderColor:" null"}}/>
                                </div>
                            </div>
                            <div className="col-md-12 poppins">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/smartphone.png"}/>
                                    <input type="text" className="form-contol p_gray" id="formGroupExampleInput" placeholder="Phone number"/>
                                </div>
                            </div>
                            <div className="col-md-12 poppins  ">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/envelope.png"}/>
                                    <input type="text" className="form-conrol p_gray ml-1" id="formGroupExampleInput" placeholder="Email id"/>
                                </div>
                            </div>
                            <div className="col-md-12 poppins">
                                <div className="form-grou">
                                    <textarea className="form-control p_gray d_textarea" id="exampleFormControlTextarea1" rows="3" placeholder="Something about yourself (Optional)"></textarea>
                                </div>
                                <p className="p_gray poppins mt-md-4 mt-3 mb-md-4 mb-3">All events are reviewed and approved by Doolally. Once approved, we will create an Instamojo payment link and accept payments on your behalf.</p>
                                <div className="form_check_box poppins">
                                    <label className="form_check_box_label">I have read and agree to the <a href="#"
                                            className="checkbox_link" data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"style={{textDecoration:"none"}}>Event Guidelines.</a>
                                        <input type="checkbox"/>
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="d_comn_btn d-block d-md-inline-block">Submit event</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    </section>

    {/* <!-- modal --> */} 
    <div className="modal fade guidline_dtl" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg w-75">
            <div className="modal-content">
                <div className="modal-header border-0 pb-3">
                    <h5 className="modal-title w-100" id="staticBackdropLabel">General rules:</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body pt-0 monster">
                    <h3 className="d_modatl_title">Online Workshops</h3>
                    <ul className="d_modal_list">
                        <li>All events have to be open for all. (Participants below 21 will have to be accompanied by a parent/guardian)
                        </li>
                        <li>As an organiser you are free to price your workshop as seems suitable to you. Doolally will not charge any fees.
                        </li>
                        <li>Materials for the workshops should be something that would be easily accessible to the audience at home.
                        </li>
                        <li>We will promote your workshops on Instagram, Facebook and Twitter. The number of posts will be decided by our team.
                        </li>
                        <li>One of our community managers will be joining the zoom call during the event.
                        </li>
                        <li>The call link and password will be emailed to the organizer and the attendees prior to the event.
                        </li>
                        <li>The payment gateway charges while registering online for a paid event will be borne by the participants.
                        </li>
                        <li>As an event organizer, you cannot promote other brands by way of distributing freebies, or promotional material. You can, however, promote your own brand during the course of the workshop/event.
                        </li>
                    </ul>
                    <h3 className="d_modatl_title">Offline Workshops</h3>
                    <ul className="d_modal_list">
                        <li>All events have to be open for all. (Participants below 21 will have to be accompanied by a parent/guardian)
                        </li>
                        <li>As an organiser you are free to price your workshop as seems suitable to you. Doolally will not charge any fees.
                        </li>
                        <li>Materials for the workshops should be something that would be easily accessible to the audience at home.
                        </li>
                        <li>We will promote your workshops on Instagram, Facebook and Twitter. The number of posts will be decided by our team.
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    </div>


<div className="desktop">
<Footer/>
</div>
</div>
        </>
    );
}

export default EventSubmit;