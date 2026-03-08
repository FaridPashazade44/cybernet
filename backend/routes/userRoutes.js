const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { users } = require('../data/mockData');

const router = express.Router();

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

router.get('/me', requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user: sanitizeUser(user) });
});

router.get('/suggested', requireAuth, (req, res) => {
  const suggested = users.filter((u) => u.id !== req.userId).map(sanitizeUser);
  return res.json({ users: suggested });
});

module.exports = router;
