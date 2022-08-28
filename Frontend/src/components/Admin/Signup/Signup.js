import axios from "axios";
import React ,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "./Signup.css"
import AuthService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const history = useNavigate();
    const LoginButton=(e)=>{
        e.preventDefault();
        history("../login")
    }


    const [inputs, setInputs] = useState({
      name: "",
      email: "",
     password: "",
     repassword: "",
   
    });
   
  
    const handleChange = (e) => {
      setInputs((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
    // const handleSignup = (e) => {
    //   e.preventDefault();
    //   sendRequest().then((res) => 
      
    //  { 
    //   if(res.data.status=="ok")
    //   {
    //     alert('login Suceefully')
    //     history("../Login")
    //   }
    //   else{
    //     alert(res.data.error)
    //   }
     
    // });
    // };
    // const sendRequest = async () => {
    //  return await axios
    //     .post("http://localhost:5000/users/signup", {
    //       name: String(inputs.name),
    //       email: String(inputs.email),
    //      password: String(inputs.password),
    //       repassword: String(inputs.repassword),
         
    //     })
    //     .then((res) => {
    //      return res
    //      });
    //     // console.log(res.data)
    // };
    const [errr,seterrr]= useState();
    const[succc,setsuccc]=useState();
    const handleSignup = async(e) => {
        e.preventDefault();
        try {
          await AuthService.signup(String(inputs.name), String(inputs.email), String(inputs.password),String(inputs.repassword)).then(
            (res) => {
              // check for token and user already exists with 200
              //   console.log("Sign up successfully", response);
                //  { 
                  console.log(res)
      if(res.data.status=="ok")
      {
      seterrr()
        setsuccc(res.data.message)
        setInputs(() => ({
          name:"",     
          email: "",
          password:"",
          repassword:"",
        }));
        setTimeout(function () {
                    
          history("../Login")
          window.location.reload();
        }, 4000);
       
      }
      else{
        setsuccc()
        seterrr(res.data.error)
        // alert(res.data.error)
      }
            
            }
          
          );
        } catch (err) {
          console.log(err);
        }
    }

  return (
    <div className='SignupForm'>
        <Form style={{width:"330px"}}>
        <h3 className="headingOfforms">Author Signup</h3>
      <Form.Group className="mb-3" >
        <Form.Label>Author Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your name" name='name'  value={inputs.name}
            onChange={handleChange}/>
        
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'  value={inputs.email}
            onChange={handleChange}/>
        <Form.Text className="text-muted notaMembertext ">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name='password'  value={inputs.password}
            onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3 " controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type="password" placeholder="Confirm Password" name='repassword'  value={inputs.repassword}
            onChange={handleChange}/>
      </Form.Group>
      <Button variant="primary" type="submit"  onClick={handleSignup} className="LoginButtonLoginPage">
        Signup
      </Button>
      <Form.Group className="mb-3 NotaMemberDiv" controlId="formBasicPassword1">
      <Form.Text className="text-muted notaMembertext">
          Already have an account ?  <Form.Text className="text LoginButton" onClick={LoginButton}>
         Login
        </Form.Text>
        </Form.Text>
        </Form.Group>
        {errr && !succc? <p style={{color:"red"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green"}}>{succc}</p>:" " }
    </Form>
    </div>
  )
}

export default Signup