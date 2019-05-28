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
router.get('/:id', (req, res) => {

});

// GET /api/posts/:id/comments
router.get('/:id/comments', (req, res) => {

});

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {

});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {

});

module.exports = router;
