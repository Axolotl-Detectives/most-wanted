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
  return res.status(200).json(res.locals.newList);
});

router.delete('/list', dbController.deleteList, (req, res) => {
  return res.status(200).json(res.locals.newList);
});

router.get('/profile', dbController.getNotes, (req, res) => {
  return res.status(200).json(res.locals.notes);
});

router.patch('/profile', dbController.updateNotes, (req, res) => {
  return res.status(200).json(res.locals.newNotes);
});

router.delete('/profile', dbController.deleteNotes, (req, res) => {
  return res.status(200).json(res.locals.newNotes);
});

module.exports = router;
