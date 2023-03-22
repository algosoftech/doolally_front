import { useState } from "react";

import {
  eventImageValidator,
  eventNameValidator,
  eventDescValidator,
  eventDateValidator,
  startTimeValidator,
  endTimeValidator,
  eventPlaceValidator,
  eventCapacityValidator,
  costTypeValidator,
  eventPriceValidator,
  cateIdValidator,
  creatorNameValidator,
  creatorPhoneValidator,
  creatorEmailValidator,
  aboutCreatorValidator,
  termNConditionValidator,
} from "../EventValidators.js";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useCreateEventFormValidator = (form) => {
  const [errors, setErrors] = useState({
    eventImage: {
      dirty: false,
      error: false,
      message: "",
    },
    eventName: {
      dirty: false,
      error: false,
      message: "",
    },
    eventDesc: {
      dirty: false,
      error: false,
      message: "",
    },
    eventDate: {
      dirty: false,
      error: false,
      message: "",
    },
    startTime: {
      dirty: false,
      error: false,
      message: "",
    },
    endTime: {
      dirty: false,
      error: false,
      message: "",
    },
    eventPlace: {
      dirty: false,
      error: false,
      message: "",
    },
    eventCapacity: {
      dirty: false,
      error: false,
      message: "",
    },
    costType: {
      dirty: false,
      error: false,
      message: "",
    },
    eventPrice: {
      dirty: false,
      error: false,
      message: "",
    },
    cateId: {
      dirty: false,
      error: false,
      message: "",
    },
    creatorName: {
      dirty: false,
      error: false,
      message: "",
    },
    creatorPhone: {
      dirty: false,
      error: false,
      message: "",
    },
    creatorEmail: {
      dirty: false,
      error: false,
      message: "",
    },
    aboutCreator: {
      dirty: false,
      error: false,
      message: "",
    },
    termNCondition: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const {
      eventImage,
      eventName,
      eventDesc,
      eventDate,
      startTime,
      endTime,
      eventPlace,
      eventCapacity,
      costType,
      eventPrice,
      cateId,
      creatorName,
      creatorPhone,
      creatorEmail,
      aboutCreator,
      termNCondition,
    } = form;

    if (
      nextErrors.eventImage.dirty &&
      (field ? field === "eventImage" : true)
    ) {
      const eventImageMessage = eventImageValidator(eventImage, form);
      nextErrors.eventImage.error = !!eventImageMessage;
      nextErrors.eventImage.message = eventImageMessage;
      if (!!eventImageMessage) isValid = false;
    }

    if (nextErrors.eventName.dirty && (field ? field === "eventName" : true)) {
      const eventNameMessage = eventNameValidator(eventName, form);
      nextErrors.eventName.error = !!eventNameMessage;
      nextErrors.eventName.message = eventNameMessage;
      if (!!eventNameMessage) isValid = false;
    }

    if (nextErrors.eventDesc.dirty && (field ? field === "eventDesc" : true)) {
      const eventDescMessage = eventDescValidator(eventDesc, form);
      nextErrors.eventDesc.error = !!eventDescMessage;
      nextErrors.eventDesc.message = eventDescMessage;
      if (!!eventDescMessage) isValid = false;
    }

    if (nextErrors.eventDate.dirty && (field ? field === "eventDate" : true)) {
      const eventDateMessage = eventDateValidator(eventDate, form);
      nextErrors.eventDate.error = !!eventDateMessage;
      nextErrors.eventDate.message = eventDateMessage;
      if (!!eventDateMessage) isValid = false;
    }

    if (nextErrors.startTime.dirty && (field ? field === "startTime" : true)) {
      const startTimeMessage = startTimeValidator(startTime, form);
      nextErrors.startTime.error = !!startTimeMessage;
      nextErrors.startTime.message = startTimeMessage;
      if (!!startTimeMessage) isValid = false;
    }

    if (nextErrors.endTime.dirty && (field ? field === "endTime" : true)) {
      const endTimeMessage = endTimeValidator(endTime, form);
      nextErrors.endTime.error = !!endTimeMessage;
      nextErrors.endTime.message = endTimeMessage;
      if (!!endTimeMessage) isValid = false;
    }

    if (
      nextErrors.eventPlace.dirty &&
      (field ? field === "eventPlace" : true)
    ) {
      const eventPlaceMessage = eventPlaceValidator(eventPlace, form);
      nextErrors.eventPlace.error = !!eventPlaceMessage;
      nextErrors.eventPlace.message = eventPlaceMessage;
      if (!!eventPlaceMessage) isValid = false;
    }

    // if (nextErrors.eventCapacity.dirty && (field ? field === "eventCapacity" : true)) {
    //   const eventCapacityMessage = eventCapacityValidator(eventCapacity, form);
    //   nextErrors.eventCapacity.error = !!eventCapacityMessage;
    //   nextErrors.eventCapacity.message = eventCapacityMessage;
    //   if (!!eventCapacityMessage) isValid = false;
    // }

    if (nextErrors.costType.dirty && (field ? field === "costType" : true)) {
      const costTypeMessage = costTypeValidator(costType, form);
      nextErrors.costType.error = !!costTypeMessage;
      nextErrors.costType.message = costTypeMessage;
      if (!!costTypeMessage) isValid = false;
    }

    if (
      nextErrors.eventPrice.dirty &&
      (field ? field === "eventPrice" : true)
    ) {
      if (form.costType == 2) {
        const eventPriceMessage = eventPriceValidator(eventPrice, form);
        nextErrors.eventPrice.error = !!eventPriceMessage;
        nextErrors.eventPrice.message = eventPriceMessage;
        if (!!eventPriceMessage) isValid = false;
      } else {
        const eventPriceMessage = "";
        nextErrors.eventPrice.error = !!eventPriceMessage;
        nextErrors.eventPrice.message = eventPriceMessage;
        if (!!eventPriceMessage) isValid = false;
      }
    }

    if (nextErrors.cateId.dirty && (field ? field === "cateId" : true)) {
      const cateIdMessage = cateIdValidator(cateId, form);
      nextErrors.cateId.error = !!cateIdMessage;
      nextErrors.cateId.message = cateIdMessage;
      if (!!cateIdMessage) isValid = false;
    }

    if (
      nextErrors.creatorName.dirty &&
      (field ? field === "creatorName" : true)
    ) {
      const creatorNameMessage = creatorNameValidator(creatorName, form);
      nextErrors.creatorName.error = !!creatorNameMessage;
      nextErrors.creatorName.message = creatorNameMessage;
      if (!!creatorNameMessage) isValid = false;
    }

    if (
      nextErrors.creatorPhone.dirty &&
      (field ? field === "creatorPhone" : true)
    ) {
      const creatorPhoneMessage = creatorPhoneValidator(creatorPhone, form);
      nextErrors.creatorPhone.error = !!creatorPhoneMessage;
      nextErrors.creatorPhone.message = creatorPhoneMessage;
      if (!!creatorPhoneMessage) isValid = false;
    }

    if (
      nextErrors.creatorEmail.dirty &&
      (field ? field === "creatorEmail" : true)
    ) {
      const creatorEmailMessage = creatorEmailValidator(creatorEmail, form);
      nextErrors.creatorEmail.error = !!creatorEmailMessage;
      nextErrors.creatorEmail.message = creatorEmailMessage;
      if (!!creatorEmailMessage) isValid = false;
    }

    if (
      nextErrors.aboutCreator.dirty &&
      (field ? field === "aboutCreator" : true)
    ) {
      const aboutCreatorMessage = aboutCreatorValidator(aboutCreator, form);
      nextErrors.aboutCreator.error = !!aboutCreatorMessage;
      nextErrors.aboutCreator.message = aboutCreatorMessage;
      if (!!aboutCreatorMessage) isValid = false;
    }

    if (
      nextErrors.termNCondition.dirty &&
      (field ? field === "termNCondition" : true)
    ) {
      const termNConditionMessage = termNConditionValidator(
        termNCondition,
        form
      );
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

  const onBlurField = (e) => {
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
