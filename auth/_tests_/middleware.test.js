'use strict';

const supergoose = require('@code-fellows/supergoose');
const server = require('../server.js');
const agent = supergoose(server);
const Users = require('../models/users.js');
const base64 = require('base-64');
const oauth = require('../middleware/oauth-middleware.js');
const bearerAuth = require('../middleware/bearer-auth-middleware.js');

let users = {
  admin: { username: 'admin', password: 'password', role: 'admin' },
  editor: { username: 'editor', password: 'password', role: 'editor' },
  user: { username: 'user', password: 'password', role: 'user' },
};

// beforeAll(async done => {
//   const adminUser = await Users.save(users.admin);
//   const editorUser = await Users.save(users.editor);
//   const userUser = await Users.save(users.user);
//   done();
// });

describe('Auth Middleware', () => {
  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  it('allows a user to authenticate on github through oauth', () => {
    let req = {
      query: {
        code: 'beepboop12345',
      },
    };
    let res = {};
    let next = jest.fn();

    return oauth(req, res, next).then(() => {
      expect(next).toHaveBeenCalled();
    });
  });
});

// describe('bearer auth middleware', () => {
//   const token =
//     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImVjYW9pbGUiLCJpYXQiOjE1ODE4Nzg3NzV9.0rYOkwV1STtHOLbwiar575OZDGZf-TD4byrz31QKxkc';
//   it('allows a user to access the secret page if they have authorization', () => {
//     let req = {
//       headers: {
//         authorization: `Authorization:Bearer ${token}`,
//       },
//     };
//     let res = {};
//     let next = jest.fn();
//     bearerAuth(req, res, next).then(() => {
//       expect(next).toHaveBeenCalled();
//     });
//   });
// });
