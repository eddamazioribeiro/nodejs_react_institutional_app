const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.DEFAULT_PORT || 5000;

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// routes
app.get('/api', (req, res) => {
  res.json({
    data: 'API is working'
  });
});


app.listen(port, () => {
  console.log(`Server ir running on port ${port}`);
});
