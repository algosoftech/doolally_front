import React, { useState, useEffect } from "react";

import Header from "../components/HeaderMob";
import Footer from "../components/FooterMob";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import Dropdown from "react-bootstrap/Dropdown";

import {
  getRequestOptions,
  apiBaseUrl,
  userEventsApiUrl,
  EVENT,
} from "../config/constant";

import {
  setUserCurrLoc,
  getUserCurrLoc,
  getUser,
  getToken,
} from "../utils/UserAuthenticate";
import {
  showCorrectImage,
  isEventFinished,
  isEventApproved,
} from "../utils/Common";
import { Container, Row, Col } from "react-bootstrap";

const MyEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [comEventsData, setComEventsData] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage";
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    if (!getUser()) {
      window.location = "/login/my-events";
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsloading(true);
      const user = getUser();
      // here Api call for Home page
      let result = await fetch(
        apiBaseUrl + userEventsApiUrl + "?userId=" + user.userId,
        getRequestOptions
      );
      if (result) {
        result = await result.json();
        if (result.response.result.eventData.length > 0) {
          setEventsData(result.response.result.eventData);
          setComEventsData(result.response.result.comEventData);
        } else {
          setErrorMsg("No event found.");
        }
        setTimeout(() => {
          setIsloading(false);
        }, 500);
      }
    } catch (error) {
      setErrorMsg("Error while loading data. Try again later.");
    }
  };

  console.log(comEventsData)

  return (
    <>
      {!getUser() ? (


        ""
      ) : (
<>

        <Container>
        <Header/>
        <div style={{marginTop:"100px", marginBottom:"100px"}}>
          {eventsData.map((item, index) => (
            <div className="box-org-dasboard ">
              <Row>
                <Col>
                  <div className="d-flex justify-content-between">
                    <div>
                      <h6>
                        Event name : <span>{item.eventName.slice(0,12)}</span>
                      </h6>

                      <h6>
                        Status :{" "}
                        <span>
                          {item.isEventCancel == EVENT.CANCEL_REVIEW ? (
                            <p>Cancellation In Review</p>
                          ) : item.isEventCancel == EVENT.CANCEL_FINAL ? (
                            <span>Event Cancelled</span>
                          ) : isEventFinished(item.eventDate, item.endTime) ? (
                            <span>Event Completed</span>
                          ) : item.ifApproved == EVENT.DECLINED ? (
                            <span>Event Declined!</span>
                          ) : item.ifApproved == EVENT.WAITING ? (
                            <span>Review In Progress...</span>
                          ) : item.ifApproved == EVENT.APPROVED &&
                            item.ifActive == EVENT.ACTIVE ? (
                            <span>Event Approved!</span>
                          ) : item.ifApproved == EVENT.APPROVED &&
                            item.ifActive == EVENT.NOT_ACTIVE ? (
                            <span>Event Approved But Not Active</span>
                          ) : (
                            <p>&nbsp;</p>
                          )}
                        </span>
                      </h6>
                      <h6>
                        Date :{" "}
                        <span>
                          {format(new Date(item.eventDate), "iii, LLL dd")}
                        </span>
                      </h6>
                      <h6>
                        Time :{" "}
                        <span>
                          {format(
                            new Date(item.showeventDate + " " + item.startTime),
                            "hh a"
                          )}{" "}
                          -{" "}
                          {format(
                            new Date(item.showeventDate + " " + item.endTime),
                            "hh a"
                          )}
                        </span>
                      </h6>
                      <h6>
                        Location :{" "}
                        <span>
                          {" "}
                          {item.isSpecialEvent == EVENT.STATUS_YES ? (
                            <span>1st Brewhouse, Pune</span>
                          ) : item.isEventEverywhere == EVENT.STATUS_YES ? (
                            <span>All Taprooms</span>
                          ) : item.at_multiple_locations == EVENT.STATUS_YES ? (
                            <span>Multiple Taprooms</span>
                          ) : (
                            item.locName
                          )}
                        </span>
                      </h6>
                    </div>

                    <img
                      src={showCorrectImage(item.filename)}
                      alt={item.eventName}
                    />
                  </div>

                  <button className="text-center">
                    {isEventApproved(
                      item.isEventCancel,
                      item.ifApproved,
                      item.ifActive
                    ) ? (
                      <Link to={"/my-event-details/" + item.eventSlug}>
                        <div
                          className="auto_w_comn_btn"
                         
                        >
                          View Details
                        </div>
                      </Link>
                    ) : (
                      //<Link to={'/my-event-details/'+item.eventSlug} className="disabled-link"><div className="auto_w_comn_btn">View Details</div></Link>
                      <Link to={"/my-event-details/" + item.eventSlug}>
                        <div
                          className="auto_w_comn_btn"
                         
                        >
                          View Details
                        </div>
                      </Link>
                    )}
                  </button>
                </Col>
              </Row>
            </div>
          ))}
 
  
    {comEventsData.map((item,index) =>
    <div className="box-org-dasboard">
<Row>

  <Col>
<div className="d-flex justify-content-between">
<div>
<h6>
  Event name : <span style={{wordWrap:"break-word"}}>{item.eventName.slice(0,10)}</span> 
</h6>

  <h6>Status : <span style={{fontSize:"15px"}}>Event Completed</span> </h6>
<h6>Date <span>{format(new Date(item.eventDate),'iii, LLL dd')}</span></h6>
<h6>
                        Time :{" "}
                        <span>
                    {item.startTime} - {item.endTime}


                        </span>
                      </h6>
<h6>Location : <span>      {item.isSpecialEvent == EVENT.STATUS_YES ? (
                                        <p>1st Brewhouse, Pune</p>
                                    ) : item.isEventEverywhere == EVENT.STATUS_YES ? (
                                        <p>All Taprooms</p>
                                    ) : item.at_multiple_locations == EVENT.STATUS_YES ? (
                                        <p>Multiple Taprooms</p>
                                    ) : (
                                        item.locName
                                    )}</span></h6>
</div>

<img src={showCorrectImage(item.filename)} alt={item.eventName} className="my-event-img" />
</div>

<button className="text-center" > <Link to={'/my-event-details/'+item.eventSlug}><div className="auto_w_comn_btn">View Details</div></Link></button>
  </Col>
</Row>
    </div>
    )}
    

   

   {!eventsData && !comEventsData &&
   
    <div className="box-org-dasboard mb-4 pb-4">
<Row>

  <Col>
<div className="d-flex justify-content-between">
<div>
<h6>
  Event name : <span>None</span> 
</h6>

  <h6>Status :  <span>No Event Created Yet</span> </h6>
<h6>Date <span>None</span></h6>
<h6>Location : <span>None</span></h6>
</div>

<img src="" alt="no event created yet"/>
</div>

<button className="text-center" ><Link to="/create-event">please create an event</Link> </button>
  </Col>
</Row>
    </div>
    
  }

  <Footer/>
  </div>
  </Container>
  
  </>
      )}

    </>
  );
};
export default MyEvents;
