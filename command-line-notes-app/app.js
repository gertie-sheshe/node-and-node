const chalk = require('chalk');
const yargs = require('yargs');

const notes = require('./notes');

// Register add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            description: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.addNote(argv.title, argv.body);
    }
});

// Register remove command
yargs.command({
    command: 'remove',
    description: 'Removing note',
    builder: {
        title: {
            describe: 'Title of Note to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv) {
        notes.removeNote(argv.title);
    }
});

// Register list command
yargs.command({
    command: 'list',
    description: 'Listing all notes',
    handler: function() {
        console.log(chalk.green('Listing all notes'));
        notes.listNotes();
    }
});

// Register read command
yargs.command({
    command: 'read',
    description: 'Reading notes',
    builder: {
        title: {
            description: 'Title of Note',
            demandOption: true
        }
    },
    handler: function(argv) {
        notes.readNote(argv.title);
    }
});

yargs.parse();