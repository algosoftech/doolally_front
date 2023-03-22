class Helper {
  // Return Promise
  static setCurrentUserLegalAge = () => {
    //localStorage.setItem("currentUserLegalAge","Yes");
    sessionStorage.setItem("currentUserLegalAge","Yes");
    return Promise.resolve({ legalAge: "Yes" });
  };

  static checkCurrentUserLegalAge = () => {
    //const currentUserLegalAge = localStorage.getItem("currentUserLegalAge");
    const currentUserLegalAge = sessionStorage.getItem("currentUserLegalAge");
    if(currentUserLegalAge){
      return Promise.resolve({ legalAge: "Yes" });
    } else {
      return Promise.resolve({ legalAge: "No" });
    }
  };

  static deleteCurrentUserLegalAge = () => {
    sessionStorage.removeItem("currentUserLegalAge","Yes");
    return Promise.resolve({ legalAge: "No" });
  };
}
export default Helper;