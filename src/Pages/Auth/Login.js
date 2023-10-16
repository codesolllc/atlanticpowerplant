import React, { useState } from "react";
import styles from "./login.module.css";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import loginImg from "../Auth/loginbg.png";
import BASE_URL from "../../Config";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setLoginFields({ ...loginFields, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/auth/login`, loginFields);
      if (res.status === 200) {
        navigate("/otp-verify", { state: { email: res.data.user.email } });
        // console.log(res.data);
      }
      // console.log("Response", res.data.user.email);
    } catch (error) {
      console.log(error);
      alert("Invalid Credentials");
    }
  };

  const validateUser = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {validateUser === null ? (
        <Container>
          <Row className={styles.loginWrapper}>
            <Col lg="6" md="12">
              <h1 className={`py-5  ${styles.loginHeading}`}>Login</h1>
              <div className={styles.formWrapper}>
                <h5>Email</h5>
                <Form.Control
                  size="lg"
                  className={styles.loginFields}
                  type="email"
                  onChange={handleOnChange}
                  name="email"
                  value={loginFields.email}
                  placeholder="example@gmail.com"
                />
                <h5>Password</h5>
                <Form.Control
                  size="lg"
                  className={styles.loginFields}
                  type="password"
                  name="password"
                  onChange={handleOnChange}
                  value={loginFields.password}
                  placeholder="Password"
                />
                <div className="d-flex justify-content-between">
                  {/* <div className="d-flex">
                    <Form.Check
                      className={styles.checkBox}
                      aria-label="option 1"
                    />
                    <h6 className="ps-2">Remember Me</h6>
                  </div> */}

                  {/* <div>
                    <h6 className={styles.forgotPass}>Forgot Password ?</h6>
                  </div> */}
                </div>
              </div>

              <div className={`my-4 ${styles.loginBtn}`}>
                <button onClick={onSubmit} className="w-100">
                  LOGIN
                </button>
              </div>
            </Col>
            <Col md="6" className={styles.hide}>
              <div className={styles.loginCol2}>
                <img src={loginImg} alt="login" className={styles.file} />
              </div>
            </Col>
          </Row>
        </Container>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
}

export default Login;
