function parseSentence(words) {
    var sentence = "";
    for (const element of words) {
        sentence = sentence + element + " ";
    }
    return sentence;
}

function getCurrentDate() {
    let ts = Date.now();

    let dateObject = new Date(ts);

    return dateObject.getDate();
}

function getYear() {
    let ts = Date.now();

    let date_ob = new Date(ts);

    return date_ob.getFullYear();
}
/**
 * Get current date in format ddmmyyyy
 */
function getFullDate(separator) {
    const s = separator ?? "_";

    let ts = Date.now();

    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();

    return `${date}${s}${month}${s}${year}`;
}

/**
 *
 * @returns hours and minutes in format hh:mm
 */
function getHourMinute() {
    let ts = Date.now();

    let date_ob = new Date(ts);

    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();

    return `${hours}:${minutes}`;
}

function processDate(date) {
    if (!date || !date.includes("/")) throw Error("Please enter a date in dd/mm/yyyy");

    const dateArr = date.split("/");
    let day = dateArr[0];
    let month = dateArr[1];
    let year = dateArr[2] ?? getYear();

    if (day.startsWith("0")) {
        day = day.slice(1);
    }

    if (month.startsWith("0")) {
        month = month.slice(1);
    }

    return {
        day: day,
        month: month,
        year: year,
    }
}

module.exports = {
    parseSentence: parseSentence,
    getCurrentDate: getCurrentDate,
    getDate: getFullDate,
    getYear: getYear,
    getHourMinute: getHourMinute,
    processDate
};
