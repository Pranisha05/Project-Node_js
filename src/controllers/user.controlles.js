import  statusCodes  from "http-status-codes";
import { userFirstService,loginUserService } from "../services/user.services.js";

export const userFirstController = async (req,res) =>{
    const data = await userFirstService();
    res.status(statusCodes.OK).json({message: data})
}

export const userLoginController = async (req,res) =>{
    const data = await loginUserService(req.body);
    res.status(statusCodes.OK).json(data)
}
