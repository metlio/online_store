const uuid = require('uuid');
const path = require('path');
const {Brand, Type} = require('../models/models')
const ApiError = require('../error/ApiError')
const mime = require('mime-types');

class BrandController {
    async create(req, res, next) {
        try {
            console.log('BrandController.create started');
            const {name} = req.body;
            console.log('Brand name:', name);
            let fileName = null;

            if (req.files && req.files.img) {
                console.log('Brand image found in req.files');
                const {img} = req.files;
                let extension = mime.extension(img.mimetype);
                if (!extension) {
                    if (img.mimetype === 'image/jpeg' || img.mimetype === 'image/jpg') extension = 'jpg';
                    else if (img.mimetype === 'image/png') extension = 'png';
                    else if (img.mimetype === 'image/webp') extension = 'webp';
                    else return next(ApiError.badRequest('Неверный тип файла: ' + img.mimetype));
                }
                fileName = uuid.v4() + "." + extension;
                const filePath = path.resolve(__dirname, '..', 'static', fileName);
                console.log('Uploading brand image to:', filePath);
                await img.mv(filePath);
                console.log('Brand image uploaded successfully');
            } else {
                console.log('No brand image provided');
            }

            console.log('Creating brand in DB...');
            const brand = await Brand.create({name, img: fileName});
            console.log('Brand created successfully:', brand.id);
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