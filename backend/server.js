import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import UserRoutes from './Routes/UserRoutes.js'
import RentalRoutes from './Routes/RentalRoutes.js'
import path from 'node:path';
import { fileURLToPath } from 'url';




dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/user', UserRoutes)
app.use('/rental', RentalRoutes)

const port = process.env.port || 5000
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log('error occured', err))

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})
