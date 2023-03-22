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
  