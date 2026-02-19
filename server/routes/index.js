const Router = require('express')
const router = new Router()
const cloudinary = require('cloudinary').v2;
const deviceRouter = require('./deviceRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const shapochkaRouter = require('./shapochkaRouter')
const ratingRouter = require('./ratingRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/shapochka', shapochkaRouter)
router.use('/rating', ratingRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)

router.get('/test-cloudinary', async (req, res) => {
    try {
        const config = {
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing',
            api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
        };

        // Try a simple ping or info call
        const result = await cloudinary.api.ping();

        return res.json({
            status: 'Success',
            config,
            ping: result
        });
    } catch (e) {
        return res.status(500).json({
            status: 'Error',
            message: e.message,
            config: {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY ? 'Present' : 'Missing',
                api_secret: process.env.CLOUDINARY_API_SECRET ? 'Present' : 'Missing'
            }
        });
    }
});

module.exports = router