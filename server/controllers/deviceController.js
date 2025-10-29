const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const { ApiError } = require('../error/ApiError');
const mime = require('mime-types');
const { Op } = require('sequelize');

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info, rating} = req.body

            let fileName = null;
            let filekName = null;

            if (req.files) {
                if (req.files.img) {
                    const {img} = req.files;
                    const extension1 = mime.extension(img.mimetype);
                    if (!extension1) {
                        return next(ApiError.badRequest('Неверный тип файла для первого изображения'));
                    }
                    fileName = uuid.v4() + "." + extension1;
                    img.mv(path.resolve(__dirname, '..', 'static', fileName));
                }

                if (req.files.imgg) {
                    const {imgg} = req.files;
                    const extension2 = mime.extension(imgg.mimetype);
                    if (!extension2) {
                        return next(ApiError.badRequest('Неверный тип файла для второго изображения'));
                    }
                    filekName = uuid.v4() + "." + extension2;
                    imgg.mv(path.resolve(__dirname, '..', 'static', filekName));
                }
            }

            const device = await Device.create({name, price, brandId, rating, typeId, img: fileName, imgg: filekName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
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
        if (brandId) where.brandId = brandId;
        if (typeId) where.typeId = typeId;
        if (name) {
            where.name = {[Op.iLike]: `%${name}%`}
        }
        if (minPrice && maxPrice) {
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