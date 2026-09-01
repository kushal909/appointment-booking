import jwt from "jsonwebtoken";

// const protect = async (req, res, next) => {
//   try {

//        console.log("========== PROTECT ==========");
//     console.log("METHOD:", req.method);
//     console.log("URL:", req.originalUrl);
//     console.log("HEADERS:", req.headers);
//     console.log("AUTH:", req.get("Authorization"));

//     const authHeader = req.get("Authorization");
//     //const authHeader = req.headers.authorization;



//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Authentication required"
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     console.log("TOKEN:", token);

//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token required"
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     console.log("DECODED:", decoded);

//     req.user = decoded;

//     next();

//   } catch (error) {

//     console.error("JWT ERROR:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token"
//     });
//   }
// };

//

const protect = async (req, res, next) => {
  try {
    console.log("========== PROTECT ==========");
    console.log("METHOD:", req.method);
    console.log("URL:", req.originalUrl);
    console.log("HEADERS:", req.headers);
    console.log("AUTH:", req.get("Authorization"));

    const authHeader = req.get("Authorization");
console.log("AUTH HEADER:", authHeader);
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Bearer token missing"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default protect;