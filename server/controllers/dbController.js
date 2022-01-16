const fetch = require('node-fetch');
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
  ];
  const addCrimQuery = `INSERT INTO public.list (title,images,details,reward_text,sex,hair_raw,publication,url,field_offices,criminal_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
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

module.exports = dbController;
