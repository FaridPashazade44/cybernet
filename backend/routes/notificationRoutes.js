const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { notifications } = require('../data/mockData');

const router = express.Router();

router.get('/', requireAuth, (req, res) => {
  const items = notifications.filter((n) => n.userId === req.userId);
  return res.json({ notifications: items });
});

router.post('/mark-all-read', requireAuth, (req, res) => {
  notifications.forEach((notification) => {
    if (notification.userId === req.userId) {
      notification.read = true;
    }
  });

  return res.status(204).send();
});

module.exports = router;
