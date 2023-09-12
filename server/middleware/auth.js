import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET); // Fix the jwt.verify call

    if (!verified) {
      return res.status(403).send("Access Denied"); // Return a 403 status if verification fails
    }

    req.user = verified;
    next();
  } catch (err) {
    console.error('Error in verifyToken middleware:', err); // Log the error for debugging
    res.status(500).json({ error: err.message }); // Return a 500 status with error message
  }
};
