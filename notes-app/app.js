const chalk = require('chalk');
const yargs = require('yargs');

const getNotes = require('./notes');

// Register add command
yargs.command({
    command: 'add',
    description: 'Add a new note',
    handler: function() {
        console.log('Adding a new note');
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

console.log(yargs.argv)