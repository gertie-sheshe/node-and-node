const fs = require('fs');
const chalk = require('chalk');

function addNote(title, body) {
    const notes = loadNotes();

    const titleExists = notes.filter((note) => note.title === title);

    if (titleExists.length >= 1) {
        console.log('Note title already taken. Try a different title')
        return notes;
    }

    notes.push({title, body});
    console.log(chalk.green('Note added'));

    saveNotes(notes);
};

function removeNote(title) {
    const notes = loadNotes();

    const newNotes = notes.filter((note) => note.title !== title);

    if (newNotes.length < notes.length) {
        console.log(chalk.green('Note removed successfully'));
        saveNotes(newNotes);
        return;
    } else {
        console.log(chalk.red.inverse('Title does not exist'));
        return;
    }
}

function getNotes() {
    return "Your notes..."
};

// Helper methods
function loadNotes() {
    try {
     const dataBuffer = fs.readFileSync('./notes.json');
     const dataJSON = dataBuffer.toString();
 
     return JSON.parse(dataJSON);
    } catch(e) {
        return []
    }
 }
 
 function saveNotes(notes) {
     const dataJSON = JSON.stringify(notes);
     fs.writeFileSync('./notes.json', dataJSON);
 }



module.exports = {
    getNotes,
    addNote,
    removeNote
};