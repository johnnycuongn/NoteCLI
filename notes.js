
const fs = require('fs')

// async function start() {
//     console.log(await fs.readFile('./notes.json', { encoding: 'utf-8' }, (err, dataBuffer) => {
//         console.log(dataBuffer)
//     }))
// }

// start()
debugger
fs.readFile('./notes.json', 'utf-8', (err, data) => {
    console.log('JSON NOTES: ' + data)
})



function getNote(title) {
    console.log('Gettiong note')
}

async function addNote(title, body) {
    console.log('adding note');
    const notes = await loadNotes()
    debugger
    notes.push({
        title: title,
        body: body
    })
    debugger
    const writeData = JSON.stringify(notes)
    fs.writeFile('./notes.json', writeData, (err) => {
        if (err) { console.error('Error writing data') }
        console.log('Successfully adding ' + title)
    })
}

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
    addNote: addNote
}