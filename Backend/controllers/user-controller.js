const UserCollection = require("../model/UserDetails");
const UserDetails = UserCollection.UserDetails;
const Otp = require("../model/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validate, validateLogin  } = require("../utils/Validation");
const nodemailer = require("nodemailer");
// const crypto = require("crypto");
// const generator = require('generate-password');
const HOST = process.env.SMTP_HOST;
const PORT = process.env.SMTP_PORT;
const USER = process.env.SMTP_USER;
const PASS = process.env.SMTP_PASS;
let refreshTokens = [];

// Api Request

// 1. Login Code
const Login = async (req, res, next) => {
  const { email, password } = req.body;
   // validate the user input value
   const { error } = validateLogin(req.body);
   if (error) {
     return res.json({ status: "error", error: error.details[0].message });
   }

  const user = await UserDetails.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
 

  if (await bcrypt.compare(password, user.password)) {
    const accesstoken = await jwt.sign({ email }, process.env.JWT_SECRET_accessToken, {
      expiresIn: '20s',
    });
    const refreshtoken = await jwt.sign({ email }, process.env.JWT_SECRET_refreshToken, {
        expiresIn: "7d",
      });
      refreshTokens.push(refreshtoken)
    if (res.status(201)) {
      // return res.json({ status: "ok", data: token });
      // Send JSON WEB TOKEN

      return res.json({ status: "ok", accesstoken: accesstoken , refreshtoken:refreshtoken ,user:user,message:"Logged IN"});
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
};

// 2. Creates a new accessToken using the given refreshToken;
// const Refreshtoken= async(req, res, next) => {
//     const refreshToken = req.body.token;
//     if (!refreshToken || !refreshTokens.includes(refreshToken)) {
//         return res.json({status:"error", message: "Refresh token not found, login again" });
//     }

//     // If the refresh token is valid, create a new accessToken and return it.
//    await jwt.verify(refreshToken,  process.env.JWT_SECRET_refreshToken, (err, email) => {
//         if (!err) {
//             const accessToken = jwt.sign({email}, process.env.JWT_SECRET_accessToken, {
//                 expiresIn: "20s"
//             });
//             return res.json({ success: true, accessToken });
//         } else {
//             return res.json({
//                 success: false,
//                 message: "Invalid refresh token"
//             });
//         }
//     });
// };

// Create new access token from refresh token
const Refreshtoken= async(req, res, next) => {
    const refreshToken = req.header("token");
  
    // If token is not provided, send error message
    if (!refreshToken) {
      res.status(401).json({
        errors: [
          {
            msg: "Token not found",
          },
        ],
      });
    }
  
    // If token does not exist, send error message
    if (!refreshTokens.includes(refreshToken)) {
      res.status(403).json({
        errors: [
          {
            msg: "Invalid refresh token",
          },
        ],
      });
    }
  
    try {
      const user = await JWT.verify(
        refreshToken,
        process.env.JWT_SECRET_refreshToken
      );
      // user = { email: 'jame@gmail.com', iat: 1633586290, exp: 1633586350 }
      const { email } = user;
      const accessToken = await JWT.sign(
        { email },
        process.env.JWT_SECRET_accessToken,
        { expiresIn: "1m" }
      );
      res.json({ accessToken });
    } catch (error) {
      res.status(403).json({
        errors: [
          {
            msg: "Invalid token",
          },
        ],
      });
    }
  };


// 3. Signup Code
const Signup = async (req, res, next) => {
  const { name, email, password, repassword } = req.body;

  // password hashing
  const encryptedPassword = await bcrypt.hash(password, 10);

  // validate the user input value
  const { error } = validate(req.body);
  if (error) {
    return res.json({ status: "error", error: error.details[0].message });
  }
  try {
    const oldUser = await UserDetails.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User already Exists" });
    }

    if (password != repassword) {
      return res.json({ error: "Password don't match" });
    }
 
    await UserDetails.create({
      name,
      email,
      password: encryptedPassword,
    });
    return res.json({ status: "ok",message: "Registered Successfully"  });
  } catch (error) {
    console.log(error);
    res.send({ status: "error", error: error });
  }
};

// 4. EmailSend Code
const EmailSend = async (req, res, next) => {
  const { email } = req.body;

//   generate random password 
const passwords = Math.floor((Math.random()*10000)+1);
console.log(passwords)

  // NODEMAILER TRANSPORT FOR SENDING POST NOTIFICATION VIA EMAIL
  const transporter = nodemailer.createTransport({
    host: HOST,
    port: PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: USER,
      pass: PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

 
    UserDetails.findOne({ email: email }).then((user) => {
      if (!user) {
        return res.send({ status: "error", error: "user doesn't exist in our database"});
      }
     
     const otpData= new Otp({
      emai: email,
      code:passwords,
      expireIn: new Date().getTime()+300*1000,
     })
     otpData
     .save()
     .then((result) => {
       console.log(result);
       transporter.sendMail({


         to: user.email,
         from: USER,
         subject: "Your One Time OTP",
         html: `
                 <p>You requested for password reset from <b>Book Store</b></p
                 <p>Enter <b>${passwords}</b> to verify your email adress and complete registration</p>>
               `,
       });
       res.send({ status: "ok", message: "please check your email for otp" });
     })
     .catch((err) => console.log(err));
    
  })
}

const OtpVerification= async(req,res)=>{
  try {
    const { otp} =req.body;
    console.log(otp)
    const data= await Otp.find({code:otp});
 console.log(data)

    if(data){
      if(data.length===0){
        console.log("y")
        return  res.send({ status: "error", error: "otp didn't match" });
      }
      console.log("x")
      const currentTime =new Date().getTime();
      const diffe= data[0].expireIn - currentTime;
   
    console.log(diffe)
      if(diffe<0)
      {
        return  res.send({ status: "error", error: "otp expired" });
    }else {
        
      return  res.send({ status: "ok", message: "otp Verified" });;
    }
    }
    
   

  }catch (error) {
    // const { otp} =req.body;
    // const data= await Otp.find({code:otp});
    // console.log("error",data)
    res.send({ status: "error", error: error });
  }
}


// 5. ResetPasswor code 
const ResetPassword = async(req, res, next)=> {

  try {
    const {email} =req.body.email;
  
        
        const newPassword = req.body.password;
        const confirmPassword = req.body.repassword;
        console.log(email)
        console.log(newPassword)
        console.log(confirmPassword)
        if (newPassword != confirmPassword) {
          return res.send({ status: "error", error: "password didn't match" });;
        }
        const user = await UserDetails.findOne({email:email});
        console.log("x", user);
      
      
        bcrypt.hash(newPassword, 10).then(hashedpassword => {
          user.password = hashedpassword;
        
          user.save().then((saveduser) => {
            console.log("d");
            res.send({ status: "ok", message: "password updated sucess" });
          });
        });
    }catch (error) {
      res.send({ status: "error", error: error });
  }

}
// 5. Get ALL Users code 
const GetAllUsers = async (req, res, next) => {

    let users;
  try {
    users = await UserDetails.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    return res.status(404).json({ message: "No Users Found" });
  }
  return res.status(200).json({ users });

}
// 6. GetBYID 

const GetByID = async (req, res, next) => {
  let id = req.params.id;
  let user;
  try {
    user = await UserDetails.findById(id);
  } catch (err) {
    console.log(err);
  }
  if (!user) {
    return res.status(404).json({ message: "No user Found" });
  }
  return res.status(200).json({ user });
};

const Logout= async(req, res) => {
    const refreshToken = req.header("token");
  
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.sendStatus(204);
}


exports.Login = Login;
exports.Signup = Signup;
exports.EmailSend = EmailSend;
exports.OtpVerification=OtpVerification;
exports.ResetPassword = ResetPassword;
exports.GetAllUsers=GetAllUsers;
exports.GetByID=GetByID;
exports.Logout=Logout;
exports.Refreshtoken=Refreshtoken;