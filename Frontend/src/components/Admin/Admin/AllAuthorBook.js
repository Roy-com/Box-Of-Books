import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";


const AllAuthorBook = (props) => {
  const [authorname, setauthorname] = useState(false);
  const history = useNavigate();
  const { _id, name, author, description, price, imageurl } = props.book;
  const updateButtonClicked = (e) => {
    e.preventDefault();
    history(`/books/${_id}`);
  };
  const DeleteButtonClicked =(e)=>{
    e.preventDefault();
    sendRequest();
    window.location.reload();
  }
  const sendRequest =async()=>{
    await axios.delete(`http://localhost:5000/books/deleteBook/${_id}`,{
     
    }).then(res=> res.data);
  }
  const authorName=localStorage.getItem("authorName");
  
  // const fetchHandeler = async () => {
  //   return await axios.get(`${URL}/${id}`).then((res) => res);
  // };
  // useEffect(() => {
  //   fetchHandeler().then((data) => {
  //     setauthorname(data.author),
  //     (error) => {
  //       console.log("Private page", error.response);
       
       
  //     }
     
  //   });
  // }, []);
  return (
    <div className="singleBook">
      <div className="imagediv">
        <img src={imageurl} alt={name} />
      </div>
      <article> By {author}</article>
      <h3>{name}</h3>
      <p>{description}</p>
      <h2>Rs {price}</h2>
      <div className="button">
     {(<> <button onClick={updateButtonClicked} className="LoginButtonLoginPage">update</button>
      <button onClick={DeleteButtonClicked} className="LoginButtonLoginPage">delete</button></>)}
      </div>
    </div>
  );
};

export default AllAuthorBook;
