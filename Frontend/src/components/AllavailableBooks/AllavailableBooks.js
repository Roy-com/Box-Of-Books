import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import AllavailableBook from '../AllavailableBook/AllavailableBook';
import "./AllavailableBooks.css"
const URL = "http://localhost:5000/books/getallbooks";
const fetchHandeler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const AllavailableBooks = () => {
    const [books, setbooks] = useState();
    
    const[arrayBook, setarrayBook]= useState([{

    }])


        useEffect(() => {
          Array.prototype.push.apply(arrayBook,[{name : "childs", value: '5'}]); 
          console.log(arrayBook);
    fetchHandeler().then((data) => {
      setbooks(data.books),
      (error) => {
        console.log("Private page", error.response);
      
      }
     
    });
  }, []);
  return <div>
  {books? <div className="Books">
     {books && books.map((book, i)=>(
       <div key={i} className="eachBook">
         <AllavailableBook book={book}/>
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
}

export default AllavailableBooks