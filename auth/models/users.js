'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let secret = 'thisislab12bbq';

const Users = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

// mongo pre-save
Users.pre('save', async function() {
  this.password = await bcrypt.hash(this.password, 5);
});

// anything.statics.whatever === static or class method
Users.statics.authenticateBasic = async function(username, password) {
  try {
    let query = { username };
    let user = await this.findOne(query);
    if (user) {
      let isValid = bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      } else {
        throw 'Invalid User';
      }
    } else {
      throw 'Invalid User';
    }
  } catch (err) {
    console.error(err);
  }
};

// anything.methods.whatever === instance method
Users.methods.generateToken = function() {
  // Use the user stuff (this) to make a token.
  let userObject = {
    username: this.username,
  };
  return jwt.sign(userObject, secret);
};

Users.statics.authenticateWithToken = async function(token) {
  console.log('top of authenticatewithtoken');
  try {
    let tokenObject = jwt.verify(token, secret);
    let user = await this.findOne({ username: tokenObject.username });
    return user;
  } catch (e) {
    throw e.message;
  }
};
module.exports = mongoose.model('users', Users);
