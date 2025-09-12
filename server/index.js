import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/db.js'
import adminRouter from './routes/adminRoutes.js'
import blogRouter from './routes/BlogRoutes.js'

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
app.use('/api/blog', blogRouter)

await connectDB().then(() => {
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
}).catch((error) => {
  console.log("failed to connect db")

})


export default app



