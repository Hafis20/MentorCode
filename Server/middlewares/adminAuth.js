const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Admin-Bearer")) {
    const token = authHeader.split(" ")[1]; // Getting the token from header

    try {
      const decoded = jwt.verify(   // Verifying the token
        token,
        process.env.JWT_ACCESS_TOKEN,
        (err, admin) => {
          if (err) {
            console.log(err.message);
            return res.status(401).json({ message: "Unauthorized" });
          } else {
            req.adminId = admin.userId;
            next();
          }
        }
      );
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminAuth;
