import  statusCodes  from "http-status-codes";
import { userFirstService,loginUserService, allUserService, getRegisterService, userProfileService } from "../services/user.services.js";
import { createUserSchema, loginUserSchema } from "../schemas/user.schemas.js";

export const userFirstController = async (req,res) =>{
    const data = await userFirstService();
    res.status(statusCodes.OK).json({message: data})
}

export const userLoginController = async (req,res,next) =>{
    try{
        loginUserSchema.parse(req.body)
        const data = await loginUserService(req.body);
        res.status(statusCodes.OK).json(data)
    }
    catch(error){
        console.log(error);
        next(error)
    }
}

export const allUserControlller = async (req,res) =>{
    const usersData = await allUserService();
    res.status(statusCodes.OK).json(usersData)
}

export const registerUserControlller = async (req,res,next) =>{
    try{
        createUserSchema.parse(req.body)
        const data= await getRegisterService(req.body)
        res.status(statusCodes.OK).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const getUserprofile = async (req,res,next) =>{
    try{
        const data= await userProfileService(req.userId)
        res.status(statusCodes.OK).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}