import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import commentRoute from './routes/comments.js'

dotenv.config()

const app = express()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

// Health check route (for browser / Render)
app.get('/', (req, res) => {
    res.send('🚀 API is running')
})

// Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

// Start server
async function start() {
    try {
        // MongoDB connection (FIXED)
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.vzc841m.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )

        console.log('✅ DB connected')

        app.listen(PORT, () => {
            console.log(`🚀 Server started on port: ${PORT}`)
        })

    } catch (error) {
        console.log('❌ DB connection error:', error)
    }
}

start()
