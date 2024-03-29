const express = require('express');

const router = new express.Router();

const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    
    try {
        await user.save();
        res.send({message: 'User Saved', user});
    } catch(e) {
        res.status(500).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch(e) {
        res.status(400).send({error: e});
    }
});

router.get('/users', async (req, res) => {
   try {
        const users = await User.find({});
        res.status(200).send(users);
   } catch(e) {
       res.status(500).send(e);
   }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById({_id: req.params.id});
        user ? res.status(200).send(user) : res.status(400).send('No User found')
    } catch(e) {
        res.status(500).send(e);
    }
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];

    const isValidUpdate = updates.every(update => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Invalid updates!'})
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send('No user with that id');
        }

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        // const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.send(user)
    } catch(e) {
        res.status(500).send(e);
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({_id: req.params.id});
        deletedUser ? res.send({message: 'User deleted', deletedUser}) : res.status(404).send('No user found');
    } catch(e) {
        res.status(500).send(e);
    }
});

module.exports = router;