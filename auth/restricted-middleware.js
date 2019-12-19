const jwt = require("jsonwebtoken"); // installed this

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret =
      process.env.JWT_SECRET || "ask the elephant. they never forget..";

    jwt.verify(authorization, secret, function(err, decodedToken) {
      console.log({ err, decodedToken });
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else {
        req.token = decodedToken;

        next();
      }
    });
  } else {
    res.status(400).json({ message: "Please login and try again" });
  }
};
