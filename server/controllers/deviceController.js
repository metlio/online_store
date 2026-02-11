const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const mime = require('mime-types');
const { Op } = require('sequelize');

class DeviceController {
    async create(req, res, next) {
        try {
            console.log('DeviceController.create started');
            let {name, price, brandId, typeId, info, rating} = req.body
            console.log('Device body:', {name, price, brandId, typeId, rating});

            let fileName = null;
            let filekName = null;

            if (req.files) {
                console.log('Files received:', Object.keys(req.files));
                if (req.files.img) {
                    const {img} = req.files;
                    let extension1 = mime.extension(img.mimetype);
                    if (!extension1) {
                        // Fallback if mime.extension fails
                        if (img.mimetype === 'image/jpeg' || img.mimetype === 'image/jpg') extension1 = 'jpg';
                        else if (img.mimetype === 'image/png') extension1 = 'png';
                        else if (img.mimetype === 'image/webp') extension1 = 'webp';
                        else return next(ApiError.badRequest('Неверный тип файла для первого изображения: ' + img.mimetype));
                    }
                    fileName = uuid.v4() + "." + extension1;
                    const filePath1 = path.resolve(__dirname, '..', 'static', fileName);
                    console.log('Uploading device image 1 to:', filePath1);
                    await img.mv(filePath1);
                    console.log('Device image 1 uploaded successfully');
                }

                if (req.files.imgg) {
                    const {imgg} = req.files;
                    let extension2 = mime.extension(imgg.mimetype);
                    if (!extension2) {
                        if (imgg.mimetype === 'image/jpeg' || imgg.mimetype === 'image/jpg') extension2 = 'jpg';
                        else if (imgg.mimetype === 'image/png') extension2 = 'png';
                        else if (imgg.mimetype === 'image/webp') extension2 = 'webp';
                        else return next(ApiError.badRequest('Неверный тип файла для второго изображения: ' + imgg.mimetype));
                    }
                    filekName = uuid.v4() + "." + extension2;
                    const filePath2 = path.resolve(__dirname, '..', 'static', filekName);
                    console.log('Uploading device image 2 to:', filePath2);
                    await imgg.mv(filePath2);
                    console.log('Device image 2 uploaded successfully');
                }
            } else {
                console.log('No files received in req.files');
            }

            // Fallback: if imgg is missing, use fileName
            if (fileName && !filekName) {
                console.log('Using image 1 as fallback for image 2');
                filekName = fileName;
            }

            console.log('Creating device in DB...');
            const device = await Device.create({name, price, brandId, rating, typeId, img: fileName, imgg: filekName});
            console.log('Device created successfully:', device.id);

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
            console.error('Error in DeviceController.create:', e);
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