
const fs = require('fs')
const { getDate, getHourMinute } = require('./utils')

// async function start() {
//     console.log(await fs.readFile('./notes.json', { encoding: 'utf-8' }, (err, dataBuffer) => {
//         console.log(dataBuffer)
//     }))
// }

// start()
// debugger
// fs.readFile('./notes.json', 'utf-8', (err, data) => {
//     console.log('JSON NOTES: ' + data)
// })



function getNote(title) {
    console.log('Gettiong note')
}

async function addSingleNote(body) {
    const date = getDate();
    const currentHourMin = getHourMinute();

    const endFile = `./data/${date}.md`
    if (!fs.existsSync(endFile)) {
        fs.writeFile(endFile, `# ${getDate('/')}\n`, (err) => {
            if (err) return console.error(err)
        })
    }

    let addedText = `## ${currentHourMin}\n${body}\n\n`;

    fs.readFile(endFile, 'utf-8', (err, data) => {
        var arr = data.split("\n").filter(s => s);

        for (var i = arr.length-1; i >= 0; i--) {
            if (arr[i].startsWith('##')) {
                const lastHourMinute = arr[i].split(' ')[1].trim()

                if (lastHourMinute == currentHourMin) {
                    addedText = `${body}\n`
                } else {
                    addedText =  `## ${currentHourMin}\n${body}\n`
                }
                break;
            }
        }
        fs.appendFile(endFile, addedText, (err) => {
            if (err) return console.error('Error adding note')
            console.log('Successfully adding data')
        })
    })



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
        if (!fs.existsSync('./notes.json')) {
            fs.writeFile('notes.json', '[]', (err) => {
                if (err) reject(err)
            })
        }
        fs.readFile('./notes.json', 'utf-8', (err, data) => {
            if (err) reject(err)
            resolve(JSON.parse(data))
        })
    })
}

module.exports = {
    getNote: getNote,
    addSingleNote: addSingleNote
}