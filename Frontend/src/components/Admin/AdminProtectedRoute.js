import React from "react";
import { Route, Navigate ,Outlet} from "react-router-dom";

// const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={(props) => {
//         if (auth)
//        {  return <Component {...props} />;}
//         else{
//           return (
//             <Navigate to={{ path: "/", state: { from: props.location } }} />
//           );
//         }
//       }}
//     />
//   );
// };

const AdminProtectedRoute = ({ auth,admin, children }) => {
    const adminauth= localStorage.getItem("AdminLoged")
    console.log(auth)
    if(admin==="admin")
    {
        if(auth)
        {
            return children
        }
    }
    if(admin==="adminpage")
  {  
    if (auth && adminauth==="ttyl") {
        return children;
     
    }}
  
    return <Navigate to="/login" replace />;
  };
  // const ProtectedRoute = ({ auth}) => {
  //   console.log(auth)
  //   if (auth) {
  //       return <Outlet/>;
     
  //   }
  
  //   return <Navigate to="/login" replace />;
  // };

export default AdminProtectedRoute;