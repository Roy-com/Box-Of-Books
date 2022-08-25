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
    const [errr,seterrr]= useState();
    const[succc,setsuccc]=useState();
    const OtpSentButton=(e)=>{
        e.preventDefault();
        fetchHandeler().then((data) => {
       if(data.status=="ok"
       ){
        seterrr()
     
        setsuccc(data.message)
      
       setTimeout(function () {
                    
        setEmailSent(true)
      }, 2000);
       }
       else{
        seterrr(data.error)
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
     <Form style={{width:"286px"}}>
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
    
      {errr && !succc? <p style={{color:"red" , marginTop:"21px"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green" , marginTop:"21px"}}>{succc}</p>:" " }
    </Form>
    </div>:<OTPVerification email={inputs.email} />}
    </div>
  )
}

export default ForgetPassword