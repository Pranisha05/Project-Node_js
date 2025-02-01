import {Router} from "express"
import { userFirstController, userLoginController, allUserControlller, registerUserControlller, getUserprofile } from "../controllers/user.controlles.js"
import { authMiddleWare } from "../middleware/authmiddleware.js"

const userRouter = Router()

userRouter.get('/', userFirstController)
userRouter.post('/login',userLoginController)
userRouter.get('/allUsers',allUserControlller)
userRouter.post('/register',registerUserControlller)
userRouter.get('/:userId',authMiddleWare,getUserprofile)

export default userRouter
