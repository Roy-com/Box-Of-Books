import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import ".././App.css";
import bookstorelog from "./bookl.png";
import authService from "../services/auth.service";
const AdminLogedCheck = localStorage.getItem("AdminLoged");
function Navbar() {
  //   const [err, setErr] = useState("");
  const history = useNavigate();

  //   const refresh = refreshtoken => {
  //     console.log("Refreshing token!");

  //     return new Promise((resolve, reject) => {
  //         axios
  //             .post("http://localhost:5000/users/refreshtoken", { token: refreshtoken })
  //             .then(data => {
  //                 if (data.data.success === false) {
  //                     setErr("Login again");
  //                     // set message and return.
  //                     resolve(false);
  //                 } else {
  //                     const { accesstoken } = data.data;
  //                     Cookies.set("accesstoken", accesstoken);
  //                     resolve(accesstoken);
  //                 }
  //             });
  //     });
  // };
  //   const requestLogin = async (accesstoken, refreshtoken) => {
  //     console.log(accesstoken, refreshtoken);
  //     return new Promise((resolve, reject) => {
  //         axios
  //             .post(
  //                 "http://localhost:5000/books/protected",
  //                 {},
  //                 { headers: { token: `Bearer ${accesstoken}` } }
  //             )
  //             .then(async data => {
  //                 if (data.data.success === false) {
  //                     if (data.data.message === "User not authenticated") {
  //                         setErr("Login again");
  //                         // set err message to login again.
  //                     } else if (
  //                         data.data.message === "Access token expired"
  //                     ) {
  //                         const accesstoken = await refresh(refreshtoken);
  //                         return await requestLogin(
  //                             accesstoken,
  //                             refreshtoken
  //                         );
  //                     }

  //                     resolve(false);
  //                 } else {
  //                     // protected route has been accessed, response can be used.
  //                     setErr("Protected route accessed!");
  //                     resolve(true);
  //                     history("./Books")
  //                 }
  //             });
  //     });
  // };

  // const hasAccess = async (accesstoken, refreshtoken) => {
  //   if (!refreshtoken) return null;

  //   if (accesstoken === undefined) {
  //       // generate new accessToken
  //       accesstoken = await refresh(refreshtoken);
  //       return accesstoken;
  //   }

  //   return accesstoken;
  // };
  //   const protectedRoute=async(e)=>{
  //     e.preventDefault()
  //     let accesstoken = Cookies.get("accesstoken");
  //     let refreshtoken = Cookies.get("refreshtoken");

  //     accesstoken = await hasAccess(accesstoken, refreshtoken);
  //     console.log(accesstoken, refreshtoken);
  //     if (!accesstoken) {
  //         // Set message saying login again.
  //         setErr("login again")
  //         history("./Login")
  //         console.log(accesstoken, refreshtoken);
  //     } else {
  //       console.log(accesstoken, refreshtoken);
  //         await requestLogin(accesstoken, refreshtoken);
  //         console.log(accesstoken, refreshtoken);
  //     }
  //   }
  // const [currentUser, setCurrentUser] = useState(undefined);

  // useEffect(() => {
  //   const user = Cookies.get("accesstoken");

  //   if (user) {
  //     setCurrentUser(user);
  //   }
  // }, []);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user);
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const Logout = (e) => {
    window.location.reload();
    AuthService.logout();
    history("/");
  };
  const AdminLogout = (e) => {
   
    AuthService.logout();
    localStorage.removeItem("AdminLoged");
    history("/login");
    window.location.reload();
  
  };
  // const BooksButtonClicked=(e)=>{
  //   e.preventDefault();
  //   history("./Books")

  // }
  return (
    <>
      <nav className="navbar navbar-expand-lg navsd">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={{ color: "hwb(120deg 60% 32%)" }}
          >
            {/* Book Store */}
            <img
              src={bookstorelog}
              className="bookstorelogo"
              style={{
                width: "150px",
                height: "68px",
                objectFit: "cover",
                borderRight: "1px solid",
                padding: "8px",
              }}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {currentUser ? (
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/add"
                    activeStyle={{ color: "#022174" }}
                  >
                    Add Book
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className="nav-link "
                    aria-current="page"
                    to="/"
                    activeStyle={{ color: "#022174" }}
                  >
                    Books
                  </Link>
                </li>
              )}
              {currentUser && AdminLogedCheck !== "ttyl" ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/books"
                    style={{ cursor: "pointer" }}
                    activeStyle={{ color: "#022174" }}
                  >
                    Books
                  </Link>
                </li>
              ) : (
                ""
              )}
              {currentUser && AdminLogedCheck === "ttyl" ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/adminallauthorbooks"
                    style={{ cursor: "pointer" }}
                    activeStyle={{ color: "#022174" }}
                  >
                    Books
                  </Link>
                </li>
              ) : (
                ""
              )}
              {currentUser && AdminLogedCheck !== "ttyl" ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={Logout}
                    style={{ dispaly: "inline-block" }}
                    activeStyle={{ color: "#022174" }}
                  >
                    Logout
                  </Link>
                </li>
              ) : ("")}
                 {currentUser && AdminLogedCheck === "ttyl" ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/"
                    onClick={AdminLogout}
                    style={{ dispaly: "inline-block" }}
                    activeStyle={{ color: "#022174" }}
                  >
                    Logout
                  </Link>
                </li>
              ) : ("")}
                
        {  !currentUser &&    (<li className="nav-item" style={{ dispaly: "inline-block" }}>
                    <Link
                      className="nav-link"
                      to="/login"
                      style={{ dispaly: "inline-block" }}
                      activeStyle={{ color: "#022174" }}
                    >
                      Login
                    </Link>
                  </li>)}
                
          
          
            </ul>
            {currentUser ? (
              <li
                className="nav-item adminButton"
                style={{ textDecoration: "none" }}
              >
                <Link
                  className="nav-link"
                  to="/admin"
                  style={{ cursor: "pointer" }}
                  activeStyle={{ color: "#022174" }}
                >
                  Admin
                </Link>
              </li>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
