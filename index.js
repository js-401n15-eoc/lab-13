'use strict';

require('dotenv').config();
<<<<<<< HEAD

// Start the web server
require('./src/app.js').start(process.env.PORT);
=======
const mongoose = require('mongoose');
const server = require('./auth/server.js');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

server.start(process.env.PORT || 3000);
>>>>>>> 8d5534924f318360c84bfb4817303a8c6f698d5e
