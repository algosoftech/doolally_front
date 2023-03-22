import { useState } from "react";

import {  eventPlaceValidator, eventCapacityValidator,eventDateValidator, creatorNameValidator, 
          creatorPhoneValidator, creatorEmailValidator, activityCheckValidator
} from "../EventValidators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useCreatePrivateEventFormValidator = form => {
  const [errors, setErrors] = useState({
    taproom: {
      dirty: false, error: false, message: ""
    },
    eventcapacity: {
      dirty: false, error: false, message: ""
    },
    eventDate: {
      dirty: false, error: false, message: ""
    },
    infrastructure: {
      dirty: false, error: false, message: ""
    },
    foodpackage: {
      dirty: false, error: false, message: ""
    },
    activity: {
      dirty: false, error: false, message: ""
    },
    activityCheck: {
      dirty: false, error: false, message: ""
    },
    userName: {
      dirty: false, error: false, message: ""
    },
    userEmail: {
      dirty: false, error: false, message: ""
    },
    userMobile: {
      dirty: false, error: false, message: ""
    }
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { taproom, eventcapacity, eventDate, infrastructure, foodpackage, activity, activityCheck,
            userName, userEmail, userMobile } = form;

    if (nextErrors.taproom.dirty && (field ? field === "taproom" : true)) {
      const taproomMessage = eventPlaceValidator(taproom, form);
      nextErrors.taproom.error = !!taproomMessage;
      nextErrors.taproom.message = taproomMessage;
      if (!!taproomMessage) isValid = false;
    }

    if (nextErrors.eventcapacity.dirty && (field ? field === "eventcapacity" : true)) {
      const eventcapacityMessage = eventCapacityValidator(eventcapacity, form);
      nextErrors.eventcapacity.error = !!eventcapacityMessage;
      nextErrors.eventcapacity.message = eventcapacityMessage;
      if (!!eventcapacityMessage) isValid = false;
    }

    if (nextErrors.eventDate.dirty && (field ? field === "eventDate" : true)) {
      const eventDateMessage = eventDateValidator(eventDate, form);
      nextErrors.eventDate.error = !!eventDateMessage;
      nextErrors.eventDate.message = eventDateMessage;
      if (!!eventDateMessage) isValid = false;
    }

    if (nextErrors.activityCheck.dirty && (field ? field === "activityCheck" : true)) {  
      if(form.activity == 'YES'){  
        const activityCheckMessage = activityCheckValidator(activityCheck, form);
        nextErrors.activityCheck.error = !!activityCheckMessage;
        nextErrors.activityCheck.message = activityCheckMessage;
        if (!!activityCheckMessage) isValid = false;
      } else {   
        const activityCheckMessage = "";
        nextErrors.activityCheck.error = !!activityCheckMessage;
        nextErrors.activityCheck.message = activityCheckMessage;
        if (!!activityCheckMessage) isValid = false;
      }
    }

    if (nextErrors.userName.dirty && (field ? field === "userName" : true)) {
      const userNameMessage = creatorNameValidator(userName, form);
      nextErrors.userName.error = !!userNameMessage;
      nextErrors.userName.message = userNameMessage;
      if (!!userNameMessage) isValid = false;
    }

    if (nextErrors.userEmail.dirty && (field ? field === "userEmail" : true)) {
      const userEmailMessage = creatorEmailValidator(userEmail, form);
      nextErrors.userEmail.error = !!userEmailMessage;
      nextErrors.userEmail.message = userEmailMessage;
      if (!!userEmailMessage) isValid = false;
    }

    if (nextErrors.userMobile.dirty && (field ? field === "userMobile" : true)) {
      const userMobileMessage = creatorPhoneValidator(userMobile, form);
      nextErrors.userMobile.error = !!userMobileMessage;
      nextErrors.userMobile.message = userMobileMessage;
      if (!!userMobileMessage) isValid = false;
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
