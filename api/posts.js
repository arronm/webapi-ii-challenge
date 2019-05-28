const router = require('express').Router();
const db = require('../data/db.js');

router.get('/:id', (req, res) => {
  res.json({ message: 'success', id: req.params.id });
});

module.exports = router;
