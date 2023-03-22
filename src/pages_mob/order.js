import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header"
const order = () => {

    return (
        <>

            <Header />
            <div className=" box_padding gray_bg_color order-page" >

          <center><img src={process.env.PUBLIC_URL + "/images/splashLogo.png" }alt="logo" style={{width:"6rem"}}/></center> 
            <h4 className="text-center mt-4">Search your delivery location</h4>
                <div class="row profile-form">
                  <div class="col-md-12 col-sm-12 col-lg-12 col-xs-12 col-xl-12 col-12">
                    <div class=" mt-4 form-grou form-control-div select-dropdown select-city-drop citydiv">
                      <select class="form-control" id="cityselection" required name="city">
                                                <option value="mumbai">Mumbai</option>                      </select>
                      {/* <!--<div class="alert-div alert alert-danger" role="alert">
                          Please select City
                      </div>--> */}
</div>
<div class=" mt-3 forgroup form-control-div select-dropdown enter-your-location-drop locationdiv">
                      <select class="form-control" id="locationselection" required name="location">
                        <option value="">Select your location</option>
                      </select>
                    </div>

                    <div class=" mt-3   form-grou form-control-div select-dropdown select-branch-drop branchdiv">
                      <select class="form-control" id="branchselection" required name="branch">
                        <option value="">Select branch</option>
                      </select>
                    </div>
                    <div className="row">
                      <div className="col-md col-10 pick-up">
                      
                      <img src={process.env.PUBLIC_URL + "/images/icons/pickup.svg" }alt="logo"  style={{width:"25px",float:"right"}}/>
                                        <label className="d_custome_raido"><span className="d_paid monster poppins">Pickup</span>
                                            <input type="radio"  name="radio"/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                    

                      <div className="col-md col-10 pick-up">

                      <img src={process.env.PUBLIC_URL + "/images/icons/home-delivery.svg" }alt="logo"  style={{width:"30px", float:"right"}}/>
                      <label className="d_custome_raido"><span className="d_paid monster poppins">Home delivery</span>
                      <input type="radio"  name="radio"/>
                                            <span className="checkmark"></span>
                      </label>
                      </div>

                    </div>
                
                    <div class="row deliveryprefdiv">
                <div class="col">
                                    <button type="button" class="col-md-5 col-12 btn btn-primary btn-lg mr-2 colorcodeclass" id="ordernowbtn" >
                    <span class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="37.453" height="28.209" viewBox="0 0 28.453 35.209"><g transform="translate(-0.5 0)"><path  d="M220.141,0a1.176,1.176,0,0,0-1.176,1.176V8.044h-2.721V1.176a1.176,1.176,0,0,0-2.353,0V8.044h-2.721V1.176a1.176,1.176,0,0,0-2.353,0v9.709a6.278,6.278,0,0,0,2.931,5.3V31.889a3.319,3.319,0,0,0,6.639,0V16.18a6.278,6.278,0,0,0,2.93-5.295V1.176A1.176,1.176,0,0,0,220.141,0Zm-1.176,10.885a3.914,3.914,0,0,1-2.252,3.533,1.177,1.177,0,0,0-.678,1.066v16.4a.967.967,0,0,1-1.934,0v-16.4a1.176,1.176,0,0,0-.679-1.066,3.914,3.914,0,0,1-2.252-3.533V10.4h7.795Zm0,0" transform="translate(-192.364)"/><path class="a" d="M6.982,0C3.347,0,.5,4.28.5,9.745c0,3.67,1.284,6.806,3.229,8.47A5.457,5.457,0,0,0,1.52,22.6v9.238a3.333,3.333,0,0,0,3.2,3.368l.122,0a3.32,3.32,0,0,0,3.317-3.32V1.176A1.176,1.176,0,0,0,6.982,0ZM2.852,9.745A10.474,10.474,0,0,1,4.23,4.305,4.768,4.768,0,0,1,5.806,2.678V16.812A4.768,4.768,0,0,1,4.23,15.184a10.473,10.473,0,0,1-1.378-5.44ZM5.806,31.889a.967.967,0,0,1-1,.966,1,1,0,0,1-.93-1.017V22.6A3.115,3.115,0,0,1,5.806,19.72Zm0,0" transform="translate(0 0)"/></g></svg> 
                    </span>
                    <span class="text">Order for later</span>
                  </button>
                                                
                                                   <button type="submit" class="col-md-5 col-12 btn btn-primary btn-lg ml-2 mr-4 colorcodeclass" id="ordernowbtn"  > 
                    <span class="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="37.453" height="24.832" viewBox="0 0 37.187 24.832"><defs><style></style></defs><path class="a" d="M11.122,47.047v2.869H48.309V47.047Zm35.224-3.755a16.873,16.873,0,0,0-15.2-16.235V25.084H28.281v1.973a16.873,16.873,0,0,0-15.2,16.235l-.068,1.5h33.4ZM16.1,41.923A13.907,13.907,0,0,1,29.715,29.86a13.907,13.907,0,0,1,13.62,12.062Z" transform="translate(-11.122 -25.084)"/></svg>
                    </span>
                   <Link to="/menu" style={{textDecoration:"none" , color:"white",}}><span class="text" > Order now</span></Link> 
                  </button>
                  </div>                             
                    </div>
                    </div>
                    </div>
                    


</div>

</>
    );
};

export default order;