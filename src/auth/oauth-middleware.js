'use strict';

const superagent = require('superagent');
const Users = require('./users.js');

const tokenServerURL = 'https://github.com/login/oauth/access_token';
const remoteAPI = 'https://api.github.com/user';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const API_SERVER = 'http:://localhost:3000/oauth';

module.exports = (req, res, next) => {
  console.log('you are here...');
  try {
    let code = req.query.code;
    console.log('(1) CODE:', code);

    let remoteToken = await exchangeCodeForToken(code);
    console.log('(2) TOKEN:', remoteToken);
  } catch (e) {
    next(`ERROR ${e.message}`);
  }

  next();
};

async function exchangeCodeForToken(code) {
  let tokenServerResponse = await superagent.post(tokenServerURL)
    .send({
      code: code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: API_SERVER,
      grant_type: 'authorization_code'
    });

    console.log(tokenServerResponse.body);
    
}