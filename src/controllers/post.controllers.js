import { StatusCodes } from "http-status-codes";
import { createPostService, deletePostByIdService, getAllPostService, getPostByIdService, getPostByPostIdService, updatePostService } from "../services/post.servies.js";
import errorMap from "zod/locales/en.js";
import { createPostSchema } from "../schemas/post.schemas.js";

export const getAllPostController = async (req,res,next) =>{
    try{
        const posts = await getAllPostService();
        res.status(StatusCodes.OK).json(posts)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const createPostController = async (req,res,next) =>{
    try{
        createPostSchema.parse(req.body)
        const post = await createPostService(req.body,req.userId)
        res.status(StatusCodes.OK).json(post)
    }
    catch(error){
        console.log(error)
        next(error)
    }
} 

export const getPostByPostIdController = async (req,res,next) =>{
    try{
        const data= await getPostByPostIdService(req.params.postId)
        res.status(StatusCodes.OK).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}
export const getPostByIdController = async (req,res,next) =>{
    try{
        const data= await getPostByIdService(req.params.userId)
        res.status(StatusCodes.OK).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const updatePostController = async (req,res,next) =>{
    try{
        const data= await updatePostService(req.params.postId, req.userId, req.body)
        res.status(StatusCodes.OK).json(data)
    }
    catch(error){
        console.log(error)
        next(error)
    }
}

export const deletePostController = async (req,res,next) =>{
    try{
        const data= await deletePostByIdService(req.params.postId,req.userId)
        res.status(StatusCodes.OK).json({message: "Post Deleted Successfully"})
    }
    catch(error){
        console.log(error)
        next(error)
    }
}