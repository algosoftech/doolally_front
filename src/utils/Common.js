import { format } from 'date-fns'
import { EVENT, eventImageBaseUrl, EVENT_START_HR ,
  EVENT_END_HR  } from '../config/constant';

export const isEventFinished = (eventDate, endTime) => {
  const ecentcurDate = format(new Date(eventDate),'yyyy-MM-dd')+' '+endTime;
  const date_one     =  new Date(ecentcurDate);
  const date_two     =  new Date(Date.now());
  return date_one.getTime() < date_two.getTime()? true : false;
}

export const isEventStarted = (eventDate, startTime) => {
  const ecentcurDate = format(new Date(eventDate),'yyyy-MM-dd')+' '+startTime;
  const date_one     =  new Date(ecentcurDate);
  const date_two     =  new Date(Date.now());
  return date_one.getTime() < date_two.getTime()? true : false;
}

export const isEventApproved = (isEventCancel, ifApproved, ifActive) => {
  if(isEventCancel === EVENT.CANCEL_REVIEW){
    return true;
  } else if(ifApproved == EVENT.APPROVED && ifActive == EVENT.ACTIVE){
    return true;
  } else if(ifApproved == EVENT.APPROVED && ifActive == EVENT.NOT_ACTIVE){
    return true;
  } else {
    return false;
  }
}

export const showCorrectImage = (curImageUrl,type) => {
  if(curImageUrl && curImageUrl.search("cloudinary.com") > 0){ 
    if(type){
      let curImageUrlArray  =   curImageUrl.split("/doolally/image/upload/");
      curImageUrl           =   curImageUrlArray[0]+'/doolally/image/upload/'+type+'/'+curImageUrlArray[1];
    }
    return curImageUrl; 
  } else if(curImageUrl && curImageUrl.search("lob:http") > 0){ 
    return curImageUrl; 
  } else {
    return eventImageBaseUrl+'thumb/'+curImageUrl;
  }
}

export const numberWithCommas = (currNumber) => {
  return currNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//Check Start Timee
export const isCorrectStartTime = (hr,min) => {
  if(hr  >= EVENT_START_HR && hr <= EVENT_END_HR){
    if(hr == EVENT_END_HR && min > 0){
      return false;
    } else {
      return true;  
    }    
  }else {
    return false;
  }
}
//Check End Time
export const isCorrectEndTime = (Shr,Smin,Ehr,Emin) => {
  let dif = Ehr - Shr;
  if(Math.sign(dif) === -1){
    return 402;
  }
  if(Ehr >= (EVENT_END_HR +1) ){
    if(Ehr == (EVENT_END_HR +1) && Emin > 0){
      return 401;
    }
  }
  if(dif >= 1 && Smin  <= Emin ){
    return true;
  }else {
    return false;
  }
}

//Disable cancel booking button
export const isDisableCancelButton = (quantity, canceledQuantity, createdDT) => {
  let dif = quantity - canceledQuantity;
  if(dif <= 0){
    return 0;
  }
  let d = new Date();
  let cdate = new Date(createdDT);
  let date_in_mili = d.getTime();
  let cdate_in_mili = cdate.getTime();
  let oneday = 24*3600*1000;
  
  if((cdate_in_mili - date_in_mili) > oneday){

    return 1;
  }else{
    return 0;
  }
}