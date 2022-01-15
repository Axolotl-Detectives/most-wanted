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
  const addCrimQuery = `INSERT INTO public.list (title,images,details,reward_text,sex,hair_raw,publication,url,field_offices,criminal_id) VALUES ('tommy','hi','hi','hi','hi','hi','hi','hi','hi','hi')`;
  db.query(addCrimQuery)
    .then((result) => {
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.addCriminal: ERROR: adding entry to database',
        message: {
          err: 'Error occurred in dbController.addCriminal. Check server logs for more details.',
        },
      });
    });
};

module.exports = dbController;
