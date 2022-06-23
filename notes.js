const fs = require("fs");
const { getDate, getHourMinute, parseSentence } = require("./utils");

const homeDir = require("os").homedir();
const notesFolder = `${homeDir}/notes`;

if (!fs.existsSync(notesFolder)) {
    fs.mkdirSync(notesFolder);
}

function getNotesOnDate(day, month, year) {
    if (day.startsWith("0")) {
        day = day.slice(1);
    }

    if (month.startsWith("0")) {
        month = month.slice(1);
    }
    fs.readdir(notesFolder, (err, files) => {
        const find = files.filter((file) =>
            file.includes(`${day}_${month}_${year}`)
        )[0];
        if (!find)
            return console.error(
                `Unable to find notes on ${day}/${month}/${year}`
            );
        fs.readFile(`./data/${find}`, "utf-8", (err, data) => {
            if (err) return console.error(err);
            console.log(data);
        });
    });
}

async function addSingleNote(body) {
    if (body.trim().length === 0) return console.error("Empty note!!");
    const date = getDate();
    const currentHourMin = getHourMinute();

    const endFile = `${notesFolder}/${date}.md`;
    if (!fs.existsSync(endFile)) {
        fs.writeFile(endFile, `# ${getDate("/")}\n`, (err) => {
            if (err) return console.error(err);
        });
    }

    let addedText = `## ${currentHourMin}\n${body}\n\n`;

    fs.readFile(endFile, "utf-8", (err, data) => {
        var arr = data.split("\n").filter((s) => s);

        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].startsWith("##")) {
                const lastHourMinute = arr[i].split(" ")[1].trim();

                if (lastHourMinute == currentHourMin) {
                    addedText = `${body}\n`;
                } else {
                    addedText = `## ${currentHourMin}\n${body}\n`;
                }
                break;
            }
        }
        fs.appendFile(endFile, addedText, (err) => {
            if (err) return console.error("Error adding note");
            console.log("Successfully adding data");
        });
    });
}

// async function addNote(title, body) {
//     const notes = await loadNotes()
//     debugger
//     notes.push({
//         title: title,
//         body: body
//     })
//     debugger
//     const writeData = JSON.stringify(notes)
//     fs.writeFile('./notes.json', writeData, (err) => {
//         if (err) { console.error('Error writing data') }
//         console.log('Successfully adding ' + title)
//     })
// }

const loadNotes = async () => {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync("./notes.json")) {
            fs.writeFile("notes.json", "[]", (err) => {
                if (err) reject(err);
            });
        }
        fs.readFile("./notes.json", "utf-8", (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
};

module.exports = {
    getNotesOnDate: getNotesOnDate,
    addSingleNote: addSingleNote,
    notesFolder: notesFolder,
};
