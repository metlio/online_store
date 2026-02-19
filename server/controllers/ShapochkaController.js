const { Shapochka } = require('../models/models');
const ApiError = require('../error/ApiError');
const { uploadToCloudinary } = require('../utils/cloudinary');

class ShapochkaController {
    async create(req, res, next) {

        try {
            let {name} = req.body
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Изображение не выбрано'));
            }
            const {img} = req.files
            const imgUrl = await uploadToCloudinary(img.data);
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