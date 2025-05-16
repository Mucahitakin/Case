const express = require('express');
const router = express.Router();
const users = require('../heymuco/users.json');
const auth = require('../middleware/auth');

router.get('/', (req, res) => {
    const names = users.map(u => u.name);
    res.json(names);
});

router.get('/:userId', auth, (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
});

router.put('/:userId', auth, (req, res) => {
    const user = users.find(u => u.id === req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    res.json(user);
});

module.exports = router;