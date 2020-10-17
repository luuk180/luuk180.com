import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import fetch from 'node-fetch';

const cors = require('cors');
const express = require('express');
const app = express();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const serviceAccount = require('../credentials.json');
let globalData = [
  {
    name: 'Not loaded yet...',
    description: null,
    url: null,
    pushedAt: null
  },
  {
    name: 'null',
    description: null,
    url: null,
    pushedAt: null
  },
];

app.use(cors({ origin: true }));
app.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.send(globalData);
});

exports.GitHubAPI = functions.https.onRequest(app);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://luuk180-dev.firebaseio.com'
});

// Fetch repository information from GitHub
exports.GitHubToDB = functions.pubsub.schedule('0 * * * *')
  .timeZone('America/New_York').onRun(async (context) => {
  const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        Authorization: `bearer ${functions.config().github.token}`
        },
        body: JSON.stringify({
          query: `
          {
            user(login: "luuk180") {
              repositories(first: 99, orderBy: {field: PUSHED_AT, direction: DESC}) {
                nodes {
                  name
                  description
                  url
                  pushedAt
                }
              }
            }
          }
          `,
        }),
  });
  const json = await response.json();
  const data = json.data.user.repositories.nodes;

  globalData = data;

  return 0;
});
