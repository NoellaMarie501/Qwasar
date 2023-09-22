// // auth.js
const { secret, HTTP_STATUS } = require("../../constants");
const { responseHandler } = require("../utils/responseHandler");
const { ROLES } = require("./roles_permissions");
const jwt = require("jsonwebtoken");

// Middleware function to verify JWT token and extract user's ID and role
const verifyToken = (req, res, next) => {
  //console.log("req",req)
  let authorization = req.headers.authorization; //.token;
  console.log("authorization",authorization)
  //console.log("authorization",authorization);
  const token = authorization.split(" ")[1];
  if (!token) {
    // console.log("Access token none")
    return responseHandler({
      res,
      status: HTTP_STATUS.UNAUTHORIZED,
      message: "No token provided! User Not authenticated",
    });
  }
  //console.log("token",token);
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return responseHandler({
        res,
        status: HTTP_STATUS.UNAUTHORIZED,
        message: "Unauthorized!",
      });
    }
    // console.log("decoded",decoded.id);
    req.UserId = decoded.id;
    req.userRole = decoded.role;
    //console.log("req.UserId req.userRole", req.UserId, req.userRole)
    next();
    return { id: decoded.id, role: decoded.role };
  });
};

//   // Middleware function to check user's role against required role
const checkRole = (req, res, next) => {
  const role = verifyToken(req, res, next).role;
  if (role === ROLES.ADMIN) {
    next();
  } else {
    return res.status(401).send({ message: "Unauthorized!" });
  }
};

//   // Example route that requires "admin" role to delete a user
//   app.delete('/users/:id', verifyToken, checkRole('admin'), async (req, res) => {
//     try {
//       const user = await User.findByPk(req.params.id);
//       if (!user) {
//         return res.status(404).send({ message: "User not found!" });
//       }
//       await user.destroy();
//       res.send({ message: "User deleted successfully!" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).send({ message: "Internal server error!" });
//     }
//   });

module.exports = { verifyToken, checkRole };
