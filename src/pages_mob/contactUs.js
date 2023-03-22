import React from "react";
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";



const contactUs=()=>{
    return(<div className="container-fluid">
    
    <div className="d_margin mb-4 pb-4">
      <Header/>

        <section className="d_main_panel ">
        <div className="container-fluid">
            <div className="d_create_event d_right_panal box_padding black_heading">
               
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



<div className="desktop">
<Footer/>
</div>
</div>

    </div>)
}


export default contactUs;