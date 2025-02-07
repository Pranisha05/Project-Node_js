import {Router} from "express"
import {createPostController, 
        deletePostController, 
        getAllPostController, 
        getPostByIdController, 
        getPostByPostIdController, 
        updatePostController } from "../controllers/post.controllers.js"
import { authMiddleWare } from "../middleware/authmiddleware.js"

const postRouter = Router()

postRouter.route('/')
          .get(authMiddleWare,getAllPostController)
          .post(authMiddleWare,createPostController)

postRouter
.route('/:postId') 
.get(authMiddleWare,getPostByPostIdController)
.patch(authMiddleWare,updatePostController)
.delete(authMiddleWare,deletePostController)
postRouter.get('/user/:userId',authMiddleWare,getPostByIdController)

export default postRouter
