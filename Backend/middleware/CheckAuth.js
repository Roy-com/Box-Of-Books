const jwt = require("jsonwebtoken");


module.exports = async (req, res, next) => {
  const token = req.header("token");

  // const { authorization } = req.headers;
  console.log(token);
  // console.log(authorization);
  // CHECK IF WE EVEN HAVE A TOKEN
  if (!token) {
    res.status(401).json({
      errors: [
        {
          msg: "No token found",
        },
      ],
    });
  }

  try {
    const token2=token.split(" ")[1];


    jwt.verify(token2, process.env.JWT_SECRET_accessToken, async (err, user) => {
        if (user) {
            req.user = user.email;
            next();
        } else if (err.message === "jwt expired") {
            return res.json({
                success: false,
                message: "Access token expired"
            });
        } else {
            console.log(err);
            return res
                .status(403)
                .json({ err, message: "User not authenticated" });
        }
    });

  } catch (error) {
    res.status(400).json({
      errors: [
        {
          msg: "Invalid Token",
        },
      ],
    });
  }
};