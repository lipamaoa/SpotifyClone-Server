const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token);
  
  if (!token) {
    return res.status(400).send({
      message: "Access denied, no token provided"
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, validToken) => {
    if (err) {
      return res.status(400).send({
        message: "Access denied, invalid token"
      });
    } else {
      if (!validToken.isAdmin) {
        return res.status(403).send({
          message: "Access denied, you don't have access to this resource!"
        });
      }
      
      // If the token is valid and the user is an admin, you can attach the user to req.user
      req.user = validToken.user; // Assuming you have a "user" property in your token
      
      next(); // Continue to the next middleware or route handler
    }
  });
};

module.exports = isAdmin;
