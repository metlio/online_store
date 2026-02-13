const sequelize = require('./server/db');
const { Device } = require('./server/models/models');

async function check() {
    try {
        const devices = await Device.findAll({
            order: [['createdAt', 'DESC']],
            limit: 5
        });
        devices.forEach(d => {
            console.log(`ID: ${d.id}, Name: ${d.name}, Img: ${d.img}, CreatedAt: ${d.createdAt}`);
        });
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
