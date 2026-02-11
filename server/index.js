require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 5000

const app = express()

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}));

// Better to have fileUpload before express.json for multipart handling
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
}))
app.use(express.json())

// Request logger - at the top to catch everything
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    if (req.method === 'POST') {
        console.log('Body:', JSON.stringify(req.body, null, 2));
        console.log('Files:', req.files ? Object.keys(req.files) : 'No files');
    }
    next();
});

app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// 404 handler for unknown routes
app.use((req, res, next) => {
    res.status(404).json({message: `Route ${req.method} ${req.url} not found`})
})

// // Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
     try {
         await sequelize.authenticate()
         await sequelize.sync()

         // Ensure static directory exists
         const staticDir = path.resolve(__dirname, 'static');
         if (!require('fs').existsSync(staticDir)) {
             require('fs').mkdirSync(staticDir, { recursive: true });
             console.log(`Created static directory at ${staticDir}`);
         }

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
     } catch (e) {
         console.error('Failed to start server:', e);
         process.exit(1);
     }
 }

app.get('/', function(req, res) {
     res.json({text:"my api run"});
 });

start()