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
const fs = require('fs')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload({
    debug: true,
    createParentPath: true
}))
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

// // Обработка ошибок, последний Middleware
app.use(errorHandler)

const start = async () => {
     try {
         const staticPath = path.resolve(__dirname, 'static');
         if (!fs.existsSync(staticPath)) {
             fs.mkdirSync(staticPath, { recursive: true });
         }
         await sequelize.authenticate()
         await sequelize.sync()
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