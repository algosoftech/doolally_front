import React, { useState ,useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import{BrowserRouter as Router , Routes ,Route,Switch,Link, Redirect} from "react-router-dom";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect'


import DoolallyAgeGate from "./pages/DoolallyAgeGate";
import Doolally_web from './pages/Doolally';

import Doolally_mob from "./pages/Login";



//import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import MyAccount from "./pages/MyAccount";
import MyEvents from "./pages/MyEvents";
import MyEventDetails from "./pages/MyEventDetails";
import MyEventEditDetils from "./pages/MyEventEditDetils";


import EventCategory from "./pages/EventCategory";
import CategoryEvents from "./pages/CategoryEvents";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";


import FvbProductAdd from "./pages/FvbProductAdd";
import FnbCheckout from "./pages/FnbCheckout";
import FnbProductList from "./pages/FnbProductList";

import AboutUs from "./pages/AboutUs";
import Testimonials from "./pages/Testimonials";
import ContactUs from "./pages/ContactUs";
import Supports from "./pages/Supports";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import RefundsCancellations from "./pages/RefundsCancellations";

function App() {

  let Doolally = isBrowser ? Doolally_web : Doolally_mob;
// if (isMobile) {
//   Doolally = Doolally_mob;
// }



  return (
    <div className="App">
      <BrowserView>
        <Routes>
          { /* Landing and home pages */ }
          <Route exact path="/homepage" element={<DoolallyAgeGate/>}/>
          <Route exact path="/" element={<Doolally/>}/>
          

          { /* Users pages */ }
          {/* <Route exact path="/login" element={<Login/>}/> */}
          {/* <Route exact path="/login/:referalUrl" element={<Login/>}/> */}
          <Route exact path="/signup" element={<SignUp/>}/>
          <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
          <Route exact path="/reset-password" element={<ResetPassword/>}/>

          <Route exact path="/my-acount" element={<MyAccount/>}/>
          <Route exact path="/my-events" element={<MyEvents/>}/>
          <Route exact path="/my-event-details/:eventSlug" element={<MyEventDetails/>}/>
          <Route exact path="/edit-my-event/:eventSlug" element={<MyEventEditDetils/>}/>

          { /* Event pages */ }
          <Route exact path="/event-categories" element={<EventCategory/>}/>
          <Route exact path="/event-category/:cateSlug" element={<CategoryEvents/>}/>
          <Route exact path="/event-list" element={<EventList/>}/>
          <Route exact path="/event-details/:eventSlug" element={<EventDetails/>}/>
          <Route exact path="/create-event" element={<CreateEvent/>}/>
          <Route exact path="/create-event/:currCostType" element={<CreateEvent/>}/>


          { /* FNB pages */ }
          <Route exact path="/FvbProductAdd" element={<FvbProductAdd/>}/>
          <Route exact path="/FnbProductList" element={<FnbProductList/>}/>
          <Route exact path="/FnbCheckout" element={<FnbCheckout/>}/>

          { /* CMS pages */ }
          <Route exact path="/about-us" element={<AboutUs/>}/>
          <Route exact path="/testimonials" element={<Testimonials/>}/>
          <Route exact path="/contact-us" element={<ContactUs/>}/>
          <Route exact path="/supports" element={<Supports/>}/>
          <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
          <Route exact path="/term-condition" element={<TermsCondition/>}/>
          <Route exact path="/refunds-cancellations" element={<RefundsCancellations/>}/>
        </Routes>
      </BrowserView>
      <MobileView>
        <h1>This is rendered only on mobile</h1>
        <Routes>
          <Route exact path="/" element={<Doolally/>}/>
        </Routes>
      </MobileView>
    </div>
  );
}

export default App;
