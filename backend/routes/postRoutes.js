const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const { users, posts } = require('../data/mockData');

const router = express.Router();

function enrichPost(post, requesterId) {
  const author = users.find((u) => u.id === post.authorId);
  return {
    ...post,
    author: author
      ? { id: author.id, name: author.name, handle: author.handle, avatar: author.avatar }
      : null,
    liked: post.likedBy.includes(requesterId),
  };
}

router.get('/', requireAuth, (req, res) => {
  return res.json({ posts: posts.map((post) => enrichPost(post, req.userId)) });
});

router.post('/', requireAuth, (req, res) => {
  const { text, tags = [], media = null } = req.body || {};
  if (!text || !String(text).trim()) {
    return res.status(400).json({ error: 'text is required' });
  }

  const newPost = {
    id: `p${posts.length + 1}`,
    authorId: req.userId,
    time: 'Now',
    text: String(text).trim(),
    tags: Array.isArray(tags) ? tags : [],
    media,
    stats: { likes: 0, comments: 0, shares: 0 },
    likedBy: [],
  };

  posts.unshift(newPost);
  return res.status(201).json({ post: enrichPost(newPost, req.userId) });
});

router.post('/:postId/like', requireAuth, (req, res) => {
  const post = posts.find((p) => p.id === req.params.postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  const index = post.likedBy.indexOf(req.userId);
  if (index >= 0) {
    post.likedBy.splice(index, 1);
    post.stats.likes = Math.max(0, post.stats.likes - 1);
  } else {
    post.likedBy.push(req.userId);
    post.stats.likes += 1;
  }

  return res.json({ post: enrichPost(post, req.userId) });
});

module.exports = router;
