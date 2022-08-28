import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route, BrowserRouter ,Router} from "react-router-dom";

import AddBook from "./components/AddBook/AddBook";
import Books from "./components/Books/Books";

import BookDetails from "./components/BookDetails/BookDetails"
import Login from "./components/Admin/Login/Login";
import Signup from "./components/Admin/Signup/Signup";
import ForgetPassword from "./components/Admin/ForgetPassword/ForgetPassword";
import OTPVerification from "./components/Admin/OTPVerification/OTPVerification";
import ResetPassword from "./components/Admin/ResetPassword/ResetPassword";
import ProtectedRoute from "./components/Admin/ProtectedRoute";
import AdminProtectedRoute from "./components/Admin/AdminProtectedRoute";
import authService from "./services/auth.service";
import AllavailableBooks from "./components/AllavailableBooks/AllavailableBooks";
import Admin from "./components/Admin/Admin/Admin";
import { useEffect, useState } from "react";
import AllAuthorBooks from "./components/Admin/Admin/AllAuthorBooks";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
    const user = authService.getCurrentUser();
    // console.log(user)
    // if (user) {
    //   setCurrentUser(user);
    // }
  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user)
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <>
  
 
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<AllavailableBooks />} exact />
            <Route path="/add" element={<AddBook />} exact />
            <Route path="/login" element={<Login />} exact />
            <Route path="/signup" element={<Signup />} exact />
            <Route path="/forgetpassword" element={<ForgetPassword />} exact />
            {/* <Route path="/otpverification" element={<OTPVerification />} exact />
            <Route path="/resetpassword" element={<ResetPassword />} exact /> */}
            <Route path="/books/:id" element={<BookDetails/>} exact />
            {/* <Route path="/adminallauthorbooks" element={<AllAuthorBooks/>} exact /> */}
           {/* <ProtectedRoute path='/books' element={<Books />} auth={ currentUser}  exact /> */}
           <Route
          path="/books"
          element={
            <ProtectedRoute auth={ user}>
            < Books />
            </ProtectedRoute>
          }
        />
          <Route
          path="/admin"
          element={
            <AdminProtectedRoute auth={ user} admin={"admin"}>
            < Admin />
            </AdminProtectedRoute>
          }
        />
          <Route
          path="/adminallauthorbooks"
          element={
            <AdminProtectedRoute auth={ user} admin={"adminpage"}>
           <AllAuthorBooks/>
            </AdminProtectedRoute>
          }
        />
          


          </Routes>
       
        </main>
       
       
    
    </>
  );
}

export default App;
