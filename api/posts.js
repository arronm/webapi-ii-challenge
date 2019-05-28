const router = require('express').Router();
const db = require('../data/db.js');

// router.get('/:id', (req, res) => {
//   res.json({ message: 'success', id: req.params.id });
// });

// POST /api/posts
router.post('/', async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400).json({
      error: 'Please provide title and contents for the post.',
    });
  }

  try {
    const post = await db.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database.',
    });
  }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', async (req, res) => {
  const { text } = req.body;
  if (!text) res.status(400).json({ error: 'Please provide text for the comment.' });

  try {
    const comment = await db.insertComment({
      ...req.body,
      post_id: req.params.id,
    });

    if (comment) {
      res.status(201).json({
        ...comment,
        ...req.body,
        post_id: req.params.id,
      });
    } else {
      res.status(404).json({ error: `The post with the specified ID (${req.params.id}) does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'There was an error while saving the comment to the database.' });
  }
});

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await db.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      error: 'The posts information could not be retrieved.',
    });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const posts = await db.findById(req.params.id);
    if (posts.length > 0) {
      res.json(posts);
    } else {
      res.status(404).json({ error: `The post with the specified ID (${req.params.id}) does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'The post information could not be retrieved.' });
  }
});

// GET /api/posts/:id/comments
router.get('/:id/comments', async (req, res) => {
  try {
    const comments = await db.findPostComments(req.params.id);
    if (comments.length > 0) {
      res.json(comments);
    } else {
      res.status(404).json({ error: `The post with the specified ID (${req.params.id}) does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'The comments information could not be retrieved.' });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);
    const count = await db.remove(req.params.id);

    if (count > 0) {
      res.json(post);
    } else {
      res.status(404).json({ error: `The post with the specified ID (${req.params.id}) does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'The post could not be removed.' });
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) res.status(400).json({ error: 'Please provide title and contents for the post' });

  try {
    const post = await db.update(req.params.id, req.body);

    if (post) {
      res.json({
        ...post,
        ...req.body,
      });
    } else {
      res.status(404).json({ error: `The post with the specified ID (${req.params.id}) does not exist.` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'The post information could not be modified.' });
  }
});

module.exports = router;
