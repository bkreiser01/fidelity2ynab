var fs = require("fs");
const {
    getCurrentDate,
    getCurrentTime
} = require("./common")

module.exports = {
    log_object(obj) {
        var dir = 'logs/';

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        var writeStream = fs.createWriteStream(`logs/${getCurrentDate()}_${getCurrentTime()}`);
        writeStream.write(JSON.stringify(obj))
        writeStream.end();   
    },
}

email = {
payee: 'HOBOKEN MUNICIPAL COUR',
date: '2024-04-17',
amount: -237930
}

module.exports.log_object(email)