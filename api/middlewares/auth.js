const jwt = require("jsonwebtoken");

verifytoken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "Vous devez vous connecter!" });
  }

  try {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        req.role = "";
        return res.status(401).send({ message: "Vous devez vous connecter!" });
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
  } catch (error) {
    req.role = "";
    return res.status(500).json(error);
  }
};
