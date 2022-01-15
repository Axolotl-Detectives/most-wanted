const fetch = require('node-fetch');

const convictController = {};

convictController.fetchMostWanted = (req, res, next) => {
  const base = 'https://api.fbi.gov/wanted/v1/list';
  let query;
  let URL;
  
  if (Object.keys(req.query).length > 0) {
    query = `?field_offices=${req.query.field_offices}`
    URL = base + query;
  } else {
    URL = base;
  }
  
  fetch(URL, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    const sortedByPublication = data.items.sort(compare).slice(0, 20);

    res.locals.convicts = sortedByPublication;
    return next();
  })
  .catch(err => {
    console.log(err);
    return next({
      log: 'convictController.fetchMostWanted: ERROR: getting data from FBI Api',
      message: { err: 'Error occurred in convictController.fetchMostWanted. Check server logs for more details.' },
    });
  })


  function compare(a, b) {
    const dateA = new Date(a.publication);
    const dateB = new Date(b.publication);

    if ( dateA > dateB ){
      return -1;
    }
    if ( dateA < dateB ){
      return 1;
    }
    return 0;
  }
}

module.exports = convictController;
