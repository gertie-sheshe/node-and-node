const chalk = require('chalk');
const yargs = require('yargs');

const getNotes = require('./notes');

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
        console.log('Title: ', argv.title, 'Body: ', argv.body);
    }
});

// Register remove command
yargs.command({
    command: 'remove',
    description: 'Removing note',
    handler: function() {
        console.log('Removing that note');
    }
});

// Register list command
yargs.command({
    command: 'list',
    description: 'Listing all notes',
    handler: function() {
        console.log('Listing all notes');
    }
});

// Register read command
yargs.command({
    command: 'read',
    description: 'Reading notes',
    handler: function() {
        console.log('Reading a note');
    }
});

yargs.parse();