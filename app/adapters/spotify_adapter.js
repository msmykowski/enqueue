const Spotify = require('spotify-web-api-node');
// const {clientId, clientSecret} = require('../../secrets');
const clientId = '413e6d72a7c345938f57a5204d8c1e24';
const clientSecret = '28e21c072b89481abd69817f0f94fd84';

function getCredentials() {
  return {
    clientId : clientId,
    clientSecret : clientSecret
  };
}

function setAccessToken(client) {
  client.clientCredentialsGrant().then(data => client.setAccessToken(data.body.access_token));
}

module.exports = {
  createClient() {
    const client = new Spotify(getCredentials());
    // setAccessToken(client);
    return client;
  }
};
