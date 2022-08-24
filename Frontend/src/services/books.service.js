import api from "./api";

const getAllBooks = () => {
  return api.get("/books/getallbooks");
};

const BookService = {
 
  getAllBooks,
};

export default BookService;