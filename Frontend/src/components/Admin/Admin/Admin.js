import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import "./Login.css";
// import "../../"
import { useNavigate, } from "react-router-dom";
import Cookies from "js-cookie";
import AuthService from "../../../services/auth.service";
import AllAuthorBooks from "./AllAuthorBooks";
const URL = "http://localhost:5000/users";
const AdminLogedCheck=localStorage.getItem("AdminLoged")
const Admin = () => {
  const history = useNavigate();
 

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };




 
    const [errr,seterrr]= useState();
    const[succc,setsuccc]=useState();
  const handleLogin = (e) => {
      e.preventDefault();
     if(inputs.username==="aryan"   &&  inputs.password==="aryan"){
        seterrr()
        setsuccc("Admin Logged IN")
     
       localStorage.setItem("AdminLoged","ttyl")
        setInputs(() => ({
        
         username: "",
         password:"",
       }));
           
             setTimeout(function () {
             
               history("/adminallauthorbooks");
              
               window.location.reload();
             }, 3000);
     }else{
        setsuccc()
        seterrr("username & password didn't match")
     }
         
           
          
          
          
      
  }

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    console.log(user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <>
  {AdminLogedCheck!=="ttyl" && currentUser?  <div className="LoginForm">
      <Form>
        <h3 className="headingOfforms">Admin Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            name="username"
            value={inputs.username}
            onChange={handleChange}
          />
          <Form.Text className="text-muted visiblityof">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="mb-3 marginTopFromPassword"
          controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleLogin} className="LoginButtonLoginPage">
          Login
        </Button>
      
    {errr && !succc? <p style={{color:"red"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green"}}>{succc}</p>:" " }
      </Form>
    </div>:""}
    {
        AdminLogedCheck==="ttyl" && currentUser ?  <AllAuthorBooks/>: ""
    }
    </>
   
  );
};

export default Admin;
