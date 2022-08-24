import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ForgetPassword.css"
import { useNavigate } from "react-router-dom";
import OTPVerification from '../OTPVerification/OTPVerification';
import axios from 'axios';
const URL = "http://localhost:5000/users/emailsend";

const ForgetPassword = () => {
    const history = useNavigate();
    const [emailsent, setEmailSent] = useState(false);
    const fetchHandeler = async () => {
      return await axios.post(URL,{email:String(inputs.email)}).then((res) => res.data);
    };
    const OtpSentButton=(e)=>{
        e.preventDefault();
        fetchHandeler().then((data) => {
       if(data.status=="ok"
       ){
        alert(data.message)
       setEmailSent(true)
       }
       else{
        alert(data.error)
       }
        
         
        });
        
    }
    const [inputs, setInputs] = useState({
      email: "",
      
    });
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    const BackToLoginPage=(e)=>{
      e.preventDefault();
      history("/login")
      
    }
  return (
    <div>
        {!emailsent? <div className='LoginForm'>
     <Form>
     <h3 className="headingOfforms">Verification</h3>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control  type="email"
            placeholder="Enter email"
            name="email"
            value={inputs.email}
            onChange={handleChange} />
       
      </Form.Group>
      <Button variant="primary" type="submit" className='SendOtpButton LoginButtonLoginPage' onClick={OtpSentButton} >
        Send OTP 
      </Button>
      <Button variant="primary" className='SendOtpButton LoginButtonLoginPage' onClick={BackToLoginPage} style={{marginLeft:"10px"}} >
        Back
      </Button>
    </Form>
    </div>:<OTPVerification email={inputs.email} />}
    </div>
  )
}

export default ForgetPassword