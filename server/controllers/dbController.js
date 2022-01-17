const fetch = require('node-fetch');
const { parse } = require('pg-protocol');
const db = require('../model/criminalModel');

const dbController = {};

//grabbing the list data from db when page loads to show current items in list
dbController.getList = (req, res, next) => {
  const queryString = 'SELECT * FROM public.list;';
  db.query(queryString)
    .then((result) => {
      res.locals.crimList = result.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: "dbController.getList: ERROR: can't get data back from database",
        message: {
          err: 'Error occurred in dbController.getList. Check server logs for more details.',
        },
      });
    });
};

//add an entry to the list table, need to get values in from the request body
dbController.addList = (req, res, next) => {
  const values = [
    req.body.title,
    req.body.images,
    req.body.details,
    req.body.reward_text,
    req.body.sex,
    req.body.hair_raw,
    req.body.publication,
    req.body.url,
    req.body.field_offices,
    req.body.criminal_id,
    '[]',
  ];
  const addCrimQuery = `INSERT INTO public.list (title,images,details,reward_text,sex,hair_raw,publication,url,field_offices,criminal_id, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
  db.query(addCrimQuery, values)
    .then((result) => {
      console.log(result.rows);
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.addList: ERROR: adding entry to database',
        message: {
          err: 'Error occurred in dbController.addList. Check server logs for more details.',
        },
      });
    });
};

dbController.deleteList = (req, res, next) => {
  const values = [req.body._id];
  const delCrimQuery = 'DELETE FROM public.list WHERE _id=$1';
  db.query(delCrimQuery, values)
    .then((result) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.deleteList: ERROR: deleting entry from database',
        message: {
          err: 'Error occurred in dbController.deleteList. Check server logs for more details.',
        },
      });
    });
};

dbController.updateNotes = (req, res, next) => {
  /*
  req.body.newNote
  req.body._id
  */

  /*
  (get request) notes data from db
    parse notes
    append/push new note string from req.body
    stringify new note 
      run patch req query with the new stringified notes/ this will return the updated notes 
        parse the data returned 
        send the array of notes back to frontend for state update
  */

  db.query('SELECT notes FROM public.list WHERE _id=$1', [req.body._id])
    .then((data) => {
      const { rows } = data;
      const parsedNotes = JSON.parse(rows[0].notes);
      parsedNotes.push(req.body.newNote);
      return JSON.stringify(parsedNotes);
    })
    .then((result) => {
      const values = [result, req.body._id];
      const updateNotesQuery =
        'UPDATE public.list SET notes=$1 WHERE _id=$2 RETURNING notes;';
      db.query(updateNotesQuery, values)
        .then((data) => {
          return JSON.parse(data.rows[0].notes);
        })
        .then((result) => {
          res.locals.notes = result;
          // TODO sending the new notes array back to the front end to update state
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next({
            log: 'dbController.updateNotes.PATCH: ERROR: updating notes data to the database with new notes',
            message: {
              err: 'Error occurred in dbController.updateNotes. Check server logs for more details.',
            },
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.updateNotes.GET: ERROR: getting all notes data from from database',
        message: {
          err: 'Error occurred in dbController.updateNotes. Check server logs for more details.',
        },
      });
    });
};

dbController.getNotes = (req, res, next) => {
  //get notes based on criminal id of convict
};

dbController.deleteNotes = (req, res, next) => {};

module.exports = dbController;
