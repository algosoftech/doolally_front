// set the user current location from the session storage
export const setUserCurrLoc = async () => {
  let userLoc       =   await fetch('https://geolocation-db.com/json/');
    if(userLoc){
      userLoc       =   await userLoc.json();
      sessionStorage.setItem('userCurrLoc', JSON.stringify(userLoc));
    }
}

// return the user current location from the session storage
export const getUserCurrLoc = () => {
  const userLoc = sessionStorage.getItem('userCurrLoc');
  if (userLoc) return JSON.parse(userLoc);
  else return null;
}

// remove the user current location from the session storage
export const removeUserCurrLoc = () => {
  sessionStorage.removeItem('userCurrLoc');
}


// return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}
 
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}
 
// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}

// set the login referal page url to the session storage
export const setLoginReferalUrl = async (pageName) => {
  sessionStorage.setItem('loginReferalUrl', pageName);
}

// return the login referal page url from the session storage
export const getLoginReferalUrl = () => {
  return sessionStorage.getItem('loginReferalUrl') || null;
}

// remove the login referal page url from the session storage
export const removeLoginReferalUrl = () => {
  sessionStorage.removeItem('loginReferalUrl');
}

// set the forgot password email to the session storage
export const setForgotPasswordEmail = async (email) => {
  sessionStorage.setItem('forgotPasswordEmail', email);
}

// return the forgot password email from the session storage
export const getForgotPasswordEmail = () => {
  return sessionStorage.getItem('forgotPasswordEmail') || null;
}

// remove the forgot password email from the session storage
export const removeForgotPasswordEmail = () => {
  sessionStorage.removeItem('forgotPasswordEmail');
}