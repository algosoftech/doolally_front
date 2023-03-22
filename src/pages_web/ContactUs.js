import React from "react";
import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";

const ContactUs = () => {
    return (
        <>

<div className="container-fluid">
            <Header />
            <section className="d_main_panel ">
        <div className="container-fluid">
            <div className="d_create_event d_right_panal box_padding black_heading">
               
                <div className="d_detail_heading hglight text-center">
                     Personal Details
                </div>
                <div className="d_create_event_form login_page">
                    <form>
                        <div className="row g-3">
                            <div className="col-md-12 ">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/user.png"} style={{width:"15px"}}/>
                                    <input type="text" className="form-contro p_gray" id="formGroupExampleInput" placeholder="Your name" style={{disabledBorderColor:" null"}}/>
                                </div>
                            </div>
                            <div className="col-md-12 ">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/smartphone.png"}  style={{width:"20px"}}/>
                                    <input type="text" className="form-contol p_gray" id="formGroupExampleInput" placeholder="Phone number"/>
                                </div>
                            </div>
                            <div className="col-md-12   ">
                                <div className="form-group">
                                <img src={process.env.PUBLIC_URL + "/images/icons/envelope.png"} style={{width:"13px"}}/>
                                    <input type="text" className="form-conrol p_gray ml-1" id="formGroupExampleInput" placeholder="Email id"/>
                                </div>
                            </div>
                            <div className="col-md-12 d-flex justify-content-center " style={{marginLeft:"-8.7px"}} >
                                <div className="form-groupp" >
                                    <textarea className="form-contrl p_gray d_textarea" id="exampleFormControlTextarea1" rows="2" cols="33" placeholder="Something about yourself (Optional)" style={{borderRadius:"5px" , outline:"none" , border:" 1px solid #63636365", padding:"3%"}}></textarea>
                                </div>
                               
                            </div>
                            <div className="col-md-5 text-center" style={{margin:"10px auto"}}>
                                <button className="d_comn_btn ">Submit event</button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>

        </div>
    </section>

</div>

            <Footer />
        </>
    )
}

export default ContactUs;