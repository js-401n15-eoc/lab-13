'use strict';

const Users = require('../models/users.js');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).send('invalid login');
    next('invalid login');
    return;
  }

  let token = req.headers.authorization.split(' ').pop();
  console.log('Are we in bearer-auth-middleware?', token);
  Users.authenticateWithToken(token)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(() => next('invalid login'));
};
