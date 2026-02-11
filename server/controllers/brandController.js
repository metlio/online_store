const uuid = require('uuid');
const path = require('path');
const {Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const mime = require('mime-types');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            let fileName = null;

            if (req.files && req.files.img) {
                const {img} = req.files;
                const extension = mime.extension(img.mimetype);
                if (!extension) {
                    return next(ApiError.badRequest('Неверный тип файла. Поддерживаются только изображения.'));
                }
                fileName = uuid.v4() + "." + extension;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                console.log('Uploading brand image to:', filePath);
                await img.mv(filePath);
            }

            const brand = await Brand.create({name, img: fileName});
            return res.json(brand);
        } catch (e) {
            console.error('Error in BrandController.create:', e);
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Brand.destroy({where: {id}});
            return res.json({message: 'Бренд успешно удален'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new BrandController()