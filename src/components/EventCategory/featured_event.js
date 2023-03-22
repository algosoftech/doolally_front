import React from "react";
import NavLink from "react-bootstrap/esm/NavLink";
 const  featured_event=(props)=>{
    return(
        <>
     <div className="col-6 col-md-6 col-lg-4">
                                        <div className="d_featured_events_box">
                                            <figure className="mb-0">
                                                <img src={props.image} alt="" />
                                                <span id="price-on-pic" className="poppins">Rs 1800/-</span>
                                            </figure>
                                            <div className="d_feat_event_cnt poppins">
                                                <p className="d_feat_event_title" style={{float:"left", top:"-20px", position:"relative"}}>{props.title}</p>
                                                <p className="d_feat_event_name">{props.name}</p>
                                                <ul className="d_feat_event_list">
                                     <li><img src={process.env.PUBLIC_URL + "/images/icons/ci_location.svg"} alt="" /> <span>Khar</span>
                                                    </li>
                                                    <li><img src={process.env.PUBLIC_URL + "/images/icons/bx_time-five.svg" }alt="" /> <span>10:00am </span>
                                                    </li>
                                                    <li><img src={process.env.PUBLIC_URL + "/images/icons/schedule-date.svg"} alt="" /> <span>Sat,Jun 25</span>
                                                    </li>
                                                    </ul>
                                                
                                            </div>
                                            <div className="d_feat_event_btn">
                                                <NavLink  className="d_reminder">Remind Me Later </NavLink>
                                                <button type="button"  className="d_book_event poppins">Book Event </button>
                                                <NavLink  className="bell">

                                                <img src={process.env.PUBLIC_URL + "/images/icons/bell1.jpg"} alt="ff" style={{width:"30px"}}  />
                                         
                                                
                                                 </NavLink>


                                            </div>
                                        </div>
                                    </div>
        </>
    );
}
export default featured_event;