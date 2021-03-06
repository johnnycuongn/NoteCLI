#! /usr/bin/env node

const yargs = require("yargs");
const notes = require("../handlers/notes");
const { parseSentence } = require("../utils");

if (yargs.argv._) {
    const sentence = parseSentence(yargs.argv._);
    notes.addSingleNote(sentence);
}
