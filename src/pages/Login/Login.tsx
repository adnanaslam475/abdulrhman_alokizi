import React, { FormEvent, useState, useEffect } from "react";
import login from "./Login.module.scss";
import { NavLink } from "react-router-dom";
import { Container, Col, Form } from "react-bootstrap";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../images/logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
export default function Login() {
  let navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [show, setShow] = useState(true);

  //----validation----//
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //---react-toastify-----//
  const notify = (message: String) =>
    toast(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const [timenotify, setTimenotify] = useState("");
  const [onetimenotify, setOnetimenotify] = useState(false);
  useEffect(() => {
    if (onetimenotify) {
      notify(timenotify);
      setTimeout(() => {
        setOnetimenotify(false);
      }, 3000);
    }
  }, [onetimenotify]);

  const submitHandler = (postdata: any) => {
    let formdata = new FormData();
    formdata.append("phone", postdata.phone);
    formdata.append("password", postdata.password);

    axios
      .post(`${process.env.REACT_APP_BASEURL}/login`, formdata)
      .then(function (response: any) {
        if (response.data.status === true) {
          localStorage.setItem("___data", JSON.stringify(response.data.data));
          setTimenotify(response.data.msg);
          setOnetimenotify(true);
          localStorage.setItem("token", JSON.stringify(response.data.token));
          if (response.data.msg != "User not Registered") {
            setTimeout(() => {
              navigate("/orders");
            }, 2500);
          }
        } else {
          if (response.data.status == false) {
            setTimenotify(response.data.message);
            setOnetimenotify(true);
          }
          setTimenotify(response.data.message);
        }
      })
      .catch(function (error: any) {
        console.log(error);
        notify(error?.response?.data?.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <section className={login.loginSection}>
        <Container>
          <Col className={`${login.loginBox}`}>
            <img src={logo} className={`${login.logo}`} alt="logo" />

            <Form onSubmit={handleSubmit(submitHandler)}>
              <Form.Group
                className={`${login.formBox}`}
                controlId="formBasicEmail"
              >
                <Form.Label htmlFor="">Username</Form.Label>
                <Form.Control
                  className={`${login.formClass}`}
                  type="text"
                  required
                  placeholder="Username"
                  {...register("phone", {
                    required: true,
                  })}
                />
                {errors?.phone?.type === "required" && phone == "" && (
                  <p style={{ color: "red" }}>This field is required</p>
                )}
              </Form.Group>

              <Form.Group
                className={`${login.formBox}`}
                controlId="formBasicPassword"
              >
                <Form.Label htmlFor="">Password</Form.Label>
                <div className={`position-relative ${login.passwordBox}`}>
                  <Form.Control
                    className={`${login.formClass}`}
                    type={show ? "password" : "text"}
                    placeholder="Password"
                    {...register("password", {
                      required: "This password is required",
                      minLength: {
                        value: 6,
                        message: "Please enter minimum 6 characters",
                      },
                    })}
                  />
                  <div className={`${login.passwordAction}`}>
                    {show ? (
                      <AiOutlineEye
                        onClick={() => {
                          setShow(false);
                        }}
                      />
                    ) : (
                      <AiOutlineEyeInvisible
                        onClick={() => {
                          setShow(true);
                        }}
                      />
                    )}
                  </div>
                  {errors?.password?.type === "minLength" && (
                    <p style={{ color: "red" }}>
                      Please enter minimum 6 characters
                    </p>
                  )}
                  {errors?.password?.type === "required" && (
                    <p style={{ color: "red" }}>This field is required</p>
                  )}
                </div>
                <Col lg={12} className="text-end">
                  <NavLink className={`${login.forogotPassword}`} to="/">
                    Forget password ?
                  </NavLink>
                </Col>
                <Col lg={12} className={`${login.remberme}`}>
                  <label className={`${login.checkbox}`}>
                    <input type="checkbox" />
                    <span className={`${login.checkmark}`}></span>
                    Remember Me
                  </label>
                </Col>
              </Form.Group>
              <div className={`${login.submitBtnRow}`}>
                <button type="submit" className={`${login.submitBtn}`}>
                  Login
                </button>
              </div>
            </Form>
          </Col>
        </Container>
      </section>
    </>
  );
}
