export const usernameValidator = (username) => {
  if (!username) {
    return "Username is required";
  } else if (username.length < 4) {
    return "Username must have a minimum 4 characters";
  }
  return "";
};

export const firstnameValidator = (firstname) => {
  if (!firstname) {
    return "First name is required.";
  } else if (firstname.length < 4) {
    return "First name must have a minimum 4 characters";
  }
  return "";
};

export const lastnameValidator = (lastname) => {
  if (!lastname) {
    return "Last name is required.";
  } else if (lastname.length < 4) {
    return "Last name must have a minimum 4 characters.";
  }
  return "";
};

export const emailValidator = (email) => {
  if (!email) {
    return "Email is required.";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format!";
  }
  return "";
};

export const mobileValidator = (mobile) => {
  if (!mobile) {
    return "Mobile number is required.";
  } else if (!new RegExp(/^[0-9\b]+$/).test(mobile)) {
    return "Please enter only number.";
  } else if (mobile.length != 10) {
    return "Please enter valid phone number.";
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required.";
  } else if (password.length < 6) {
    return "Password must have a minimum 6 characters.";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required.";
  } else if (confirmPassword.length < 6) {
    return "Confirm password must have a minimum 6 characters.";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match.";
  }
  return "";
};

export const termNConditionValidator = (termNCondition) => {
  if (!termNCondition) {
    return "Term and condition is required.";
  }
  return "";
};

export const otpValidator = (userOtp) => {
  if (!userOtp) {
    return "OTP is required.";
  } else if (userOtp.length < 4) {
    return "OTP must have a minimum 4 numbers.";
  }
  return "";
};
