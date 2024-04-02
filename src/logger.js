var fs = require("fs");
const {
    getCurrentDate,
    getCurrentTime
} = require("./common")

module.exports = {
    log_object(obj) {
        var writeStream = fs.createWriteStream(`logs/${getCurrentDate()}_${getCurrentTime()}`);
        writeStream.write(JSON.stringify(obj))
        writeStream.end();   
    },
}