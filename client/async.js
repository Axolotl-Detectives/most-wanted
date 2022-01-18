export const getConvictsFromFBI = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/')
      .then((res) => res.json())
      .then((data) => {
        resolve(data.convicts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getConvictByFieldOffice = (fieldOffice) => {
  return new Promise((resolve, reject) => {
    // will need parse the field office to be lowercase with no spaces like New York => newyork
    fetch(`http://localhost:3000/api/?field_offices=${fieldOffice}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data.convicts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getConvictsFromDb = () => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/list')
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const addConvictToDb = (body) => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:3000/api/list', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getConvictById = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`http://localhost:3000/api/list/${id}`)
      .then((res) => res.json())
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

// todos
// add a function to update a convicts notes with data from state
// add a function to remove a convict from db
