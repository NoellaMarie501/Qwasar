// // auth.js

const {ROLES} = require("./roles_permissions");

// // const isAdmin = (req, res, next) => {
// //     console.log(req)
// //   if (req.user.role === ROLES.ADMIN) {
// //     console.log(req.user.role);
// //     next();
// //   } else {
// //     res.status(403).send("Unauthorized");
// //   }
// // };

// // const hasPermission = (permission) => (req, res, next) => {
// //   if (req.user.role === ROLES.ADMIN) {
// //     next();
// //   } else if (req.user.role === ROLES.USER && req.user.permissions.includes(permission)) {
// //     next();
// //   } else {
// //     res.status(403).send("Unauthorized");
// //   }
// // };

// module.exports = {
//   isAdmin,
//   hasPermission,
// };

// Define roles and their corresponding permissions

  
  // Middleware function to verify JWT token and extract user's ID and role
  const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };
  
//   // Middleware function to check user's role against required role
//   const checkRole = (role) => {
//     return (req, res, next) => {
//       if (!roles[role].includes(req.userRole)) {
//         return res.status(403).send({ message: "Forbidden!" });
//       }
//       next();
//     };
//   };
  
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
  

