const getLocalRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.refreshToken;
  };
  
  const getLocalAccessToken = () => {
    const user = JSON.parse(localStorage.getItem("token"));
    return user?.accessToken;
  };
  
  const updateNewAccessToken = (token) => {
    let user = JSON.parse(localStorage.getItem("token"));
    user.accessToken = token;
    localStorage.setItem("token", JSON.stringify(user));
  };
  
  const getUser = () => {
    return JSON.parse(localStorage.getItem("token"));
  };
  
  const setUser = (token) => {
      console.log(token);
    localStorage.setItem("token", JSON.stringify(token));
  };
  
  const removeUser = () => {
    console.log("remove")
    localStorage.removeItem("token");
  };
  
  const TokenService = {
    getLocalRefreshToken,
    getLocalAccessToken,
    updateNewAccessToken,
    getUser,
    setUser,
    removeUser,
  };
  
  export default TokenService;