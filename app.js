const yargs = require("yargs");
const fs = require('fs')
const notes = require('./notes')

// console.log(process.argv);


yargs.command('add', true, {
   text: {
        describe: 'Note body',
        demandOption: true,
        type: 'string',
        alias: 't'
    }
}, function (argv) {
    // notes.addSingleNote(argv.text)
    console.log('adding note')
})



const removeArgv = yargs.command('remove', true, {
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

module.exports = {
// addArgv: addArgv,
removeArgv,
listArgv,
getArgv
}