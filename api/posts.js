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
    const posts = await db.insert(req.body);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database.',
    });
  }
});

// POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {

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
router.delete('/:id', (req, res) => {

});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {

});

module.exports = router;
