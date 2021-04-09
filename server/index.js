const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const port = 3000;
const app = express();
const { url } = require('./host.js');

// For dev purposes
// const morgan = require('morgan');
// app.use(morgan('dev'));

app.use(cors());
app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));

app.get('/priceandinventory/id/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const { data } = await axios.get(`${ url }/priceandinventory/id/${ productId }`);
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(err);
  }
});

//add POST routes
app.post('/priceandinventory/id/multiple', async (req, res) => {
  const productIds = req.body
  if (productIds.length > 30 || productIds.length === 0 || !productIds) {
    res.status(500).end();
  } else {
    const productInfo = await axios.post(`${ url }/priceandinventory/id/multiple`, productIds);
    res.status(200).send(productInfo);
  }
});

app.post('/priceandinventory/id/createRecord', async (req, res) => {
  const newRecord = req.body;
  try {
    await axios.post(`${ url }/priceandinventory/id/createRecord`, newRecord);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add PUT route
app.put('/priceandinventory/id/updateRecord', async (req, res) => {
  const recordToUpdate = req.body;
  try {
    const result = await axios.put(`${ url }/priceandinventory/id/updateRecord`, recordToUpdate);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
});

//add DELETE route
app.delete('/priceandinventory/id/removeRecord/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    await axios.delete(`${ url }/priceandinventory/id/removeRecord/${ productId }`);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).end();
  }
});

app.listen(port, () => console.log(`listening on port ${port}`));