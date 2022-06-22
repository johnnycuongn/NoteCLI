const yargs = require("yargs");
const fs = require("fs");
const notes = require("./notes");

// const options = yargs.option("a", {
//     alias: "add",
//     describe: "Adding Note",
//     type: "string",
//     demandOption: true,
// }).argv;

// if (options.a) {
//     console.log(`Adding "${options.a}" to note`);
// }

let argv = yargs
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
        // Function for your command
        handler(argv) {
            console.log("adding note");
        },
    })
    .command(
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
    )
    .command("list", true, (argb) => {
        console.log("Listing notes on date");
    })
    .help().argv;
