import axios from "axios";
import React, { useEffect ,useState} from "react";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import "./BookDetails.css"

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
     {inputs && <div className="AddBookForm">
        <h3 className="addBookHeading"> Update BOOK</h3>
       
        <div className="mb-3">
          <label>Name</label>
          <input type="name" name="name" className="form-control" value={inputs.name} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Author</label>
          <input type="text" name="author" className="form-control" value={inputs.author} onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input type="text" name="description" className="form-control" value={inputs.description}  onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label>Price</label>
          <input type="number" name="price" className="form-control" value={inputs.price} onChange={handleChange}/>
        </div>

        <div className="mb-3">
          <label>Image Url</label>
          <input type="text" name="imageurl" className="form-control" value={inputs.imageurl} onChange={handleChange}/>
        </div>
       
        <div className="checkboxOfAddBookdiv">
        <div className="checkboxOfAddBook">
          <input
            type="checkbox"
            id="availableBook"
            name="availableBook"
            onChange={()=>setChecked(!checked)}
            checked={checked}
           
          />
          <label for="availableBook"> Available</label>
        </div>
        </div>
        <div className="mb-6 submitButoonOfAddBook">
          <button type="submit" className="btn btn-primary " onClick={handleSubmit}>
           Update This Book
          </button>
        </div>
        
      </div>}
  </div>;
};

export default BookDetails;
