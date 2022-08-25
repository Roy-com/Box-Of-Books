import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./OTPVerification.css";
import { useNavigate } from "react-router-dom";
import ResetPassword from "../ResetPassword/ResetPassword";
import axios from "axios";
const URL = "http://localhost:5000/users/otpverification";
const URLresend = "http://localhost:5000/users/emailsend";
const OTPVerification = (email) => {
  const history = useNavigate();
  console.log(email);

  // /rsend Button after Otp expired
  const [remainingSecs, setRemainingSecs] = useState(20);
  const formatNumber = (number) => `0${number}`.slice(-2);
  const getRemaining = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;
    return { mins: formatNumber(mins), secs: formatNumber(secs) };
  };
  const { mins, secs } = getRemaining(remainingSecs);
  let time = `${mins}:${secs}`;
  // End rsend Button after Otp expired

  const [expired, setexpired] = useState("Verify");
  const [otpVerified, setOtpVerified] = useState(false);
  const fetchHandelers = async () => {
    return await axios.post(URLresend,{email:email.email}).then((res) => res.data);
  };
  const fetchHandeler = async () => {
    return await axios
      .post(URL, { otp: String(inputs.otp) })
      .then((res) => res.data);
  };
  const [errr, seterrr] = useState();
  const [succc, setsuccc] = useState();
  const VerifyButton = (e) => {
    e.preventDefault();
    setexpired("Verify");
    fetchHandeler().then((data) => {
      console.log(data);
      if (data.status == "ok") {
        console.log(email);
        setInputs(() => ({
          otp: "",
        }));
        
        seterrr();
        setsuccc(data.message);

        setTimeout(function () {
          setOtpVerified(true);
        }, 3000);
      } else {
        // if (remainingSecs === 0) {
        //   if (data.error == "otp expired" || data.error==="otp didn't match") {
        //     setexpired("Resend");
        //     setRemainingSecs(20);
        //     seterrr("OTP expired!");
        //   }
        // }
          setsuccc()
          setInputs(() => ({
               
            otp: "",
             
            }));
          seterrr(data.error);
        
      }
    });
    
  };
  const resndButton=(e)=>{
    e.preventDefault();
    setInputs(() => ({
               
      otp: "",
       
      }));
 
    setRemainingSecs(20);
    seterrr();
    setsuccc("A new OTP has just semt.")
    fetchHandelers().then((data) => {
      console.log(data);
      if (data.status == "ok") {
        setInputs(() => ({
               
        otp: "",
         
        }));
      
        console.log(data);
         }
    });

  }
  const [emaila, setemail] = useState(email.email);
  const [inputs, setInputs] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    let interval = null;
    if (remainingSecs !== 0) {
      interval = setInterval(() => {
        setRemainingSecs((remainingSecs) => remainingSecs - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [remainingSecs]);
  return (
    <div>
      {!otpVerified ? (
        <div className="LoginForm">
          <Form>
            <h3 className="headingOfforms">Verify OTP</h3>
            <Form.Group className="mb-3 timeremaininclockContainer" controlId="formBasicEmail">
              <Form.Text className="text-muted notaMembertext">
                OTP has been sent on email:{" "}
                <span style={{ color: "#95866a" }}>{`${emaila}`}</span>
              </Form.Text>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                name="otp"
                value={inputs.otp}
                onChange={handleChange}
              />
          <div className="timeremaininclock">{ time}</div>
            </Form.Group>
           {remainingSecs===0? <Button
              variant="primary"
              type="submit"
              onClick={resndButton}
              className="LoginButtonLoginPage"
            >
              Resend
            </Button>
           : <Button
              variant="primary"
              type="submit"
              onClick={VerifyButton}
              className="LoginButtonLoginPage"
            >
              Verify
            </Button>}

            {errr && !succc && remainingSecs!==0 ? (
              <p style={{ color: "red", marginTop: "11px" }}>{errr}</p>
            ) : (
              " "
            )}
            {succc && !errr && remainingSecs!==0 ? (
              <p style={{ color: "green", marginTop: "11px" }}>{succc}</p>
            ) : (
              " "
            )}
            {remainingSecs===0? <p style={{ color: "red", marginTop: "11px" }}>OTP EXPIRED</p>:""}
          </Form>
        </div>
      ) : (
        <ResetPassword email={email} />
      )}
    </div>
  );
};

export default OTPVerification;
