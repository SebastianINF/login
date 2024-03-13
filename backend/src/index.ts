import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import {cors, corsOption } from './config/cors'
import { PORT } from './constants/variables.env'
import routes from './routes/routes'

const app = express()

app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json())
app.use(routes())

app.listen(PORT)
console.log(`Server on port ${PORT}`)
