const uuid = require('uuid');
const path = require('path');
const { Shapochka } = require('../models/models');
const { ApiError } = require('../error/ApiError');
const mime = require('mime-types');

class ShapochkaController {
    async create(req, res, next) {

        try {
            let {name} = req.body
            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Изображение не выбрано'));
            }
            const {img} = req.files
            const extension = mime.extension(img.mimetype);
            if (!extension) {
                return next(ApiError.badRequest('Неверный тип файла'));
            }
            let fileName = uuid.v4() + "." + extension;
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const shapochka = await Shapochka.create({name, img: fileName});
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