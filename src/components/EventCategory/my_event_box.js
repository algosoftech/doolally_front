import React, {useState} from "react";
import NavLink from "react-bootstrap/esm/NavLink";
import { Link } from "react-router-dom";
import { format, isValid } from 'date-fns'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { eventImageBaseUrl, EVENT, NEW_DOOLALLY_FEE } from '../../config/constant';
import {isEventFinished, isEventStarted, isEventApproved, numberWithCommas} from '../../utils/Common';

 const featured_event=(props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const finalTds = 0;
    return(
        <>
            <div className="col-md-6 col-lg-6">
                <div className="d_featured_events_box">
                    <figure className="mb-0">
                        <img src={eventImageBaseUrl+'thumb/'+props.eventsData.eventImage} alt="" />
                    </figure>
                    <div className="d_feat_event_cnt poppins" style={{ display:"block" }}>
                        <p className="d_feat_event_title">{props.eventsData.eventName}</p>
                        <p className="d_feat_event_name">
                            {props.eventsData.ifApproved == EVENT.DECLINED ? (
                                <p>Event Declined!</p>
                            ) : props.eventsData.ifApproved == EVENT.WAITING ? (
                                <p>Review In Progress...</p>
                            ) : props.eventsData.ifApproved == EVENT.APPROVED && props.eventsData.ifActive == EVENT.ACTIVE ? (
                                <p>Event Approved!</p>
                            ) : props.eventsData.ifApproved == EVENT.APPROVED && props.eventsData.ifActive == EVENT.NOT_ACTIVE ? (
                                <p>Event Approved But Not Active</p>
                            ) : isEventFinished(props.eventsData.eventDate,props.eventsData.endTime) ? (
                                <p>Event Completed</p>
                            ) : (
                                <p>&nbsp;</p>
                            )}
                        </p>
                        <div className="mdl-grid text-center host-main-specs">
                            <div className="mdl-cell--12-col eventDash-stats">
                                <ul className="list-inline">
                                    <li id="show-host-earnings" data-evecost="1">
                                        <h4 className="dashboard-stats">
                                            {props.eventsData.costType == 1 ? (
                                                <p>Free</p>
                                            ) : (
                                                'Rs '+numberWithCommas(props.eventsData.eventPrice*props.eventsData.totalQuant)
                                            )}
                                        </h4>
                                        <span>Amount Collected</span>
                                    </li>
                                    <li>
                                        <div className="dash-spacer"></div>
                                    </li>
                                    <li id="show-host-attendees">
                                        <h4 className="dashboard-stats">
                                            {props.eventsData.totalQuant > 0 ? (
                                                props.eventsData.totalQuant
                                            ) : (
                                                0
                                            )}
                                        </h4>
                                        <span>Attending</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {props.eventsData.costType != 1 ? (
                            <div className="host-event-segregation">
                                <div className="common-head-title">
                                    <span>Deductions</span>
                                </div>
                                <div className="custom-host-card mdl-shadow--2dp">
                                    <div className="mdl-card__supporting-text">
                                        <ul className="demo-list-icon mdl-list">
                                            <li className="mdl-list__item">
                                                <span className="pull-left cost-heading">
                                                    Collected from signups
                                                </span>
                                                <span className="pull-right">+ Rs. {numberWithCommas(props.eventsData.eventPrice*props.eventsData.totalQuant)}</span>
                                            </li>
                                        </ul>

                                    </div>
                                </div>
                                {finalTds != 0 ? (
                                    <div className="custom-host-card mdl-shadow--2dp">
                                        <div className="mdl-card__supporting-text">
                                            <ul className="demo-list-icon mdl-list">
                                                <li className="mdl-list__item">
                                                    <span className="pull-left cost-heading">
                                                        TDS
                                                    </span>
                                                    <span className="pull-right">- Rs. {numberWithCommas(finalTds)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="custom-host-card mdl-shadow--2dp">
                                    <div className="mdl-card__supporting-text">
                                        <ul className="demo-list-icon mdl-list">
                                            <li className="mdl-list__item">
                                                <span className="pull-left cost-heading">
                                                    FnB Coupon(s)
                                                </span>
                                                <span className="pull-right">- Rs. {numberWithCommas(props.eventsData.totalQuant*NEW_DOOLALLY_FEE)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {props.prevCharges != 0 ? (
                                    <div className="custom-host-card mdl-shadow--2dp">
                                        <div className="mdl-card__supporting-text">
                                            <ul className="demo-list-icon mdl-list">
                                                <li className="mdl-list__item">
                                                    <span className="pull-left cost-heading">
                                                        Previous Event Charges
                                                    </span>
                                                    <span className="pull-right">- Rs. {numberWithCommas(props.prevCharges)}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : null}
                                <div className="custom-host-card mdl-shadow--2dp">
                                    <div className="mdl-card__supporting-text">
                                        <ul className="demo-list-icon mdl-list">
                                            <li className="mdl-list__item">
                                                <span className="pull-left">
                                                    Total Payable
                                                </span>
                                                <span className="pull-right">Rs. {numberWithCommas(((((props.eventsData.eventPrice*props.eventsData.totalQuant)-finalTds)-props.eventsData.totalQuant*NEW_DOOLALLY_FEE)-props.prevCharges))}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ) : null}
                        {props.signupList.length > 0 &&
                            <div className="demo-list-action mdl-list host-signup-list">
                                <div className="mdl-card__supporting-text">
                                    <span>Signups</span>
                                </div>
                            </div>
                        }
                        {props.signupList.map((item,index) =>
                            <div className="demo-list-action mdl-list host-signup-list">
                                <div className="mdl-list__item">
                                    <span className="mdl-list__item-primary-content">
                                        <span>{item.firstName+' '+item.lastName}</span>
                                        <span className="dim-text-opacity">({item.regPrice})</span>   
                                        {item.quantity > 1 &&                                                     
                                        <span className="mdl-chip mdl-list__item-avatar">
                                            <span className="mdl-chip__text">+{item.quantity-1}</span>
                                        </span>
                                        }
                                    </span>
                                    <i onClick={() => window.location = 'mailto:'+item.emailId} className="mdl-list__item-secondary-action contact-email">
                                        <i className="ic_event_email_icon"></i>
                                    </i>
                                </div>
                            </div>
                        )} 
                    </div>
                    <div className="d_feat_event_btn">
                        {props.eventCompleted == false ? (
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_book_event disabled-link">Event Completed</Link>                 //button disabled
                        ) : props.eventsData.isEventCancel == EVENT.CANCEL_REVIEW ? (
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_book_event disabled-link">Cancellation in Review</Link>          //button disabled
                        ) : props.eventsData.isEventCancel == EVENT.CANCEL_FINAL ? (
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_book_event disabled-link">Event Cancelled</Link>                 //button disabled
                        ) : isEventFinished(props.eventsData.eventDate,props.eventsData.endTime) ? (
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_book_event disabled-link">Event Completed</Link>                 //button disabled
                        ) : isEventStarted(props.eventsData.eventDate,props.eventsData.startTime) ? (
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_book_event disabled-link">Event In Progress</Link>               //button disabled
                        ) : (
                            <>
                            <Link to={'/edit-my-event/'+props.eventsData.eventSlug} className="d_reminder">Edit Event</Link>
                            <Link className="d_book_event"  onClick={handleShow}>Cancel Event</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="modal-body pt-0 monster">
                        <div className="content-block">
                            <h5><strong>Please login first then create event.</strong></h5>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Link to={'/login/create-event'}><div className="btn btn-success">Login</div></Link>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default featured_event;