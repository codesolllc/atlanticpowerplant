import { useState, useRef } from "react";
import style from "./otp.module.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import BASE_URL from "../../Config";

function Otp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const inputRefs = useRef([]);

  const location = useLocation();
  const email = location?.state?.email;
  // console.log(email, "Location Email Here");

  // eslint-disable-next-line no-unused-vars

  const handleOtpChange = (event, index) => {
    const { value } = event.target;
    const otpArray = [...otp];
    otpArray[index] = value;
    const newOtp = otpArray.join("");
    setOtp(newOtp);

    if (value !== "") {
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const otpVerify = async () => {
    try {
      const res = await axios.patch(`${BASE_URL}/auth/verify-otp`, {
        email: email,
        otpCode: otp,
      });
      // console.log("verify", res.data);
      if (res.data.status !== 200) {
        return alert("Invalid Otp");
      } else {
        alert("Verified Successfully");
        localStorage.setItem("user", JSON.stringify(res.data));
        // console.log("Check from here", res.data);
        navigate("/");
      }
      // console.log(typeof otp, otp);
    } catch (error) {
      console.log(error);
      alert("Invalid OTP");
    }
  };

  const onResendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${BASE_URL}/auth/resend-otp`, {
        email: email,
      });
      // console.log(res.data, "REsend Otp");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!email ? (
        <Navigate to="/" />
      ) : (
        <Container className={`${style.main} text-center`}>
          <Row>
            <Col>
              <div className={style.heading}>
                <h2>OTP Verification</h2>
                <p>
                  We’ve just sent you 4 digits code to your email
                  example@gmail.com
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="py-3 d-flex flex-column justify-content-center align-items-center">
              <form className={style.inputFields}>
                {[...Array(6)].map((_, index) => (
                  <input
                    className={style.otpAuhtFields}
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    key={index + 1}
                    type="number"
                    value={otp[index] || ""}
                    onChange={(event) => handleOtpChange(event, index)}
                    maxLength={1}
                  />
                ))}
              </form>

              <div className="pt-5 w-100">
                <button onClick={otpVerify} className={style.mainBtn}>
                  Submit
                </button>
              </div>

              <div
                className={`${style.footer} d-inline-flex py-5 w-100 justify-content-between`}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-start">Don’t received the code?</p>
                </div>
                <p>
                  <button onClick={onResendOtp} className="px-3">
                    Resend Code
                  </button>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Otp;
