const yargs = require("yargs");
const fs = require('fs')
const notes = require('./notes')

// console.log(process.argv);

// > note app.js add -t johnny -b cuong
// > note app.js add -t="johnny" -b="cuong"
yargs.command('add', true, {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
        alias: 't'
    }, body: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
        alias: 'b'
    }
}, (argv) => {
    console.log("Title: " + argv.title)
    console.log("Body: " + argv.body)
    notes.addNote(argv.title, argv.body)
}).help().parseAsync()


let removeArgv = yargs.command('remove', true, {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
        alias: 't'
    }
}, (argv) => {
    console.log('Removing note ' + argv.title)
}).argv

const listArgv = yargs.command('list', true, (argv) => {
    console.log('Listing all notes')
}).parse()

const getArgv = yargs.command('get', true, {
    title: {
        describe: 'Note title',
        demandOption: true,
        type: 'string',
        alias: 't'
    }
}, (argv) => {
    console.log('Getting ' + argv.title)
}).parse()