const yargs = require("yargs");
const fs = require("fs");
const notes = require("./handlers/notes");
const { getYear } = require("./utils");

// const options = yargs.option("a", {
//     alias: "add",
//     describe: "Adding Note",
//     type: "string",
//     demandOption: true,
// }).argv;

// if (options.a) {
//     console.log(`Adding "${options.a}" to note`);
// }

let addArgv = yargs
    .command({
        command: "add",
        describe: "Add note",
        builder: {
            text: {
                describe: "Note body",
                demandOption: true,
                type: "string",
                alias: "t",
            },
        },
        handler(argv) {
            notes.addSingleNote(argv.text);
        },
    })
    .help();

let removeArgv = yargs.command(
    "remove",
    true,
    {
        title: {
            describe: "Note title",
            demandOption: true,
            type: "string",
            alias: "t",
        },
    },
    (argv) => {
        console.log("Removing note " + argv.title);
    }
);

let getArgv = yargs.command({
    command: ["get", "view"],
    describe: "Get notes on a date",
    builder: {
        date: {
            describe: "date format in dd/mm/yyyy",
            demandOption: true,
            type: "string",
            alias: "d",
        },
    },
    async handler(argv) {
        await notes.getNotesOnDate(argv.date);
    },
});

let editArgv = yargs.command({
    command: ["edit"],
    describe: "Edit notes on a date",
    builder: {
        date: {
            describe: "date format in dd/mm/yyyy",
            demandOption: true,
            type: "string",
            alias: "d",
        }
    },
    async handler(argv) {
        notes.editNotes(argv.date)
    }
})

yargs.parse();
