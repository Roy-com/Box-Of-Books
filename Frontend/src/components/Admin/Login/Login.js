import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Login.css";
// import "../../"
import { useNavigate, } from "react-router-dom";
import Cookies from "js-cookie";
import AuthService from "../../../services/auth.service";
const URL = "http://localhost:5000/users";
const Login = () => {
  const history = useNavigate();
  const RegisterButton = (e) => {
    e.preventDefault();
    history("../signup");
  };
  const ForgetPasswordButton = (e) => {
    e.preventDefault();
    history("../forgetpassword");
  };


  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   sendRequest().then((res) => {
  //     console.log(res.data);
  //     if (res.data.status == "ok") {
  //       alert("login Suceefully");

  //       history("../Books");
  //     } else {
  //       alert(res.data.error);
  //       // localStorage.removeItem("accesstoken");
  //     }
  //   });

  //   // history("../Books")
  // };

  // const sendRequest = async () => {
  //   return await axios
  //     .post("http://localhost:5000/users/login", {
  //       email: String(inputs.email),
  //       password: String(inputs.password),
  //     })
  //     .then((res) => {
  //       console.log(res);
  //       const accesstoken = res.data.accesstoken;
  //       const refreshtoken = res.data.refreshtoken;
  //       Cookies.set("accesstoken", accesstoken);
  //       Cookies.set("refreshtoken", refreshtoken);
  //       //  localStorage.set("accesstoken", accesstoken);
  //       //  localStorage.set("refreshtoken", refreshtoken);
  //       return res;
  //     });
  //   // console.log(res.data)
  // };
  const getAUthorName = async (id) => {
    console.log(id)
   await axios.get(`${URL}/${id}`).then((res) => 
    {
      
      localStorage.setItem("authorName",res.data.user.name)
    }
    );
  };

 
    const [errr,seterrr]= useState();
    const[succc,setsuccc]=useState();
  const handleLogin = async(e) => {
      e.preventDefault();
      try {
        await AuthService.login(String(inputs.email), String(inputs.password)).then(
          (res) => {
            console.log(res)
            if (res.data.status == "ok") {
              // localStorage.setItem("authorname",)
              
               getAUthorName(res.data.user._id);
               seterrr()
               setsuccc(res.data.message)
               console.log(res.data.message)
              
               setInputs(() => ({
               
                email: "",
                password:"",
              }));
                    // alert("Login Suceefully");
                    setTimeout(function () {
                    
                      history("/Books");
                      // history("/Books")
                      window.location.reload();
                    }, 3000);
                    // history("../Books");
                   
                  } else {
                    seterrr(res.data.error)
                    // alert(res.data.error);
                   
                  }
          
          
          }
        );
      } catch (err) {
        seterrr(err)
        console.log(err);
      }
  }

  return (
    <div className="LoginForm">
      <Form>
        <h3 className="headingOfforms">Author Login</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={inputs.email}
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
        <Form.Text
          className="text-muted forgetPasswordButton"
          onClick={ForgetPasswordButton}
        >
          Forget Password ?
        </Form.Text>
        <Form.Group
          className="mb-3 NotaMemberDiv"
          controlId="formBasicPassword"
        >
          <Form.Text className="text-muted notaMembertext">
            Not a member ?{" "}
            <Form.Text className="text registerButton" onClick={RegisterButton}>
              Register
            </Form.Text>
          </Form.Text>
        </Form.Group>
    {errr && !succc? <p style={{color:"red"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green"}}>{succc}</p>:" " }
      </Form>
    </div>
  );
};

export default Login;
