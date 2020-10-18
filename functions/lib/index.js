"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const node_fetch_1 = require("node-fetch");
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
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://luuk180-dev.firebaseio.com'
});
const db = admin.database();
const ref = db.ref('GH-API');
app.use(cors({ origin: true }));
app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    ref.once('value').then(snapshot => {
        res.send(snapshot.val());
    });
});
exports.GitHubAPI = functions.https.onRequest(app);
// Fetch repository information from GitHub
exports.GitHubToDB = functions.pubsub.schedule('0 * * * *')
    .timeZone('America/New_York').onRun(async (context) => {
    const response = await node_fetch_1.default('https://api.github.com/graphql', {
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
    ref.set(data);
    return 0;
});
//# sourceMappingURL=index.js.map