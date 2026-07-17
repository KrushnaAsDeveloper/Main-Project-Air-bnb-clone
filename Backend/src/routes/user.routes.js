import express from "express"
import {loginUser, logoutUser, registerUser} from "../controllers/user.controller.js"
import { protect } from "../middlewares/user.middleware.js"
const router = express.Router()


router.post("/register",  registerUser)
router.post("/login",  loginUser)
router.post("/logout", protect,  logoutUser)

export default router;