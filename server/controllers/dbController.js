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
      db.query('SELECT * FROM public.list;')
        .then((data) => {
          res.locals.newList = data.rows;
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next({
            log: 'dbController.addList.GET: ERROR: getting entry from database',
            message: {
              err: 'Error occurred in dbController.addList.GET. Check server logs for more details.',
            },
          });
        });
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
  const delCrimQuery = 'DELETE FROM public.list WHERE _id=$1;';
  db.query(delCrimQuery, values)
    .then((result) => {
      db.query('SELECT * FROM public.list;')
        .then((data) => {
          res.locals.newList = data.rows;
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next({
            log: 'dbController.deleteList.GET: ERROR: getting entry from database',
            message: {
              err: 'Error occurred in dbController.deleteList.GET. Check server logs for more details.',
            },
          });
        });
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
          res.locals.newNotes = result;
          // TODO sending the new notes array back to the front end to update state
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next({
            log: 'dbController.updateNotes.PATCH: ERROR: updating notes data to the database with new notes',
            message: {
              err: 'Error occurred in dbController.updateNotes.PATCH. Check server logs for more details.',
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
  const values = [req.body._id];
  const getNotesQuery = 'SELECT notes FROM public.list WHERE _id=$1;';
  db.query(getNotesQuery, values)
    .then((data) => {
      const parsedNotes = JSON.parse(data.rows[0].notes);
      res.locals.notes = parsedNotes;
      // ! saved in notes
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.getNotes: ERROR: getting notes data from from database',
        message: {
          err: 'Error occurred in dbController.getNotes. Check server logs for more details.',
        },
      });
    });
};

dbController.deleteNotes = (req, res, next) => {
  //need req.body._id of which convicts notes to delete
  //need req.body.notesIndex from 0 - notes.length to know which note to delete

  db.query('SELECT notes FROM public.list WHERE _id=$1', [req.body._id])
    .then((data) => {
      const { rows } = data;
      const parsedNotes = JSON.parse(rows[0].notes);
      parsedNotes.splice(req.body.notesIndex, 1);
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
          res.locals.newNotes = result;
          // ! sending newNotes state back to frontend
          return next();
        })
        .catch((err) => {
          console.log(err);
          return next({
            log: 'dbController.deleteNotes.UPDATE: ERROR: updating note data from from database',
            message: {
              err: 'Error occurred in dbController.deleteNotes.UPDATE. Check server logs for more details.',
            },
          });
        });
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'dbController.deleteNotes.GET: ERROR: getting note data from from database',
        message: {
          err: 'Error occurred in dbController.deleteNotes.GET. Check server logs for more details.',
        },
      });
    });
};

dbController.getSpecificConvict = (req,res,next) =>{
  //criminal id is in the url
  //get back all criminal info 
  //req.query or req.params 
  const getConvictQuery = 'SELECT * FROM public.list WHERE criminal_id=:id'
  db.query()
}


module.exports = dbController;
