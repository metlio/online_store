const { Shapochka } = require('../models/models');
const ApiError = require('../error/ApiError');
const { uploadToCloudinary } = require('../utils/cloudinary');

class ShapochkaController {
    async create(req, res, next) {

        try {
            let {name} = req.body
            if (!req.files || !req.files.img) {
                console.log('Files received:', req.files ? Object.keys(req.files) : 'None');
                return next(ApiError.badRequest('Изображение не выбрано'));
            }
            const {img} = req.files
            console.log('Uploading shapochka image to Cloudinary...');
            const imgUrl = await uploadToCloudinary(img.data);
            console.log('Shapochka image uploaded:', imgUrl);
            const shapochka = await Shapochka.create({name, img: imgUrl});
            return res.json(shapochka)
        }
            catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const shapochki = await Shapochka.findAll()
        return res.json(shapochki)
    }

    async getOne(req, res) {
        const {id} = req.params
        const shapochka = await Shapochka.findOne(
            {
                where: {id},
            },
        )
        return res.json(shapochka)
    }
}

module.exports = new ShapochkaController()