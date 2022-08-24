import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./OTPVerification.css"
import { useNavigate } from "react-router-dom";
import ResetPassword from '../ResetPassword/ResetPassword';
import axios from 'axios';
const URL = "http://localhost:5000/users/otpverification";
const OTPVerification = (email) => {
    const history = useNavigate();
   
    const [otpVerified, setOtpVerified] = useState(false);
    const fetchHandeler = async () => {
      return await axios.post(URL,{otp:String(inputs.otp)}).then((res) => res.data);
    };
    const VerifyButton=(e)=>{
      e.preventDefault();
      fetchHandeler().then((data) => {
        console.log(data)
     if(data.status=="ok"
     ){
      alert(data.message)
     setOtpVerified(true)
     }
     else{
      alert(data.error)
     }
       
       
      });
    }
    const [inputs, setInputs] = useState({
      otp: "",
      
    });
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  return (
    <div>
      {!otpVerified?   <div className='LoginForm'>
     <Form>
     <h3 className="headingOfforms">Verify OTP</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Text className="text-muted ">
          OTP has been sent to this email
        </Form.Text>
        <Form.Control type="text" placeholder="Enter OTP"    name="otp"
            value={inputs.otp}
            onChange={handleChange}/>
        
      </Form.Group>
      <Button variant="primary" type="submit" onClick={VerifyButton} className="LoginButtonLoginPage">
        Verify
      </Button>
    </Form>
    </div>: <ResetPassword email={email}/>}
    </div>
  )
}

export default OTPVerification