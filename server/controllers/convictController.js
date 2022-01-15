const fetch = require('node-fetch');

const convictController = {};

convictController.fetchMostWanted = (req, res, next) => {
  const base = 'https://api.fbi.gov/wanted/v1/list';

  console.log('called fetchMostWanted')
  fetch(base, {
    method: "GET",
  })
  .then(response => response.json())
  .then(data => {
    res.locals.convicts = data;
    return next();
  })
  .catch(err => {
    console.log(err);
    return next({
      log: 'convictController.fetchMostWanted: ERROR: getting data from FBI Api',
      message: { err: 'Error occurred in convictController.fetchMostWanted. Check server logs for more details.' },
    });
  })

}

module.exports = convictController;