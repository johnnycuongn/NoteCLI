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

module.exports = {
    parseSentence: parseSentence,
    getCurrentDate: getCurrentDate,
    getDate: getFullDate,
    getHourMinute: getHourMinute,
};
