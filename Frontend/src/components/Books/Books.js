import React, { useEffect, useState } from "react";
// import axios from "axios";
import Book from "../Book/Book";
import "./Books.css";
import { useNavigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
// const accesstoken=localStorage.getItem("token")
// const URL = "http://localhost:5000/books/getallbooks";
import BookService from "../../services/books.service"

// const fetchHandeler = async () => {
//   return await axios.get(URL, { headers: {
   
//     "token": `Bearer ${accesstoken}`},
//   }).then((res) => res.data);
// };

const Books = () => {
  const history = useNavigate();
  const [books, setbooks] = useState();
  
  // useEffect(() => {
  //   fetchHandeler().then((data) => {
  //     setbooks(data.books),
  //     (error) => {
  //       console.log("Private page", error.response);
  //       // Invalid token
  //       if (error.response && error.response.status === 403) {
  //         localStorage.removeItem("accesstoken")
  //        history("../login")
  //         window.location.reload();
  //       }
  //     }
     
  //   });
  // }, []);


  useEffect(() => {
    BookService.getAllBooks().then(
      (response) => {
        console.log(response.data)
        setbooks(response.data.books);
      },
      (error) => {
        console.log("Private page", error.response);
     
      }
    );
  }, []);

  console.log(books);
 
  return <div>
   {books? <div className="Books">
      {books && books.map((book, i)=>(
        <div key={i} className="eachBook">
          <Book book={book}/>
        </div>
      ))}
    </div>
   : <div className="spinnerContainer">
    <Spinner animation="grow" variant="primary" />
      <Spinner animation="grow" variant="secondary" />
      <Spinner animation="grow" variant="success" />
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
      {/* <Spinner animation="grow" variant="dark" /> */}
    </div>}
  </div>;
};

export default Books;
