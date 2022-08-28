import axios from "axios";
import React, { useState } from "react";
import "./AddBook.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';

function AddBook() {
  const history = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    author: "",
    description: "",
    price: "",
    imageurl: "",
  });
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("../Books"));
  };
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/books/addBook", {
        name: String(inputs.name),
        author: String(inputs.author),
        description: String(inputs.description),
        price: String(inputs.price),
        imageurl: String(inputs.imageurl),
        available: Boolean(checked),
      })
      .then((res) => res.data);
  };
  return (
    <div className="LoginForm" style={{height:"100vh", padding:"0px"}}>
     



        <Form className="addBookFormcontainer">
        <h3 className="headingOfforms">Add Book</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Book's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of the book"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Author's Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name of the author"
            name="author"
            value={inputs.author}
            onChange={handleChange}
          />
        
        </Form.Group>
       
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Description of the book</Form.Label>
          <Form.Control
            type="text"
            placeholder="describe about book"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        
        </Form.Group>
     
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Price of the book</Form.Label>
          <Form.Control
            type="text"
            placeholder="price in rupees"
            name="price"
            value={inputs.price}
            onChange={handleChange}
          />
        
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Image of the book</Form.Label>
          <Form.Control
            type="text"
            placeholder="enter url of image"
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
        Add this Book
        </Button>
       
      
    {/* {errr && !succc? <p style={{color:"red"}}>{errr}</p>:" " }
    {succc && !errr? <p style={{color:"green"}}>{succc}</p>:" " } */}
      </Form>
      </div>
     
  
  );
}

export default AddBook;
