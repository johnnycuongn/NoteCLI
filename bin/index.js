#! /usr/bin/env node

// require('../app')
const yargs = require("yargs");
const notes = require('../notes');
const utils = require('../utils')

// yargs.command('add', true, {
//     text: {
//          describe: 'Note body',
//          demandOption: true,
//          type: 'string',
//          alias: 't'
//      }
//  }, function (argv) {
//      // notes.addSingleNote(argv.text)
//      console.log('adding note')
//  }).help()
 

if (yargs.argv._) {
    const sentence = utils.parseSentence(yargs.argv._)
    notes.addSingleNote(sentence)
}