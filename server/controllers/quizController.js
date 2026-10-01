const { QuizResult } = require('../models/models');

class QuizController {
    async createResult(req, res, next) {
        try {
            const { userId, userName, score, total } = req.body;
            if (!userId) {
                return res.status(400).json({ message: 'userId is required' });
            }

            const [result, created] = await QuizResult.findOrCreate({
                where: { userId },
                defaults: { userName, score, total }
            });

            if (!created) {
                result.userName = userName || result.userName;
                result.score = score !== undefined ? score : result.score;
                result.total = total !== undefined ? total : result.total;
                await result.save();
            }

            return res.json(result);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }

    async getResults(req, res, next) {
        try {
            const results = await QuizResult.findAll({
                order: [['updatedAt', 'DESC']],
                limit: 10
            });
            return res.json(results);
        } catch (e) {
            return res.status(500).json({ message: e.message });
        }
    }
}

module.exports = new QuizController();
