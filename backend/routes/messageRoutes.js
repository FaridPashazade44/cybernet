const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { users, chats } = require('../data/mockData');

const router = express.Router();

function profile(userId) {
  const user = users.find((candidate) => candidate.id === userId);
  if (!user) {
    return null;
  }
  return { id: user.id, name: user.name, handle: user.handle, avatar: user.avatar };
}

router.get('/chats', requireAuth, (req, res) => {
  const list = chats
    .filter((chat) => chat.memberIds.includes(req.userId))
    .map((chat) => ({
      id: chat.id,
      members: chat.memberIds.map(profile).filter(Boolean),
      messages: chat.messages,
    }));

  return res.json({ chats: list });
});

router.post('/chats/:chatId/messages', requireAuth, (req, res) => {
  const chat = chats.find((candidate) => candidate.id === req.params.chatId && candidate.memberIds.includes(req.userId));

  if (!chat) {
    return res.status(404).json({ error: 'Chat not found' });
  }

  const { text } = req.body || {};
  if (!text || !String(text).trim()) {
    return res.status(400).json({ error: 'text is required' });
  }

  const message = {
    id: `m${chat.messages.length + 1}`,
    from: req.userId,
    text: String(text).trim(),
    time: 'Now',
  };

  chat.messages.push(message);
  return res.status(201).json({ message });
});

module.exports = router;
