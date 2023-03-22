import { useState } from "react";

import {  userNameValidator, userEmailValidator, userPhoneValidator, userQantityValidator } from "../EventValidators.js";

const toucherrorsRegistration = errorsRegistration => {
  return Object.entries(errorsRegistration).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useBookEventFormValidator = regForm => {
  const [errorsRegistration, seterrorsRegistration] = useState({
    user_name: {
      dirty: false, error: false, message: ""
    },
    user_email: {
      dirty: false, error: false, message: ""
    },
    user_mobile: {
      dirty: false, error: false, message: ""
    },
    user_quantity: {
      dirty: false, error: false, message: ""
    }
  });

  const validateRegistrationForm = ({ regForm, field, errorsRegistration, forceToucherrorsRegistration = false }) => {
    let isValid = true;

    // Create a deep copy of the errorsRegistration
    let nexterrorsRegistration = JSON.parse(JSON.stringify(errorsRegistration));

    // Force validate all the fields
    if (forceToucherrorsRegistration) {
      nexterrorsRegistration = toucherrorsRegistration(errorsRegistration);
    }

    const { user_name, user_email, user_mobile, user_quantity } = regForm;

    if (nexterrorsRegistration.user_name.dirty && (field ? field === "user_name" : true)) {
      const user_nameMessage = userNameValidator(user_name, regForm);
      nexterrorsRegistration.user_name.error = !!user_nameMessage;
      nexterrorsRegistration.user_name.message = user_nameMessage;
      if (!!user_nameMessage) isValid = false;
    }

    if (nexterrorsRegistration.user_email.dirty && (field ? field === "user_email" : true)) {
      const user_emailMessage = userEmailValidator(user_email, regForm);
      nexterrorsRegistration.user_email.error = !!user_emailMessage;
      nexterrorsRegistration.user_email.message = user_emailMessage;
      if (!!user_emailMessage) isValid = false;
    }

    if (nexterrorsRegistration.user_mobile.dirty && (field ? field === "user_mobile" : true)) {
      const user_mobileMessage = userPhoneValidator(user_mobile, regForm);
      nexterrorsRegistration.user_mobile.error = !!user_mobileMessage;
      nexterrorsRegistration.user_mobile.message = user_mobileMessage;
      if (!!user_mobileMessage) isValid = false;
    }

    if (nexterrorsRegistration.user_quantity.dirty && (field ? field === "user_quantity" : true)) {
      const user_quantityMessage = userQantityValidator(user_quantity, regForm);
      nexterrorsRegistration.user_quantity.error = !!user_quantityMessage;
      nexterrorsRegistration.user_quantity.message = user_quantityMessage;
      if (!!user_quantityMessage) isValid = false;
    }

    seterrorsRegistration(nexterrorsRegistration);

    return {
      isValid,
      errorsRegistration: nexterrorsRegistration,
    };
  };

  const onBlurRegistrationrField = e => {
    const field = e.target.name;
    if(field != 'coupon_text'){
      const fieldError = errorsRegistration[field];
      if (fieldError.dirty) return;

      const updatederrorsRegistration = {
        ...errorsRegistration,
        [field]: {
          ...errorsRegistration[field],
          dirty: true,
        },
      };

      validateRegistrationForm({ regForm, field, errorsRegistration: updatederrorsRegistration });
    }
  };

  return {
    validateRegistrationForm,
    onBlurRegistrationrField,
    errorsRegistration,
  };
};
