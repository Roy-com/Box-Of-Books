import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./ResetPassword.css"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
const URL = "http://localhost:5000/users/resetpassword";

const ResetPassword = (email) => {
    const history = useNavigate();
    const fetchHandeler = async () => {
      return await axios.post(URL,{email:email.email, password: String(inputs.password),repassword: String(inputs.repassword)}).then((res) => res.data);
    };
    const [errr,seterrr]= useState();
    const[succc,setsuccc]=useState();
    const ResetButton=(e)=>{
      e.preventDefault();
      fetchHandeler().then((data) => {
     if(data.status=="ok"
     ){

      setInputs(() => ({
               
        password: "",
        repassword: "",
       
      }));

     seterrr()
     setsuccc(data.message)
   
    setTimeout(function () {
                 
      history("../login")
   }, 3000);

     
     
     }
     else{
      seterrr(data.error)
     }
      
       
      });
      
    }

    const [inputs, setInputs] = useState({
      password: "",
      repassword:""
      
    });
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  return (
    <div>
         <div className='LoginForm'>
     <Form style={{width:"343px",height:"343px"}}>
     <h3 className="headingOfforms">Reset Password</h3>
     <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name='password'  value={inputs.email}
            onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='repassword' value={inputs.email}
            onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={ResetButton} className="LoginButtonLoginPage">
        Reset

      </Button>
      {errr && !succc? <p style={{color:"red" , marginTop:"11px"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green" , marginTop:"11px"}}>{succc}</p>:" " }
    </Form>
    </div>
    </div>
  )
}

export default ResetPassword