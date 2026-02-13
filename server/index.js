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
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000

const fs = require('fs');

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true
}));
app.use(fileUpload({
    createParentPath: true
}))
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

app.use(bodyParser.json())

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
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
            console.log(`CLOUDINARY_CLOUD_NAME: ${process.env.CLOUDINARY_CLOUD_NAME ? 'SET' : 'NOT SET'}`);
            console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'SET' : 'NOT SET'}`);
        })
     } catch (e) {
         console.error('Failed to start server:', e);
         process.exit(1);
     }
 }

app.get('/', function(req, res) {
     res.json({text:"my api run"});
 });

start()