import React, { useState ,useEffect} from "react";

//import MY_event_box from "../components/EventCategory/my_event_box";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { format } from 'date-fns'

import { getRequestOptions, apiBaseUrl, userEventDetailsApiUrl, eventImageBaseUrl, EVENT, NEW_DOOLALLY_FEE, 
         communityManagerNumber, userSendEventCanelRequestApiUrl ,  sendMyEventCancelRequestByOrganiser,} from '../config/constant';
import { setUserCurrLoc, getUserCurrLoc, getUser, getToken, } from '../utils/UserAuthenticate';
import {isEventFinished, isEventStarted, isEventApproved, numberWithCommas, showCorrectImage} from '../utils/Common';

const EventDetails = () => {
    const { eventSlug } = useParams();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [eventsList,setEventsList]= useState([]);
    const [eventCompleted, setEventCompleted] = useState(false);
    const [commDetails,setCommDetails]= useState([]);
    const [prevCharges,setPrevCharges]= useState(0);
    const [finalTds,setFinalTds]= useState(0);
    const [signupList,setSignupList]= useState([]);
    const [isloading, setIsloading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);
    
    const user = getUser();

      // modal for represent message
  const[result,setResult]=useState("");
  const [showCancelTicket2,setShowCacelTicket2]=useState(false);
  const handleCloseCancelTicket2=()=>{
    setShowCacelTicket2(false);
    window.location.reload();
  }

    useEffect(()=>{
        Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
        if(!getUserCurrLoc()){ setUserCurrLoc();};
        if(!getUser()){ window.location = '/login'; }
        getData();
    },[]);

    const getData= async()=>{
        try {   
            setIsloading(true);
            const user = getUser();
            // here Api call for Home page
            let result  =   await fetch(apiBaseUrl+userEventDetailsApiUrl+'?userId='+user.userId+'&eventSlug='+eventSlug,getRequestOptions);
            if(result){
                result      =   await result.json();
                if(result.response.result.eventData.length > 0){    
                    setEventsList(result.response.result.eventData);
                    setEventCompleted(result.response.result.eventCompleted);
                    setCommDetails(result.response.result.commDetails);
                    setPrevCharges(result.response.result.prevCharges);
                    setSignupList(result.response.result.signupList);
                } else {
                    setErrorMsg('No event found.');
                }
                setTimeout(() => {setIsloading(false)}, 500); 
            }
        } catch (error) {
            setErrorMsg('Error while loading data. Try again later.');
        }
    }
    const eventCancelRequest = async () => {
        try {
          setIsSubmitButtonLoading(true);
          const user = getUser();
          const eventId = eventsList[0].eventId;
          // here Api call for Home page
          let cenResult = await fetch(
            apiBaseUrl +
            sendMyEventCancelRequestByOrganiser+
              "?userId=" +
              user.userId +
              "&eventId=" +
              eventId,
            getRequestOptions
          );
    
          if (cenResult) {
            cenResult = await cenResult.json();
            // alert(cenResult.statusMessage);
            setResult(cenResult.statusMessage);
            setIsSubmitButtonLoading(false);
            setShow(false);
            setShowCacelTicket2(true);
          }
        } catch (error) {
          setErrorMsg("Error while loading data. Try again later.");
        }
      };
   console.log(eventsList);
    return (
        <>
             
            <div className="container-fluid " style={{marginBottom:"140px"}}>
                {isloading &&  <LoadingSpinner /> }
                <Header />
              
                <div className="d_main_panel myEventDetails">
                    <div className="container">
                        <div className="row">
                        <div className="col-md-3 col-lg-3">&nbsp;</div>
                            {eventsList.map((item,index)=>
                                // <MY_event_box key={index} eventsData={item} eventCompleted={eventCompleted} commDetails={commDetails} prevCharges={prevCharges} signupList={signupList} />
                                <>
                                    <div className="col-md-6 col-lg-6">
                                        <div className="d_featured_events_box">
                                            <figure className="mb-0">
                                                <img src={showCorrectImage(item.filename)} alt="" style={{height:"210px"}}/>
                                            </figure>
                                            <div className="d_feat_event_cnt poppins" style={{padding:"0px"}}  >
                                                <p className="d_feat_event_title box_padding" style={{ fontSize:"1rem" , marginLeft: "3%"}}>{item.eventName}</p>
                                                <p className="d_feat_event_name  ">
                                                    {item.ifApproved == EVENT.DECLINED ? (
                                                        <p style={{fontSize:"0.8rem", marginTop:"11px", marginLeft: "5%"}}>Event Declined!</p>
                                                    ) : item.ifApproved == EVENT.WAITING ? (
                                                        <p style={{fontSize:"0.8rem", marginTop:"11px", marginLeft: "5%"}}>Review In Progress...</p>
                                                    ) : item.ifApproved == EVENT.APPROVED && item.ifActive == EVENT.ACTIVE ? (
                                                        <p style={{fontSize:"0.8rem", marginTop:"11px", marginLeft: "5%"}}> Event Approved!</p>
                                                    ) : item.ifApproved == EVENT.APPROVED && item.ifActive == EVENT.NOT_ACTIVE ? (
                                                        <p style={{fontSize:"0.8rem", marginTop:"11px", marginLeft: "5%"}}>Event Approved But Not Active</p>
                                                    ) : isEventFinished(item.eventDate,item.endTime) ? (
                                                        <p style={{fontSize:"0.8rem", marginTop:"11px", marginLeft: "5%"}}>Event Completed</p>
                                                    ) : (
                                                        <p>&nbsp;</p>
                                                    )}
                                                </p>
                                                <div className="mdl-grid text-center host-main-specs">
                                                    <div className="mdl-cell--12-col eventDash-stats">
                                                        <ul className="list-inline"style={{marginTop:"-10%"}}>
                                                            <li  id="show-host-earnings" data-evecost="1" style={{width:"100%"}}>
                                                                <h4 className="dashboard-stats">
                                                                    {item.costType == 1 ? (
                                                                        <p>Free</p>
                                                                    ) : (
                                                                        'Rs '+numberWithCommas(item.eventPrice*item.totalQuant)
                                                                    )}
                                                                </h4>
                                                                <span>Amount Collected</span>
                                                            </li>
                                                            <li>
                                                                <div className="dash-spacer"></div>
                                                            </li>
                                                            <li id="show-host-attendees" style={{width:"100%"}}>
                                                                <h4 className="dashboard-stats">
                                                                    {item.totalQuant > 0 ? (
                                                                        item.totalQuant
                                                                    ) : (
                                                                        0
                                                                    )}
                                                                </h4>
                                                                <span>Attending</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                {item.costType != 1 ? (
                                                    <div className="host-event-segregation">
                                                        <div className="common-head-title">
                                                            <span>Deductions</span>
                                                        </div>
                                                        <div className="custom-host-card mdl-shadow--2dp">
                                                            <div className="mdl-card__supporting-text" style={{padding:"0px"}}>
                                                                <ul className="demo-list-icon mdl-list">
                                                                    <li className="mdl-list__item">
                                                                        <span className="pull-left cost-heading">
                                                                            Collected from signups
                                                                        </span>
                                                                        <span className="pull-right">+ Rs. {numberWithCommas(item.eventPrice*item.totalQuant)}</span>
                                                                    </li>
                                                                </ul>

                                                            </div>
                                                        </div>
                                                        {finalTds != 0 ? (
                                                            <div className="custom-host-card mdl-shadow--2dp">
                                                                <div className="mdl-card__supporting-text">
                                                                    <ul className="demo-list-icon mdl-list">
                                                                        <li className="mdl-list__item"style={{padding:"0px"}}>
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
                                                                    <li className="mdl-list__item" style={{padding:"0px"}}>
                                                                        <span className="pull-left cost-heading" style={{marginTop:"12px"}}>
                                                                            FnB Coupon(s)
                                                                        </span>
                                                                        <span className="pull-right" style={{marginTop:"12px"}}>- Rs. {numberWithCommas(item.totalQuant*NEW_DOOLALLY_FEE)}</span>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        {prevCharges != 0 ? (
                                                            <div className="custom-host-card mdl-shadow--2dp">
                                                                <div className="mdl-card__supporting-text">
                                                                    <ul className="demo-list-icon mdl-list">
                                                                        <li className="mdl-list__item">
                                                                            <span className="pull-left cost-heading" style={{float:"left", marginLeft:"-18px", fontSize:"13px"}}>
                                                                                Previous Event Charges
                                                                            </span>
                                                                            <span className="pull-right" style={{marginRight:"-10px"}}>
                                        - Rs.{ (prevCharges / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                        <div className="custom-host-card mdl-shadow--2dp">
                                                            <div className="mdl-card__supporting-text">
                                                                <ul className="demo-list-icon mdl-list">
                                                                    <li className="mdl-list__item" style={{padding:"0px"}}>
                                                                        <span className="pull-left" style={{marginTop:"12px"}}>
                                                                            Total Payable
                                                                        </span>
                                                                        <span className="pull-right" style={{marginTop:"12px"}}>
                                      Rs.{" "}
                                      {(
                                        (item.eventPrice * item.totalQuant -
                                          finalTds -
                                          item.totalQuant * NEW_DOOLALLY_FEE -
                                          prevCharges)/100
                                      ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </span>
                                                                     </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                                {signupList.length > 0 &&
                                                    <div className="demo-list-action mdl-list host-signup-list">
                                                        <div className="mdl-card__supporting-text">
                                                            <span>Signups</span>
                                                        </div>
                                                    </div>
                                                }
                                                {signupList.map((item,index) =>
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
                                            <div className=" d_feat_event_btn mt-4"style={{paddingLeft:"0%"}} >
                                                {eventCompleted == true ? (
                                                    <Link to={'/edit-my-event/'+item.eventSlug} className="d_book_event disabled-link">Event Completed</Link>                 //button disabled
                                                ) : item.isEventCancel == EVENT.CANCEL_REVIEW ? (
                                                    <Link to={'/edit-my-event/'+item.eventSlug} className="d_book_event disabled-link">Cancellation in Review</Link>          //button disabled
                                                ) : item.isEventCancel == EVENT.CANCEL_FINAL ? (
                                                    <Link to={'/edit-my-event/'+item.eventSlug} className="d_book_event disabled-link">Event Cancelled</Link>                 //button disabled
                                                ) : isEventFinished(item.eventDate,item.endTime) ? (
                                                    <Link to={'/edit-my-event/'+item.eventSlug} className="d_book_event disabled-link">Event Completed</Link>                 //button disabled
                                                ) : isEventStarted(item.eventDate,item.startTime) ? (
                                                    <Link to={'/edit-my-event/'+item.eventSlug} className="d_book_event disabled-link">Event In Progress</Link>               //button disabled
                                                ) : (
                                                    <>
                                                    {item.eventSlug &&
                                                        <Link to={'/edit-my-event/'+item.eventSlug} className="d_reminde">Edit Event</Link>
                                                    }
                                                    <Link to={'#'} className="d_book_event " onClick={handleShow}  >Cancel Event</Link>
                                                    </>
                                                )}
                                               
                                            </div>
                                        </div>
                                 
                                    </div>
                             
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                        <div className="modal-body pt-0 monster">
                            <div className="content-block">
                                <h5><strong>Cancel Event?</strong></h5>
                                <h6>Please Contact the venue's Community Manager (Belinda) on <a href={'tel:'+communityManagerNumber}>{communityManagerNumber}</a> to cancel your event.</h6>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Link to={'#'} onClick={eventCancelRequest}>    <div className="btn-deco " style={{width:"40px", width:"107px", padding:"6px 0px 6px 5px"}} onClick={()=>{
              setShow(false)
              }}>
                {/* {isSubmitButtonLoading ? "Loading..." : "Cancel Event"} */}
                Cancel Event
              </div></Link>
                    </Modal.Footer>
                </Modal>

                {/* popup modal for represent message */}

<Modal
      show={showCancelTicket2} onHide={handleCloseCancelTicket2}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        Confirmation
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
{result} 
      </Modal.Body>
      <Modal.Footer>
    
        <button className="btn-deco" onClick={()=>{handleCloseCancelTicket2()



       }} style={{height:"40px",width:"60px"}}>Ok</button>
      </Modal.Footer>
    </Modal>

                <Footer />
            </div>
      
        </>
    );
}
export default EventDetails;