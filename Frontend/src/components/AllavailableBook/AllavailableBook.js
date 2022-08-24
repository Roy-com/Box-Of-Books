import React from 'react'
import "./AllavailableBook.css"

const AllavailableBook = (props) => {
    const { _id, name, author, description, price, imageurl } = props.book;
    return (
        <div className="singleBook">
          <div className="imagediv">
            <img src={imageurl} alt={name} />
          </div>
          <article> By {author}</article>
          <h3>{name}</h3>
          <p>{description}</p>
          <h2>Rs {price}</h2>
         
        </div>
      );
    };

export default AllavailableBook