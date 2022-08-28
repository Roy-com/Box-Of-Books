import axios from "axios";
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./BookDetails.css"
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

const BookDetails = () => {
  const id = useParams().id;
  const history =useNavigate();
  const [inputs,setInputs] = useState({})
  const [checked, setChecked]=useState(false)
  useEffect(() => {
    const fetchHandeler = async () => {
      await axios
        .get(`http://localhost:5000/books/${id}`)
        .then((res) => res.data).then(data=>setInputs(data.book));
    };
    fetchHandeler()
  }, []);
  const handleSubmit=(e)=>{
    e.preventDefault();
    sendRequest().then(()=>history('../Books'))

  }
  const handleChange=(e)=>{
    setInputs((prevState)=>({
     ...prevState,
     [e.target.name]:e.target.value
    }))
   }
  const sendRequest =async()=>{
    await axios.put(`http://localhost:5000/books/${id}`,{
      name:String(inputs.name),
      author:String(inputs.author),
      description:String(inputs.description),
      price:String(inputs.price),
      imageurl:String(inputs.imageurl),
      available:Boolean(checked)
    }).then(res=> res.data);
  }
  return <div>
     {inputs &&   <div className="LoginForm" style={{height:"100vh", padding:"0px"}}>
     



     <Form className="addBookFormcontainer">
     <h3 className="headingOfforms">Update this Book</h3>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Book's Name</Form.Label>
       <Form.Control
         type="text"
        
         name="name"
         value={inputs.name}
         onChange={handleChange}
       />
     
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Author's Name</Form.Label>
       <Form.Control
         type="text"
       
         name="author"
         value={inputs.author}
         onChange={handleChange}
       />
     
     </Form.Group>
    
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Description of the book</Form.Label>
       <Form.Control
         type="text"
        
         name="description"
         value={inputs.description}
         onChange={handleChange}
       />
     
     </Form.Group>
  
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Price of the book</Form.Label>
       <Form.Control
         type="text"
        
         name="price"
         value={inputs.price}
         onChange={handleChange}
       />
     
     </Form.Group>
     <Form.Group className="mb-3" controlId="formBasicEmail">
       <Form.Label>Image of the book</Form.Label>
       <Form.Control
         type="text"
         
         name="imageurl"
         value={inputs.imageurl}
         onChange={handleChange}
       />
     
     </Form.Group>
   
       <Form.Group className="Availablecheck">
      <Form.Check 
     type="switch"
     id="custom-switch"
     label="Available"
     onChange={() => setChecked(!checked)}
     checked={checked}
   />
      </Form.Group>
     <Button variant="primary" type="submit"   onClick={handleSubmit} className="AddButtonLoginPage" >
   Update
     </Button>
    
   
 {/* {errr && !succc? <p style={{color:"red"}}>{errr}</p>:" " }
 {succc && !errr? <p style={{color:"green"}}>{succc}</p>:" " } */}
   </Form>
   </div>}
  </div>;
};

export default BookDetails;
