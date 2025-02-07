import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"
import { ZodError } from "zod";

export const errorHandler = (error, req, res, next) => {
  console.error("Error logged in error handler:--", error?.message);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.log(error.code)
    switch (error.code) {
      case "P2002": // Unique constraint failed
        res.status(StatusCodes.CONFLICT).json({
          error: `Unique constraint failed on ${
            error.meta?.target || "unknown field"
          }`,
          message: `${error.meta?.target || "unknown field"} already exists`,
        });
        return;
      case "P2005": //Invalid argument
        res.status(StatusCodes.NOT_ACCEPTABLE).json({
          error: `Invalid Value on ${error.meta?.target || "unknown field"}`,
          message: `Data type do not match for ${error.meta?.target || "unknown field"}`,
        });
      return;
      case "P2025": // Record not found
        res.status(StatusCodes.NOT_FOUND).json({
          error: "Not Found",
          message: "The requested resource could not be found.",
        });
        return;
      default:
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          error: "Internal Server Error",
          message: "AN UNEXPECTED ERROR HAS OCCURRED.",
        });
        return;
    }
  }

  
  if(error instanceof jwt.JsonWebTokenError)
    {
      req.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        error:"Unauthorized Error",
        message:"Token invalid!",
      });
    }
    if (error?.cause == "CustomError"){
      res.status(StatusCodes.UNAUTHORIZED).json({
          error: "Unauthorized Error",
          message: error.message,
      })
    }
    
  if (error?.cause == "NotFoundCustomError"){
    res.status(StatusCodes.UNAUTHORIZED).json({
        error: "No posts",
        message: error.message,
    })
  }

  if (error?.cause == "UnauthorizedError"){
    res.status(StatusCodes.UNAUTHORIZED).json({
        error: "Unauthorized",
        message: error.message,
    })
  }

  if(error instanceof ZodError){
    const errorMessages = error.errors.map((issue) => ({
      message: `${issue.path.join('.')} is ${issue.message}`
    }))
    res.status(StatusCodes.BAD_REQUEST)
      .json({
      error:"Invalid Data",
      message: errorMessages
    })
    return
  }
  
  // Catch-all for unexpected errors
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: "Internal Server Error",
    message: "An unexpected error occurred!!!",
  });
};