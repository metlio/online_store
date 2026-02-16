const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const mime = require('mime-types');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../utils/cloudinary');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, rating} = req.body

            if (!req.files || !req.files.img) {
                return next(ApiError.badRequest('Пожалуйста, загрузите основное изображение (img)'));
            }

            const {img} = req.files;
            console.log('Received img:', img.name, 'mimetype:', img.mimetype);

            const extension1 = mime.extension(img.mimetype);
            if (!extension1) {
                console.error('Invalid extension for img:', img.mimetype);
                return next(ApiError.badRequest('Неверный тип файла для первого изображения'));
            }

            let fileName;
            try {
                if (process.env.CLOUDINARY_CLOUD_NAME) {
                    console.log('Uploading primary image to Cloudinary...');
                    fileName = await uploadToCloudinary(img.data);
                    console.log('Cloudinary URL:', fileName);
                } else {
                    console.warn('Cloudinary NOT configured, falling back to local storage');
                    fileName = uuid.v4() + "." + extension1;
                    await img.mv(path.resolve(__dirname, '..', 'static', fileName));
                    console.log('Saved locally to static/', fileName);
                }
            } catch (uploadError) {
                console.error('Primary image upload error:', uploadError);
                return next(ApiError.badRequest('Ошибка при загрузке основного изображения: ' + uploadError.message));
            }

            let filekName = fileName; // По умолчанию второе изображение такое же, как первое
            if (req.files.imgg) {
                const {imgg} = req.files;
                console.log('Received imgg:', imgg.name, 'mimetype:', imgg.mimetype);
                const extension2 = mime.extension(imgg.mimetype);
                if (!extension2) {
                    console.error('Invalid extension for imgg:', imgg.mimetype);
                    return next(ApiError.badRequest('Неверный тип файла для второго изображения'));
                }

                try {
                    if (process.env.CLOUDINARY_CLOUD_NAME) {
                        console.log('Uploading secondary image to Cloudinary...');
                        filekName = await uploadToCloudinary(imgg.data);
                        console.log('Cloudinary URL 2:', filekName);
                    } else {
                        filekName = uuid.v4() + "." + extension2;
                        await imgg.mv(path.resolve(__dirname, '..', 'static', filekName));
                        console.log('Saved imgg locally to static/', filekName);
                    }
                } catch (uploadError2) {
                    console.error('Secondary image upload error:', uploadError2);
                    // Не прерываем процесс, если второе фото не загрузилось, просто используем первое
                    console.warn('Failed to upload secondary image, using primary as fallback');
                    filekName = fileName;
                }
            }

            const device = await Device.create({name, price, brandId, rating, typeId, img: fileName, imgg: filekName});

            if (info) {
                info = JSON.parse(info)
                for (const i of info) {
                    await DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                }
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }


    async getAll(req, res) {
        let {brandId, typeId, limit, page, name, sortBy, minPrice, maxPrice} = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit

        const where = {};
        if (brandId && brandId !== "null" && brandId !== "undefined") where.brandId = brandId;
        if (typeId && typeId !== "null" && typeId !== "undefined") where.typeId = typeId;
        if (name) {
            where.name = {[Op.iLike]: `%${name}%`}
        }
        if (minPrice !== undefined && maxPrice !== undefined && minPrice !== "null" && maxPrice !== "null") {
            where.price = {[Op.between]: [minPrice, maxPrice]}
        }

        let order = [];
        if (sortBy === 'price_asc') {
            order.push(['price', 'ASC']);
        } else if (sortBy === 'price_desc') {
            order.push(['price', 'DESC']);
        } else if (sortBy === 'rating_desc') {
            order.push(['rating', 'DESC']);
        }

        const devices = await Device.findAndCountAll({where, limit, offset, order});

        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params;
            await Device.destroy({where: {id}});
            return res.json({message: 'Устройство успешно удалено'});
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new DeviceController()