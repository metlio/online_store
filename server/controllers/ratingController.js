const {Device} = require('../models/models')
const ApiError = require('../error/ApiError');

class RatingController {

    async getAll(req, res) {
        const rates = await Device.findAll()
            return res.json(rates)

        }

    async create(req, res) {
        try {
            const {id, rating} = req.body
            const file = await Device.findOne({where: {id}})   
            file.rating = rating;
            await file.save();
            return res.json(file)
            }

         catch (e) {
            console.log(e)
            return res.status(400).json(e)
        }

    }}

module.exports = new RatingController()

// const {Rating} = require('../models/models')
// const ApiError = require('../error/ApiError');

// class RatingController {
//     async create(req, res) {
//         const {rate} = req.body
//         const type = await Rating.create({rate})
//         return res.json(type)
//     }

//     async getAll(req, res) {
//         const rates = await Rating.findAll()
//         return res.json(rates)
//     }

//     async editOne(req, res) {
//         const {rate} = req.body
//         console.log({id, rating, deviceId})
//         const rates = new Rating({rate})
//         await rates.save()
//         return res.json(rates)
//     }

//     async check(req, res) {
        
//     }
// }

// module.exports = new RatingController()