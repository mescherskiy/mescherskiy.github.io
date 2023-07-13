import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useLoginMutation } from "../api/api";
import { setCredentials } from "../slices/authSlice";
//import { login } from "../slices/auth";
import { clearMessage, setMessage } from "../slices/message";

const Login = () => {

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState("");

  const [login, loginResult] = useLoginMutation();

  let navigate = useNavigate();
  const dispatch = useDispatch();

  //const [loading, setLoading] = useState(false);

  //const { isLoggedIn } = useSelector((state) => state.auth);

  //const { message } = useSelector((state) => state.message);

  // useEffect(() => {
  //     dispatch(clearMessage());
  // }, [dispatch]);

  // const initialValues = {
  //     email: "",
  //     password: ""
  // }

  // const validationSchema = Yup.object().shape({
  //     email: Yup.string().required("This field is reguired!"),
  //     password: Yup.string().required("This field is required!")
  // });

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg("")
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await login({ email, password }).unwrap()
      dispatch(setCredentials(response))
      setEmail("")
      setPassword("")
      navigate("/profile")
    } catch (error) {
      if (!error.originalStatus) {
        setErrMsg("No server response")
      } else if (error.originalStatus === 400) {
        setErrMsg("Missing email or password")
      } else if (error.originalStatus === 401) {
        setErrMsg("Unauthorized")
      } else {
        setErrMsg("Login failed")
      }
      //errRef.current.focus()
    }
  }

  const handleEmailInput = (e) => setEmail(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  // const handleLogin = async (formValue) => {
  //     //setLoading(true);
  //     try {
  //         const { email, password } = formValue 
  //         const userData = await login({ email, password }).unwrap();
  //         console.log("userData:");
  //         console.log(userData);
  //         dispatch(setCredentials({ userData }));
  //     } catch (error) {
  //         if (!error.originalStatus) {
  //             //dispatch(setMessage("No Server Response"));
  //             setErrMsg("No Server Response")
  //         } else if (error.originalStatus === 400) {
  //             //dispatch(setMessage("Missing Email or Password"));
  //             setErrMsg("Missing Email or Password")
  //         } else if (error.originalStatus === 401) {
  //             //dispatch(setMessage("Unauthorized"));
  //             setErrMsg("Unauthorized")
  //         } else {
  //             //dispatch(setMessage("Login failed"));
  //             setErrMsg("Login failed")
  //         }
  //     }
  // }

  // const handleLogin = (formValue) => {
  //     const { email, password } = formValue;
  //     setLoading(true);
  //     dispatch(login({ email, password }))
  //         .unwrap()
  //         .then(() => {
  //             navigate("/profile");
  //             window.location.reload();
  //         })
  //         .catch(() => {
  //             setLoading(false);
  //         });
  // }

  if (loginResult.isLoading) {
    return <div>Loading...</div>
  } else if (loginResult.error) {
    return <div>Error: {loginResult.error.message}</div>
  } else {
    return (
      <div className="col-md-12 login-form">
        <div className="card card-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />
          {/* <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">E-mail</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>

                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={loginResult.isLoading}
                                >
                                    {loginResult.isLoading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Login</span>
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik> */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                name="email"
                id="email"
                type="text"
                ref={userRef}
                value={email}
                onChange={handleEmailInput}
                autoComplete="off"
                required
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                id="password"
                type="password"
                className="form-control"
                onChange={handlePasswordInput}
                value={password}
                required
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loginResult.isLoading}
              >
                {loginResult.isLoading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>
          </form>
        </div>

        {errMsg && (
          <div className="form-group">
            <div ref={errRef} className="alert alert-danger" role="alert" aria-live="assertive">
              {errMsg}
            </div>
          </div>
        )}
      </div>
    );
  }


};

export default Login;
