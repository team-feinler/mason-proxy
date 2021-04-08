const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const port = 3000;
const app = express();

// For dev purposes
// const morgan = require('morgan');
// app.use(morgan('dev'));

app.use(cors());
app.use(express.static(`${__dirname}/../public`));
app.use('/:id', express.static(`${__dirname}/../public`));

app.get('/priceandinventory/id/:productId', async (req, res) => {
  const { productId } = req.params;
  //forward productId to service using axios
  //send response data to client w/ 200 code on success
})

app.listen(port, () => console.log(`listening on port ${port}`));