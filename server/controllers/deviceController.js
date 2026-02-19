const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require('sequelize');
const { uploadToCloudinary } = require('../utils/cloudinary');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, rating} = req.body

            if (!req.files || !req.files.img) {
                console.log('Request body:', req.body);
                console.log('Files received:', req.files ? Object.keys(req.files) : 'None');
                return next(ApiError.badRequest('Пожалуйста, загрузите основное изображение (img)'));
            }

            const {img} = req.files;
            console.log('Uploading primary image to Cloudinary...');
            const imgUrl = await uploadToCloudinary(img.data);
            console.log('Primary image uploaded:', imgUrl);

            let imggUrl = imgUrl; // По умолчанию второе изображение такое же, как первое
            if (req.files.imgg) {
                const {imgg} = req.files;
                console.log('Uploading secondary image to Cloudinary...');
                imggUrl = await uploadToCloudinary(imgg.data);
                console.log('Secondary image uploaded:', imggUrl);
            }

            const device = await Device.create({name, price, brandId, rating, typeId, img: imgUrl, imgg: imggUrl});

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