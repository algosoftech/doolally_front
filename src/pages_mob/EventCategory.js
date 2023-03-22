import React, { useState ,useEffect} from "react";

import Product_box from "../components/EventCategory/product_box";
import Featured_event from "../components/EventCategory/featured_event";
import Footer from "../pages/Footer";

import Header from "../Header";

const EventCategory = () => {
const [findNExpss,setFindNExpss]=useState([]);
const [dFeatureEvent,setDFeatureEvent]=useState([]);

useEffect(()=>{
    getData();
})


const getData= async()=>{
    // here Api call for event category page
    let result=await fetch('http//localhost:3000/eventCategory');
    result=await result.json();
    setFindNExpss(result.dataforsection1);
    setDFeatureEvent(result.dataforsection2);
 
}
    return (
    <>
<Header/>
        <section className="d_main_panel">
            <div className="container-fluid">
                <div className="row">

                    <div className="col-lg-9 mb-4">
                        <div className="d_find_event box_padding gray_bg_color">
                            <div className="d_title_box">
                                <p className="d_main_sub_title">Find new experiences <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                                </p>
                            </div>
                            <div className="d_hangout_box">
                                <div className="d_event_expert">
                                    {findNExpss.map((item,index)=>
                                    <Product_box key={index} name={item.name} image={item.image}/>
                                    )}     
                                    
                                      </div>
                            </div>
                        </div>
                        <div className="d_find_event box_padding gray_bg_color">
                            <div className="d_title_box">
                                <p className="d_main_sub_title">Featured Events <span className="d_line"></span><span className="d_round"></span><span className="d_round"></span><span className="d_round"></span>
                                </p>
                            </div>
                            <div className="d_featured_events">

                                <div className="row g-4">
{dFeatureEvent.map((item,index) =>



                                    <Featured_event key={index} image={item.image}title="Honey & Money Masterclass" name="By Akruti Agarwal" />
                                    )}  </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="d_event_sidepanel mb-4">
                            <figure className="mb-0">
                                <img src={process.env.PUBLIC_URL + "/images/andheri-doolally.png"} alt="" />
                            </figure>
                            <div className="d_btn">Submit event</div>
                        </div>
                        <div className="d_event_sidepanel d_private_party">
                            <figure className="mb-0">
                                <img src={process.env.PUBLIC_URL + "/images/Frame.png"} alt="" />
                            </figure>
                            <div className="d_comn_btn">Book your party</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>

    </>);
}

export default EventCategory;