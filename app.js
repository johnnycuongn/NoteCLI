const yargs = require("yargs");
const fs = require("fs");
const notes = require("./handlers/notes");
const { getYear } = require("./utils");

// require('yargs')
//   .command('$0 [name]', 'start the server',(yargs) => {
//     yargs
//       .positional('name', {
//         describe: 'name to display',
//         default: 'world'
//       })
//       .option('add', {
//         alias: 'a',
//         type: 'string',
//         description: 'body text for the note'
//       })
//       .option('edit', {
//         alias: 'e',
//         type: 'string',
//         description: 'Edit a note'
//       })
//   }, (argv) => {
//     console.log("Add:" + argv.add)
//     console.log("Edit:" + argv.edit);
//   })

let addArgv = yargs
    .command(
        "add",
        "Add note",
        (y) => {
            y.option("text", {
                alias: "t",
                type: "string",
                description: "Body text for the note",
            });
        },
        (argv) => {
            notes.addSingleNote(argv.text);
        }
    )
    .help();

let removeArgv = yargs.command(
    "remove",
    "Remove note",
    (y) => {
        y.option("date", {
            alias: "d",
            type: "string",
            description: "Date for removing note",
        });
    },
    (argv) => {
        console.log("Removing note " + argv.date);
    }
);

let getArgv = yargs.command(
    ["get", "view"],
    "View notes on a date",
    (y) => {
        y.option("date", {
            alias: "d",
            type: "string",
            description: "Date in format dd/mm/yyy",
        });
    },
    async (argv) => {
        await notes.getNotesOnDate(argv.date);
    }
);

let editArgv = yargs.command("edit", "Edit notes file on a date", (y) => {
    y.option("date", {
        alias: "d",
        type: "string",
        description: "Date in format dd/mm/yyy",
    });
});

yargs.parse();
