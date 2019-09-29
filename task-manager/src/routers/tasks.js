const express = require('express');

const router = new express.Router();

const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(200).send('Task saved');
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).send(tasks);
    } catch(e) {
        res.status(500).send(e);
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findById({_id: req.params.id});
        task ? res.status(200).send(task) : res.status(404).send('No task found');
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completed', 'description'];

    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        res.status(400).send({error: 'Invalid updates!'});
    }

    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(400).send('No task with that id');
        }

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        res.send(task);

        // const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    } catch(e) {
        res.status(500).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        deletedTask ? res.send(deletedTask) : res.status(404).send('No task found');    
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;