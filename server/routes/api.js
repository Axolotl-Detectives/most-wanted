const express = require('express');
const router = express.Router();
const convictController = require('../controllers/convictController');

router.get('/', 
  convictController.fetchMostWanted,
  (req, res) => {
    return res.status(200).json({ convicts: res.locals.convicts });
  }
);

module.exports = router;