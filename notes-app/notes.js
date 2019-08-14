const fs = require('fs');

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

function getNotes() {
    return "Your notes..."
};

function addNote(title, body) {
    const notes = loadNotes();

    const titleExists = notes.filter((note) => note.title === title);

    if (titleExists.length >= 1) {
        console.log('Note title already taken. Try a different title')
        return notes;
    }

    notes.push({title, body});

    saveNotes(notes);
};



module.exports = {
    getNotes,
    addNote
};