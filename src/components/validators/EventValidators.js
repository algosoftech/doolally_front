export const eventImageValidator = (eventImage) => {
  if (!eventImage) {
    return "Event image is required.";
  }
  return "";
};

export const eventNameValidator = (eventName) => {
  if (!eventName) {
    return "Event name is required.";
  } else if (eventName.length < 4) {
    return "Event name must have a minimum 4 characters.";
  }
  return "";
};

export const eventDescValidator = (eventDesc) => {
  if (!eventDesc) {
    return "Event description is required.";
  } else if (eventDesc.length < 100) {
    return "Event description must have a minimum 100 characters.";
  } else if (eventDesc.length > 600) {
    return "Event description must have a maximum 600 characters.";
  }
  return "";
};

export const eventDateValidator = (eventDate) => {
  if (!eventDate) {
    return "Event Date is required.";
  }
  return "";
};

export const startTimeValidator = (startTime) => {
  if (!startTime) {
    return "Event Start Time is required.";
  }
  return "";
};

export const endTimeValidator = (endTime) => {
  if (!endTime) {
    return "Event End Time is required.";
  }
  return "";
};

export const eventPlaceValidator = (eventPlace) => {
  if (!eventPlace) {
    return "Event Place is required.";
  }
  return "";
};

export const eventCapacityValidator = (eventCapacity) => {
  if (!eventCapacity) {
    return "Event Capacity is required.";
  }
  return "";
};

export const costTypeValidator = (costType) => {
  if (!costType) {
    return "Event Cost type is required.";
  }
  return "";
};

export const eventPriceValidator = (eventPrice) => {
  if (!eventPrice) {
    return "Event Price is required.";
  }
  return "";
};

export const fnbPackageValidator = (fnb_package) => {
  if (!fnb_package) {
    return "FNB Package is required.";
  }
  return "";
};

export const entertainmentActivityValidator = (entertainment_activity) => {
  if (!entertainment_activity) {
    return "Entertainment Activity is required.";
  }
  return "";
};

export const cateIdValidator = (cateId) => {
  if (!cateId) {
    return "Event Category is required.";
  }
  return "";
};

export const activityCheckValidator = (activityCheck) => {
  if (!activityCheck) {
    return "Activity is required.";
  }
  return "";
};

export const creatorNameValidator = (creatorName) => {
  if (!creatorName) {
    return "Your name is required.";
  } else if (creatorName.length < 4) {
    return "Your name must have a minimum 4 characters.";
  }
  return "";
};

export const creatorPhoneValidator = (creatorPhone) => {
  if (!creatorPhone) {
    return "Mobile number is required.";
  } else if (!new RegExp(/^[0-9\b]+$/).test(creatorPhone)) {
    return "Please enter only number.";
  } else if (creatorPhone.length != 10) {
    return "Your phone number should have 10 digits, not more or less."; //Please enter valid phone number.
  }
  return "";
};

export const creatorEmailValidator = (creatorEmail) => {
  if (!creatorEmail) {
    return "You've forgotten to give us your email address.";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(creatorEmail)) {
    return "Incorrect email format!";
  }
  return "";
};

export const aboutCreatorValidator = (aboutCreator) => {
  // if (!aboutCreator) {
  //   return "About you is required";
  // }
  return "";
};

export const termNConditionValidator = (termNCondition) => {
  if (!termNCondition) {
    return "Term and condition is required.";
  }
  return "";
};

//  Book event registration form
export const userNameValidator = (user_name) => {
  if (!user_name) {
    return "Your name is required.";
  } else if (user_name.length < 4) {
    return "Your name must have a minimum 4 characters.";
  }
  return "";
};

export const userEmailValidator = (user_email) => {
  if (!user_email) {
    return "Email is required.";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(user_email)) {
    return "Incorrect email format!";
  }
  return "";
};

export const userPhoneValidator = (user_mobile) => {
  if (!user_mobile) {
    return "Mobile number is required.";
  } else if (!new RegExp(/^[0-9\b]+$/).test(user_mobile)) {
    return "Please enter only number.";
  } else if (user_mobile.length != 10) {
    return "Your Phone number needs to be 10 digits.";
  } 
  return "";
};

export const userQantityValidator = (user_quantity) => {
  if (!user_quantity) {
    return "Quantity is required.";
  } else if (user_quantity == 0) {
    return "Please enter at least 1 quantity.";
  }
  return "";
};
