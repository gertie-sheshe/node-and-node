const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: true
    }
});

taskSchema.pre('save', async function(next) {
    console.log('bEFORE SAVE');
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;