import StatusCodes from "http-status-codes";
import jwt from "jsonwebtoken";
import { prisma } from "../db/index.js";
export const authMiddleWare = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.split(" ")[1];
  if (!authToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid Token" });
  }
  // console.log(authToken);
  try {
    const payload = jwt.verify(authToken, process.env.JWT_SECRET);
    console.log(payload);
    const userId = payload.sub;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      es.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};
