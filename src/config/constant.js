module.exports = {
  getRequestOptions: {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  },
  postRequestOptions: {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  },
  multipartRequestOptions: {
    headers: { "Content-Type": "multipart/form-data" },
  },

  fnbRequesOptions: {
    headers: {
      "app-key": "eik70po2szaj13nh6qg5ymcv9b4dtf8x",
      "app-secret": "2bd57f88eae50f8d07716820a8d07e6db99ad987",
      "access-token": "1081a1a8cc7fe83a9d08483490d87b8a8922c860",
      "Content-Type": "application/json",
    },
  },

  // apiBaseUrl: "http://localhost:8080/front/v1/",          //Api base user  -- local
  // apiBaseUrl: "https://69.49.228.170:8080/front/v1/", //Api base user  -- server
  apiBaseUrl: "https://moneysaverz.com:8080/front/v1/", //Api base user  -- server

  //Common API
  homePageApiUrl: "common/get-home-page-data",

  // Events API
  eventCategoryApiUrl: "events/get-category-page-data",
  eventCategoryEventListApiUrl: "events/get-category-event-list",
  eventListApiUrl: "events/get-event-list",
  eventDetailsApiUrl: "events/get-event-details",
  eventReminderMeApiUrl: "events/put-event-reminder-me",
  eventBookRegistrationrApiUrl: "events/put-event-booking-registration",
  eventBookCouponVerifyApiUrl: "events/put-event-coupon-varify",
  eventRazorpayResponseApiUrl: "events/put-razorpay-response-data",

  eventImageUplodeApiUrl: "events/upload-image-to-cloudinary",

  //User API
  userLoginApiUrl: "users/user-login",
  userCheckEmailApiUrl: "users/user-check-email",
  userCheckMobileApiUrl: "users/user-check-mobile",
  userRegisterApiUrl: "users/user-register",
  userForgotPasswordApiUrl: "users/user-forgot-password",
  userResetPasswordApiUrl: "users/user-reset-password",

  userAccountApiUrl: "users/get-my-account",

  userEventsApiUrl: "users/get-my-events",
  userEventDetailsApiUrl: "users/get-my-event-details",

  userCreateEventPageApiUrl: "users/get-create-event-page-data",
  userCreateEventApiUrl: "users/put-create-event",
  userSendEventCanelRequestApiUrl: "users/send-my-event-cancel-request",
  userEditEventApiUrl: "users/put-update-event",

  userCreatePrivateEventPageApiUrl: "users/get-create-private-event-page-data",
  userCreatePrivateEventApiUrl: "users/put-create-private-event",

  userSendVerificationOTPApiUrl: "users/send-otp-for-verification",
  userCheckVerificationOTPApiUrl: "users/check-otp-for-verification",
  sendMyEventCancelRequestByOrganiser: "users/sendMyEventCancelRequestByOrganiser",
  userAttendingApiUrl: "users/get-my-attending",
  sendContactMailToOrganiser: "users/sendContactMailToOrganiser",

  fBDImageBaseUrl: "https://doolally.in/uploads/beverage/",
  eventImageBaseUrl: "https://doolally.in/uploads/events/",
  eventCategoryImageBaseUrl: process.env.PUBLIC_URL + "/events/",
  eventShareBaseUrl: "http://localhost:3000/event-details/",

  communityManagerNumber: "9930415379",

  createEventDoolallyFee: 300,
  userFrom: "Web",

  getRegList: "users/get-reg-list",

  razorpayKey: "rzp_test_f2FovlSQrHRgeN",

  //F&B section start 1/10/23

  fnbMenuData: "get-restaurant-menus",

  EVENT: {
    ACTIVE: 1,
    NOT_ACTIVE: 0,
    WAITING: 0,
    APPROVED: 1,
    DECLINED: 2,
    CANCEL_REVIEW: 1,
    CANCEL_FINAL: 2,

    FREE: 1,
    PAID: 2,
    PAID_NO_PINT: 3,
    DOOLALLY_FEE: 4,
    PRIVATE: 5,
    STATUS_YES: 1,
    STATUS_NO: 2,
  },
  EH_GATEWAY_CHARGE: 5.26,
  DOOLALLY_GATEWAY_CHARGE: 2.29,
  INSTAMOJO_GATEWAY_CHARGE: 3,
  PAYTM_GATEWAY_CHARGE: 5,
  OLD_DOOLALLY_FEE: 250,
  NEW_DOOLALLY_FEE: 300,

  perPageShowData: 6,
  
  EVENT_START_HR : 10,
  EVENT_END_HR : 20,
};

