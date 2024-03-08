const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET;

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Kimlik doğrulama başarısız. Token eksik.",
      succces: false,
    });
  }

  const [, token] = authHeader.split(" ");

  const generatedToken = generateToken(token, secretKey);

  if (!token) {
    return res.status(401).json({
      message: "Kimlik doğrulama başarısız. Token eksik.",
      succces: false,
    });
  }

  const decodedToken = verifyToken(generatedToken, secretKey);

  if (decodedToken) {
    req.user = decodedToken.user;
    next();
  } else {
    return res.status(401).json({
      message: "Kimlik doğrulama başarısız. Geçersiz token.",
      succces: false,
    });
  }
}

function verifyToken(token, secretKey) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
}

function generateToken(payload, secretKey) {
  return jwt.sign(payload, secretKey);
}

module.exports = authMiddleware;
