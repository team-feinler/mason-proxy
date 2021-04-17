//const nr = require('newrelic');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const port = 3000;
const app = express();
const { url } = require('./host.js');

// For dev purposes
// const morgan = require('morgan');
// app.use(morgan('dev'));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));

app.get('/priceandinventory/id/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const { data } = await axios.get(`${ url }/priceandinventory/id/${ productId }`);
    console.log(data)
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send(e);
  }
});

app.post('/priceandinventory/id/multiple', async (req, res) => {
  const productIds = req.body
  try {
    const productInfo = await axios.post(`${ url }/priceandinventory/id/multiple`, productIds);
    res.status(200).send(productInfo);
  } catch (e) {
    res.status(500).send(e);
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

app.put('/priceandinventory/id/updateRecord', async (req, res) => {
  const recordToUpdate = req.body;
  try {
    await axios.put(`${ url }/priceandinventory/id/updateRecord`, recordToUpdate);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send(e);
  }
});

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