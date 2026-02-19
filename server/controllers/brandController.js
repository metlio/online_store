const {Brand} = require('../models/models')
const ApiError = require('../error/ApiError')
const { uploadToCloudinary } = require('../utils/cloudinary');

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body;
            let imgUrl = null;

            if (req.files && req.files.img) {
                const {img} = req.files;
                imgUrl = await uploadToCloudinary(img.data);
            }

            const brand = await Brand.create({name, img: imgUrl});
            return res.json(brand);
        } catch (e) {
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