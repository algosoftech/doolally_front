import React from "react";
import NavLink from "react-bootstrap/esm/NavLink";
import { Link } from "react-router-dom";
import { format, isValid } from 'date-fns'

import { eventImageBaseUrl, EVENT } from '../../config/constant';
import {showCorrectImage, numberWithCommas} from '../../utils/Common';

 const  featured_event=(props)=>{
    return(
        <>
            <div className="col-md-6 col-lg-4">
                <div className="d_featured_events_box">
                    <figure className="mb-0">
                        <Link to={'/event-details/'+props.eventsData.eventSlug}>
                            {/* <img src={eventImageBaseUrl+'thumb/'+props.eventsData.eventImage} alt="" /> */}
                            <img src={showCorrectImage(props.eventsData.eventImage)} alt={props.eventsData.eventName} />
                        </Link>
                    </figure>
                    <div className="d_feat_event_cnt poppins">
                        <Link to={'/event-details/'+props.eventsData.eventSlug}><p className="d_feat_event_title">{props.eventsData.eventName}</p></Link>
                        <p className="d_feat_event_name">By {props.eventsData.creatorName}</p>
                        <ul className="d_feat_event_list">
                            <li>
                                <a href={props.eventsData.mapLink} target="_blank"><img className="location" src={process.env.PUBLIC_URL + "/images/icons/ci_location.svg"} alt="" /> 
                                    {props.eventsData.customLocation ? (
                                        <span>{props.eventsData.customLocation}</span>
                                    ) : props.eventsData.isSpecialEvent == EVENT.STATUS_YES ? (
                                        <span>1st Brewhouse, Pune</span>
                                    ) : props.eventsData.isEventEverywhere == EVENT.STATUS_YES && props.eventsData.eventId == 2530 ? (
                                        <span>All Taprooms</span>
                                    ) : props.eventsData.at_multiple_locations == EVENT.STATUS_YES ? (
                                        <span>Multiple Taprooms</span>
                                    ) : props.eventsData.locName == 'sanpada' ? (
                                        <span>Palm Beach Rd</span>
                                    ) : (
                                        <span>{props.eventsData.locName}</span>
                                    )}
                                </a>
                            </li>
                            {props.eventsData.showEventDate == EVENT.STATUS_YES &&
                                <li><img src={process.env.PUBLIC_URL + "/images/icons/bx_time-five.svg" }alt="" /> <span>{props.eventsData.startTime}</span></li>
                            }
                            {props.eventsData.showEventTime == EVENT.STATUS_YES &&
                                <li><img src={process.env.PUBLIC_URL + "/images/icons/schedule-date.svg"} alt="" /> <span>{format(new Date(props.eventsData.eventDate),'iii, LLL dd')}</span></li>
                            }
                            {props.eventsData.showEventPrice == EVENT.STATUS_YES &&
                                <li><img src={process.env.PUBLIC_URL + "/images/icons/bx_rupee.svg" }alt="" /> 
                                    {props.eventsData.costType == 1 ?(
                                        <span>Free</span>
                                    ) : (
                                        <span>Rs {numberWithCommas(props.eventsData.eventPrice)}</span>
                                    )}
                                </li>
                            }
                        </ul>
                    </div>
                    <div className="d_feat_event_btn">
                        {props.eventsData.eventType !== 'Internal' &&
                            <NavLink className="d_reminder">Remind Me Later </NavLink>
                        }
                        <NavLink className="d_book_event">Book Event </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
}
export default featured_event;