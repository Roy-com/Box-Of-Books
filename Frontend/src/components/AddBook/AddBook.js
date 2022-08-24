import axios from "axios";
import React, { useState } from "react";
import "./AddBook.css";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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
    <div>
      <div className="AddBookForm">
        <h3 className="addBookHeading"> ADD BOOK</h3>

        <div className="mb-3">
          <label>Name</label>
          <input
            type="name"
            name="name"
            className="form-control"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={inputs.author}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={inputs.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={inputs.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Image Url</label>
          <input
            type="text"
            name="imageurl"
            className="form-control"
            value={inputs.imageurl}
            onChange={handleChange}
          />
        </div>

        <div className="checkboxOfAddBookdiv">
          <div className="checkboxOfAddBook">
            <input
              type="checkbox"
              id="availableBook"
              name="availableBook"
              onChange={() => setChecked(!checked)}
              checked={checked}
            />
            <label for="availableBook"> Available</label>
          </div>
        </div>
        <div className="mb-6 submitButoonOfAddBook">
          <button
            type="submit"
            className="btn btn-primary "
            onClick={handleSubmit}
          >
            Add This Book
          </button>
        </div>
      </div>
     
    </div>
  );
}

export default AddBook;
