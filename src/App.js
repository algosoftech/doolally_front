import React, { useState, useEffect, memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import  {CartContext} from "./pages_web/Beer"; 
import FnbState from "./contextApi/FnbState";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  Link,
 
} from "react-router-dom";

import { Redirect } from '@reach/router';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";



// Web pages
import DoolallyAgeGateWeb from "./pages_web/DoolallyAgeGate";
import DoolallyWeb from "./pages_web/Doolally";

import LoginWeb from "./pages_web/Login";

import MyAccountWeb from "./pages_web/MyAccount";
import MyEventsWeb from "./pages_web/MyEvents";
import MyEventDetailsWeb from "./pages_web/MyEventDetails";
import MyEventEditDetilsWeb from "./pages_web/MyEventEditDetils";
import MyAttendingWeb from "./pages_web/MyAttending";

import EventWeb from "./pages_web/Event";
import EventDetailsWeb from "./pages_web/EventDetails";
import CreateEventWeb from "./pages_web/CreateEvent";
import CreatePrivateEventWeb from "./pages_web/CreatePrivateEvent";

import LocationWeb from "./pages_web/Location";
import LocationMob from "./pages_mob/Location";
import AboutUsWeb from "./pages_web/AboutUs";
import ContactUsWeb from "./pages_web/ContactUs";
import SupportsWeb from "./pages_web/Supports";
import PrivacyPolicyWeb from "./pages_web/PrivacyPolicy";
import TermsConditionWeb from "./pages_web/TermsCondition";
import RefundsCancellationsWeb from "./pages_web/RefundsCancellations";
import ReserveTableWeb from "./pages_web/ReserveTable";
import MyProfileWeb from "./pages_web/MyProfile";

import BeerWeb from "./pages_web/Beer";
import FoodWeb from "./pages_web/Food";
import MerchandiseWeb from "./pages_web/Merchandise";
import MerchandiseMob from "./pages_mob/Merchandise";
import CartWeb from "./pages_web/Cart";
import CropImage from "./components/ImageCrop";
import UploadEventImageWeb from "./pages_web/UploadEventImage";

// Mobile pages
//import DoolallyAgeGateMob from "./pages_mob/DoolallyAgeGate";
import DoolallyMob from "./pages_mob/Doolally";
import EventMob from "./pages_mob/EventList";
import CreateEventMob from "./pages_mob/CreateEvent";
import EventDetailsMob from "./pages_mob/EventDetails";
import LoginMob from "./pages_mob/Login";
import MyEventsMob from "./pages_mob/myEvent";
import MyEventDetailsMob from "./pages_mob/MyEventDetails";
import CreatePrivateEventMob from "./pages_mob/PrivateEvent";
import MyAttendingMob from "./pages_mob/MyAttainding";
import PrivacyPolicyMob from "./pages_mob/privacyPolicy";
import ContactUsMob from "./pages_mob/contactUs";
import AboutUsMob from "./pages_mob/aboutUs";
import {getUser} from "./utils/UserAuthenticate";
// fnb in mobile view
import FoodMob from "./pages_mob/foodOrder";
import BeerMob from "./pages_mob/Beer";
import CartMob from "./pages_mob/cart";

