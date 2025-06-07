import express from "express"
import authRouter from "./routes/authRoute.js"
import { config } from "dotenv"
import cors from "cors"

config()

const PORT = process.env.PORT || 3000

const app = express()

app.disable('x-powered-by')

app.use(cors())

app.use(express.json())

app.use(authRouter)

app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500).json({
        message: err.message
    })
    return
})

app
    .listen(PORT)
    .on('listening', () => {
        console.log(`server running on PORT: ${PORT}`)
    })