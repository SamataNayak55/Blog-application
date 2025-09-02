import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'

//const express = require('express')
const app = express()

await connectDB()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

//routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/admin',adminRouter)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})


export default app



