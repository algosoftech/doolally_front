import { useState } from "react";
import { getRequestOptions, apiBaseUrl, userCheckEmailApiUrl } from '../../../config/constant';

import {
  firstnameValidator,
  lastnameValidator,
  emailValidator,
  mobileValidator,
  passwordValidator,
  confirmPasswordValidator,
  termNConditionValidator
} from "../Validators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};


export const useSignupFormValidator = form => {
  const [errors, setErrors] = useState({
    firstname: {
      dirty: false,
      error: false,
      message: "",
    },
    lastname: {
      dirty: false,
      error: false,
      message: "",
    },
    email: {
      dirty: false,
      error: false,
      message: "",
    },
    mobile: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
    termNCondition: {
      dirty: false, error: false, message: ""
    }
  });

  const [emailCheckMessage, setEmailCheckMessage] = useState("");

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { firstname, lastname, email, mobile, password, confirmPassword, termNCondition } = form;

    if (nextErrors.firstname.dirty && (field ? field === "firstname" : true)) {
      const firstnameMessage = firstnameValidator(firstname, form);
      nextErrors.firstname.error = !!firstnameMessage;
      nextErrors.firstname.message = firstnameMessage;
      if (!!firstnameMessage) isValid = false;
    }

    if (nextErrors.lastname.dirty && (field ? field === "lastname" : true)) {
      const lastnameMessage = lastnameValidator(lastname, form);
      nextErrors.lastname.error = !!lastnameMessage;
      nextErrors.lastname.message = lastnameMessage;
      if (!!lastnameMessage) isValid = false;
    }

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage){ 
        isValid = false; 
      } 
      /*
      else {
        //const checkEmailMessage = checkUserEmailAvailable(email);
       // console.log(checkEmailMessage);
        //checkEmailMessage       =   checkEmailMessage.json();
        //console.log(checkEmailMessage.emailAvailable);
        // nextErrors.email.error = !!checkEmailMessage;
        // nextErrors.email.message = checkEmailMessage;
        // if (!!checkEmailMessage) isValid = false; 
        // checkUserEmailAvailable(email).then((result)=> { 
        //   if(result.emailAvailable == 'No'){ setEmailCheckMessage(result.message); console.log(result.message); } //return result.message } return ""; 
        // });
        //const checkEmailMessage = checkUserEmailAvailable(email);
        // nextErrors.email.error = !!checkEmailMessage;
        // nextErrors.email.message = checkEmailMessage;
        // if (!!checkEmailMessage) isValid = false; 
        checkUserEmailAvailable(email);
        console.log(emailCheckMessage);
        console.log(isValid);
      }
      */
    }

    if (nextErrors.mobile.dirty && (field ? field === "mobile" : true)) {
      const mobileMessage = mobileValidator(mobile, form);
      nextErrors.mobile.error = !!mobileMessage;
      nextErrors.mobile.message = mobileMessage;
      if (!!mobileMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (nextErrors.confirmPassword.dirty && (field ? field === "confirmPassword" : true) ) {
      const confirmPasswordMessage = confirmPasswordValidator(confirmPassword, form);
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;
      if (!!confirmPasswordMessage) isValid = false;
    }

    if (nextErrors.termNCondition.dirty && (field ? field === "termNCondition" : true)) {
      const termNConditionMessage = termNConditionValidator(termNCondition, form);
      nextErrors.termNCondition.error = !!termNConditionMessage;
      nextErrors.termNCondition.message = termNConditionMessage;
      if (!!termNConditionMessage) isValid = false;
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

  // const checkUserEmailAvailable = async(email) => {
  //   let curResult     =   await fetch(apiBaseUrl+userCheckEmailApiUrl+'?emailId='+email,getRequestOptions);
  //   if(curResult){
  //     curResult       =   await curResult.json();
  //     // if(curResult.statusCode === 'available'){
  //     //   return Promise.resolve({ emailAvailable: "Yes", message: curResult.statusMessage });
  //     // } else {
  //     //   return Promise.resolve({ emailAvailable: "No", message: curResult.statusMessage });
  //     // }
  //     if(curResult.statusCode === 'NotAvailable'){
  //       setEmailCheckMessage(curResult.statusMessage);
  //     }
  //   }    
  // };

  
  return {
    validateForm,
    onBlurField,
    errors,
  };
};