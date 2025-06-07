import express from "express"
import { tokenController } from "../controllers/authController.js"

const authRouter = express.Router()

authRouter.post('/getToken', tokenController)

export default authRouter