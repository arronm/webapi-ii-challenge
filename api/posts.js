const router = require('express').Router();
const db = require('../data/db.js');

// router.get('/:id', (req, res) => {
//   res.json({ message: 'success', id: req.params.id });
// });

// POST /api/posts
router.post('/', (req, res) => {

});

// POST /api/posts/:id/comments
router.post('/:id/comments', (req, res) => {

});

// GET /api/posts
router.get('/', (req, res) => {

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
