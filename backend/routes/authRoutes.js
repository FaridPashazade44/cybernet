const express = require('express');
const bcrypt = require('bcryptjs');
const { users } = require('../data/mockData');
const { signToken } = require('../utils/auth');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'name, email and password are required' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const existing = users.find((u) => u.email.toLowerCase() === normalizedEmail);
  if (existing) {
    return res.status(409).json({ error: 'Email is already in use' });
  }

  const id = `u${users.length + 1}`;
  const hash = await bcrypt.hash(password, 10);
  const handle = `@${name.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.|\.$/g, '')}`;
  const user = {
    id,
    name,
    handle: handle || `@user.${id}`,
    role: 'Member',
    avatar: `https://i.pravatar.cc/80?u=${id}`,
    email: normalizedEmail,
    passwordHash: hash,
  };

  users.push(user);
  const token = signToken(user.id);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

  return res.status(201).json({ token, user: sanitizeUser(user) });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email and password are required' });
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = signToken(user.id);
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

  return res.json({ token, user: sanitizeUser(user) });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return res.status(204).send();
});

router.get('/me', requireAuth, (req, res) => {
  const user = users.find((u) => u.id === req.userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({ user: sanitizeUser(user) });
});

module.exports = router;