function App() {
  const DoolallyAgeGate = DoolallyAgeGateWeb; //isBrowser ? DoolallyAgeGateWeb : DoolallyAgeGateMob;
  const Doolally = isBrowser ? DoolallyWeb : DoolallyMob;

  const Login = isBrowser ? LoginWeb : LoginMob;

  const MyAccount = MyAccountWeb; //isBrowser ? MyAccountWeb : MyAccountMob;
  const MyEvents = isBrowser ? MyEventsWeb : MyEventsMob;
  const MyEventDetails = isBrowser ? MyEventDetailsWeb : MyEventDetailsMob;
  const MyEventEditDetils = MyEventEditDetilsWeb; //isBrowser ? MyEventEditDetilsWeb : MyEventEditDetilsMob;

  const MyAttending = isBrowser ? MyAttendingWeb : MyAttendingMob;

  const Events = isBrowser ? EventWeb : EventMob;
  const EventDetails = isBrowser ? EventDetailsWeb : EventDetailsMob;

  const Locations = isBrowser ? LocationWeb : LocationMob;
  const CreateEvent = isBrowser ? CreateEventWeb : CreateEventMob;
  const CreatePrivateEvent = isBrowser
    ? CreatePrivateEventWeb
    : CreatePrivateEventMob;

  const Beer = isBrowser ? BeerWeb : BeerMob;
  const Food = isBrowser ? FoodWeb : FoodMob;
  const Merchandise = isBrowser ? MerchandiseWeb : MerchandiseMob;
  const Cart = isBrowser ? CartWeb : CartMob;

  const AboutUs = isBrowser ? AboutUsWeb : AboutUsMob;
  const Location = LocationWeb; //isBrowser ? LocationWeb : LocationMob;
  const ContactUs = isBrowser ? ContactUsWeb : ContactUsMob;
  const Supports = SupportsWeb; //isBrowser ? SupportsWeb : SupportsMob;
  const PrivacyPolicy = isBrowser ? PrivacyPolicyWeb : PrivacyPolicyMob;
  const TermsCondition = TermsConditionWeb; //isBrowser ? TermsConditionWeb : TermsConditionMob;
  const RefundsCancellations = RefundsCancellationsWeb; //isBrowser ? RefundsCancellationsWeb : RefundsCancellationsMob;
  const ReserveTable = ReserveTableWeb;
  const MyProfile = MyProfileWeb;

  const UploadEventImage = UploadEventImageWeb;

  let mybutton = document.getElementById("myBtn");

  // When the user scrolls down 20px from the top of the document, show the button
  // window.onscroll = function() {
  //   scrollFunction();
  // };

  function scrollFunction() {
    if (
      document.body.scrollTop > 70 ||
      document.documentElement.scrollTop > 70
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
// for header
// var header = $('.sticky-header ');

// $(window).scroll(function(e){
//     if(header.offset().top !== 0){
//         if(!header.hasClass('shadow')){
//             header.addClass('shadow');
//         }
//     }else{
//         header.removeClass('shadow');
//     }
// });
  return (
    <>   
      <div className="App">
   <FnbState>
        <Routes>
          {/* Landing and home pages */}
          <Route exact path="/homepage" element={<DoolallyAgeGate />} />
          <Route exact path="/" element={<Doolally />} />

          {/* Users pages */}
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/login/:referalUrl" element={<Login />} />

          <Route exact path="/my-accounts" element={<MyAccount />} />
          <Route exact path="/my-events" element={<MyEvents />} />
<Route exact path="/crop-img" element={<CropImage/>}/>
          
          <Route
            exact
            path="/my-event-details/:eventSlug"
            element={<MyEventDetails />}
          />
          <Route
            exact
            path="/edit-my-event/:eventSlug"
            element={<MyEventEditDetils />}
          />
          <Route exact path="/attending" element={<MyAttending />} />

          {/* Event pages */}
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/events/:cateSlug" element={<Events />} />
          <Route
            exact
            path="/event-details/:eventSlug"
            element={<EventDetails />}
          />
          <Route exact path="/create-event" element={<CreateEvent />} />
          <Route
            exact
            path="/create-private-event"
            element={<CreatePrivateEvent />}
          />

          <Route exact path="/locations" element={<Locations />} />

          {/* FNB pages */}
          <Route exact path="/beer" element={<Beer />} />
          <Route exact path="/food" element={<Food />} />
          <Route exact path="/merchandise" element={<Merchandise />} />
          <Route exact path="/cart" element={<Cart />} />

          {/* CMS pages */}
          <Route exact path="/about-us" element={<AboutUs />} />
          <Route exact path="/contact-us" element={<ContactUs />} />
          <Route exact path="/supports" element={<Supports />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route exact path="/term-condition" element={<TermsCondition />} />
          <Route
            exact
            path="/refunds-cancellations"
            element={<RefundsCancellations />}
          />
          <Route exact path="/reserve-table" element={<ReserveTable />} />
          <Route exact path="/my-profile" element={<MyProfile />} />

          <Route
            exact
            path="/upload-event-image"
            element={<UploadEventImage />}
          />
        </Routes>
        </FnbState>
      </div>
      {isBrowser ? (
        <button
          id="myBtn"
          onClick={() => topFunction()}
          style={{
            backgroundColor: "#a2c760",
            color: "white",
            width: "35px",
            height: "35px",
            borderRadius: "6px",
            position: "fixed",
            bottom: "0",
            right: "0",
            zIndex: "1",
            border: "none",
            outline: "none",
            marginRight: "40px",
            marginBottom: "10px",
          }}
        >
          <ArrowUpwardIcon />
        </button>
      ) : (
        ""
      )}
      
    </>
  );
}

export default memo(App);
