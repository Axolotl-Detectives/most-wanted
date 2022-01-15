const express = require('express');
const router = express.Router();
const convictController = require('../controllers/convictController');
const dbController = require('../controllers/dbController');

router.get('/', convictController.fetchMostWanted, (req, res) => {
  return res.status(200).json({ convicts: res.locals.convicts });
});

router.get('/list', dbController.getList, (req, res) => {
  //get list and display the clients list
  return res.status(200).json(res.locals.crimList);
});

router.post('/list', dbController.addList, (req, res) => {
  //redirect to homepage
  return res.status(200).json();
});

router.delete('/list', dbController.deleteList, (req, res) => {
  return res.status(200).json();
});

module.exports = router;
