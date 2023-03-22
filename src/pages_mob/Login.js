import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import clsx from "clsx";
import styles from "../components/validators/login/LoginForm.module.css";
import { useLoginFormValidator } from "../components/validators/login/useLoginFormValidator";

import Helper from "../utils/Helper";
import LoadingSpinner from "../components/spinner/LoadingSpinner";
import {
  postRequestOptions,
  apiBaseUrl,
  userLoginApiUrl,
} from "../config/constant";

import {
  setUserCurrLoc,
  getUserCurrLoc,
  setUserSession,
  getUser,
  getToken,
  setLoginReferalUrl,
  getLoginReferalUrl,
  removeLoginReferalUrl,
} from "../utils/UserAuthenticate";

const Login = () => {
  const { referalUrl } = useParams();
  if (referalUrl) {
    setLoginReferalUrl(referalUrl);
    window.location = "/login";
  }

  const [eye, seteye] = useState(true);
  const [inpass, setinpass] = useState("password");
  const [isloading, setIsloading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitButtonLoading, setIsSubmitButtonLoading] = useState(false);

  useEffect(() => {
    Helper.checkCurrentUserLegalAge().then((res) => {
      if (res.legalAge === "No") {
        window.location = "/homepage";
      }
    });
    if (!getUserCurrLoc()) {
      setUserCurrLoc();
    }
    if (getUser()) {
      window.location = "/";
    }
  }, []);

  const [form, setForm] = useState({
    email: "",
    //password: ""
    mobile: "",
  });

  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const onUpdateField = (e) => {
    const field = e.target.name;
    const nextFormState = { ...form, [field]: e.target.value };
    setForm(nextFormState);
    if (errors[field].dirty)
      validateForm({ form: nextFormState, errors, field });
  };

  // const Eye=()=>{
  //     if(inpass==="password"){
  //         setinpass("text");
  //         seteye(false);
  //     } else{
  //         setinpass("password");
  //         seteye(true);
  //     }
  // }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });
    if (!isValid) return;
    const userCurrLoc = getUserCurrLoc();
    setIsloading(true);
    let formData = form;
    formData.userIpAdress = userCurrLoc.IPv4;
    postRequestOptions.body = JSON.stringify(form, null, 2);
    //console.log(postRequestOptions);
    try {
      setIsSubmitButtonLoading(true);
      //here Api call for Home page
      let result = await fetch(
        apiBaseUrl + userLoginApiUrl,
        postRequestOptions
      );
      if (result) {
        result = await result.json();
        if (result.statusCode === "success") {
          //console.log(result);
          setUserSession(
            result.response.result.userToken,
            result.response.result.userData[0]
          );
          const loginReferalUrl = getLoginReferalUrl();
          if (loginReferalUrl) {
            removeLoginReferalUrl();
            window.location = "/" + loginReferalUrl;
          } else {
            window.location = "/";
          }
        } else {
          setErrorMsg(result.statusMessage);
        }
        setIsloading(false);
        setIsSubmitButtonLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error while login. Try again later.");
    }
  };

  return (
    <>
      <div
        className="login_page"
        style={{
          margin: "110px auto",
        }}
      >
        <section className="d_main_panel">
          <div className="container">
            <div className="d_create_event  box_padding ">
              <div className="d_title_box">
                <div id="dirty_hedline_font" style={{ fontSize: "25px" }}>
                <Link to="/">
                  <div className="h-center justify-content-center">
                    <img
                      src={process.env.PUBLIC_URL + "/images/splashLogo.png"}
                      alt="logo"
                      style={{ width: "90px" }}
                    />
                    <br />
                    <span className="d_line"></span>
                    <span className="d_line"></span>
                  </div>
                  </Link>
                  <h6
                    id="Averia_font"
                    style={{
                      fontWeight: "bold",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      textAlign: "center",
                    }}
                  >
                    Sign in to continue
                  </h6>
                  <h6
                    id="Averia_font"
                    style={{
                      fontWeight: "bold",
                      marginTop: "-5px",
                      marginBottom: "15px",
                      textAlign: "center",
                    }}
                  >
                    {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                  </h6>
                </div>
              </div>
              <form className={styles.form} onSubmit={onSubmitForm}>
                <div className="row g-4">
                  <div className="poppins">
                    <div className="form-group">
                      <img
                        src={process.env.PUBLIC_URL + "/images/icons/user.png"}
                        alt=""
                        style={{ width: "28px", padding: "2%" }}
                      />
                      <input
                        className={clsx(
                          styles.formField,
                          errors.email.dirty &&
                            errors.email.error &&
                            styles.formFieldError
                        )}
                        type="text"
                        aria-label="Enter email"
                        name="email"
                        placeholder="Enter email"
                        value={form.email}
                        onChange={onUpdateField}
                        onBlur={onBlurField}
                        style={{ padding: "0" }}
                      />
                      {errors.email.dirty && errors.email.error ? (
                        <p className={styles.formFieldErrorMessage}>
                          {errors.email.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  {/* <div className="poppins">
                                        <div className="form-group" >
                                            <img src={process.env.PUBLIC_URL + "/images/icons/key.png"} alt="" style={{width: "23px",height:"23px",}} />
                                            <input
                                                className={clsx(
                                                    styles.formField,
                                                    errors.password.dirty &&
                                                    errors.password.error &&
                                                    styles.formFieldError
                                                )}
                                                type={inpass}
                                                aria-label="Enter password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={form.password}
                                                onChange={onUpdateField}
                                                onBlur={onBlurField}
                                                />
                                                {errors.password.dirty && errors.password.error ? (
                                                <p className={styles.formFieldErrorMessage}>
                                                    {errors.password.message}
                                                </p>
                                                ) : null}
                                                <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye"}`}></i>
                                        </div>
                                    </div> */}
                  {/* <p className="d_main_sub_title"><Link to="/forgot-password" className="d_main_sub_title" style={{textDecoration:"none"}}>Forgot Password?</Link></p> */}
                  <div className="poppins">
                    <div className="form-group">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/images/icons/smartphone.png"
                        }
                        alt=""
                        style={{ width: "23px", height: "23px" }}
                      />
                      <input
                        className={clsx(
                          styles.formField,
                          errors.mobile.dirty &&
                            errors.mobile.error &&
                            styles.formFieldError
                        )}
                        type="text"
                        aria-label="Enter Mobile Number"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        value={form.mobile}
                        onChange={onUpdateField}
                        onBlur={onBlurField}
                        style={{ padding: "0" }}
                      />
                      {errors.mobile.dirty && errors.mobile.error ? (
                        <p className={styles.formFieldErrorMessage}>
                          {errors.mobile.message}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 text-center mt-4 pt-2">
                    <button type="submit" className="d_comn_btn col-4 ">
                      {isSubmitButtonLoading ? "Loading..." : "Login"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      {/* <div className="foot-login poppins  ">
                Don't have an account? <Link to="/signUp" className="d_main_sub_title" style={{textDecoration:"none"}}>Sign Up</Link>
            </div> */}
    </>
  );
};
export default Login;
