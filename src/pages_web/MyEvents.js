
import React, { useState ,useEffect} from "react";

import Header from "../components/HeaderWeb";
import Footer from "../components/FooterWeb";
import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import { useParams, Link } from "react-router-dom";
import { format } from 'date-fns'
import Dropdown from 'react-bootstrap/Dropdown';

import { getRequestOptions, apiBaseUrl, userEventsApiUrl, EVENT } from '../config/constant';

import { setUserCurrLoc, getUserCurrLoc, getUser, getToken } from '../utils/UserAuthenticate';
import {showCorrectImage, isEventFinished, isEventApproved} from '../utils/Common';


const MyEvents = () => {
    const [eventsData,setEventsData]= useState([]);
    console.log(eventsData)
    const [comEventsData,setComEventsData]= useState([]);
    const [isloading, setIsloading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(()=>{
        Helper.checkCurrentUserLegalAge().then((res) => { if(res.legalAge === 'No'){ window.location = '/homepage'; } });
        if(!getUserCurrLoc()){ setUserCurrLoc();};
        if(!getUser()){ window.location = '/login/my-events'; }
        getData();
    },[]);

    const getData= async()=>{
        try {   
            setIsloading(true);
            const user = getUser();
            // here Api call for Home page
            let result  =   await fetch(apiBaseUrl+userEventsApiUrl+'?userId='+user.userId,getRequestOptions);
            if(result){
                result      =   await result.json();
                if(result.response.result.eventData.length > 0){    
                    setEventsData(result.response.result.eventData);
                    setComEventsData(result.response.result.comEventData);
                } else {
                    setErrorMsg('No event found.');
                }
                setTimeout(() => {setIsloading(false)}, 500); 
            }
        } catch (error) {
            setErrorMsg('Error while loading data. Try again later.');
        }
    }

    return (
        <>
        {!getUser()?"":(
            <div className="container-fluid">
                {isloading &&  <LoadingSpinner /> }
                <Header />
                <table className="table table-bordered" style={{width:"90%",margin:"5% auto",backgroundColor:"white"}}>
                    <thead>
                        <tr style={{backgroundColor:"#f5fcff"}}>
                            <th scope="col">Image</th>
                            <th scope="col" style={{width:"20%"}}>Event Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Location</th>
                            <th scope="col" style={{width:"20%"}}>Date</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventsData.map((item,index) =>
                            <tr>
                                <td>
                            <img src={showCorrectImage(item.filename,'w_80')} alt={item.eventName} key={index} className="my-event-img"/>
                                </td>
                                <td>{item.eventName}</td>
                                <td>
                                    {item.isEventCancel == EVENT.CANCEL_REVIEW ? (
                                        <p>Cancellation In Review</p>
                                    ) : item.isEventCancel == EVENT.CANCEL_FINAL ? (
                                        <p>Event Cancelled</p>
                                    ) : isEventFinished(item.eventDate,item.endTime) ? (
                                        <p>Event Completed</p>
                                    ) : item.ifApproved == EVENT.DECLINED ? (
                                        <p>Event Declined!</p>
                                    ) : item.ifApproved == EVENT.WAITING ? (
                                        <p>Review In Progress...</p>
                                    ) : item.ifApproved == EVENT.APPROVED && item.ifActive == EVENT.ACTIVE ? (
                                        <p>Event Approved!</p>
                                    ) : item.ifApproved == EVENT.APPROVED && item.ifActive == EVENT.NOT_ACTIVE ? (
                                        <p>Event Approved But Not Active</p>
                                    ) : (
                                        <p>&nbsp;</p>
                                    )}
                                </td>
                                <td>
                                    {item.isSpecialEvent == EVENT.STATUS_YES ? (
                                        <p>1st Brewhouse, Pune</p>
                                    ) : item.isEventEverywhere == EVENT.STATUS_YES ? (
                                        <p>All Taprooms</p>
                                    ) : item.at_multiple_locations == EVENT.STATUS_YES ? (
                                        <p>Multiple Taprooms</p>
                                    ) : (
                                        item.locName
                                    )}
                                </td>
                                <td>{format(new Date(item.eventDate),'iii, LLL dd')}<br></br>{format(new Date(item.showeventDate+' '+item.startTime),'hh a')} - {format(new Date(item.showeventDate+' '+item.endTime),'hh a')}</td>
                                <td>
                                    { /*
                                    <Dropdown align="end">
                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            Action
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item href={'/my-event-details/'+item.eventSlug} disabled={true}>View Details</Dropdown.Item>
                                            <Dropdown.Item href={'/edit-my-event/'+item.eventSlug}>Edit Event</Dropdown.Item>
                                            <Dropdown.Item href={'/cancel-my-event/'+item.eventSlug}>Cancel Event</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    */ }
                                    {isEventApproved(item.isEventCancel,item.ifApproved,item.ifActive) ? (
                                        <Link to={'/my-event-details/'+item.eventSlug}><div className="auto_w_comn_btn">View Details</div></Link>
                                    ) : (
                                        //<Link to={'/my-event-details/'+item.eventSlug} className="disabled-link"><div className="auto_w_comn_btn">View Details</div></Link>
                                        <Link to={'/my-event-details/'+item.eventSlug}><div className="auto_w_comn_btn">View Details</div></Link>
                                    )}
                                </td>
                            </tr>
                        )} 
                        {comEventsData.map((item,index) =>
                            <tr>
                                <td ><img src={showCorrectImage(item.filename)} alt={item.eventName} className="my-event-img" /></td>
                                <td>{item.eventName}</td>
                                <td>
                                    <p>Event Completed</p>
                                </td>
                                <td>
                                    {item.isSpecialEvent == EVENT.STATUS_YES ? (
                                        <p>1st Brewhouse, Pune</p>
                                    ) : item.isEventEverywhere == EVENT.STATUS_YES ? (
                                        <p>All Taprooms</p>
                                    ) : item.at_multiple_locations == EVENT.STATUS_YES ? (
                                        <p>Multiple Taprooms</p>
                                    ) : (
                                        item.locName
                                    )}
                                </td>
                                <td>{format(new Date(item.eventDate),'iii, LLL dd')}</td>
                                <td>
                                    <Link to={'/my-event-details/'+item.eventSlug}><div className="auto_w_comn_btn">View Details</div></Link>
                                </td>
                            </tr>
                        )} 
                        {!eventsData && !comEventsData &&
                            <tr>
                                <th colspan="5" align="center" style={{ "text-align": "center" }}>No Event Created Yet!</th>
                            </tr>
                        }
                    </tbody>
                </table>
                <Footer />
            </div>
            )}
            
        </>
    );
}
export default MyEvents;
