const fetch = require('node-fetch');
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

// Fetch repository information from GitHub
exports.GitHubToDB = functions.pubsub.schedule('*/30 * * * *')
  .timeZone('America/New_York').onRun(async (context) => {
  const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
        'Authorization': `bearer ${functions.config().github.token}`
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
  console.log(data);

  const res = admin.firestore().collection('GitHubAPI').doc('EcLVxMbaEJQXhChJwNUw').set({data});

  console.log(res);

  return null;
});
