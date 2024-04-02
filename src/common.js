module.exports = {
    getCurrentDate() {
        const currentDate = new Date();
      
        // Extracting individual components of the date
        const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
        const day = currentDate.getDate();
        const year = currentDate.getFullYear();
      
        // Formatting the date with leading zeros if necessary
        const formattedMonth = month < 10 ? '0' + month : month;
        const formattedDay = day < 10 ? '0' + day : day;
      
        // Constructing the date string in the desired format (mm-dd-yyyy)
        const formattedDate = year + '-' + formattedMonth + '-' + formattedDay;
      
        return formattedDate;
    },

    getCurrentTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();

        return (`${hours}-${minutes}-${seconds}`)
    }
}