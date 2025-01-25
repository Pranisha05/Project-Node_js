import {Router} from "express"
import { userFirstController, userLoginController } from "../controllers/user.controlles.js"
const userRouter = Router()

userRouter.get('/', userFirstController)

userRouter.post('/login',userLoginController)
export default userRouter
