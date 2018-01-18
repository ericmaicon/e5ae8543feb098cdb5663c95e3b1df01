const request = require('request');

const generateOauthHeader = require('./generateOauthHeader');

module.exports = (accessToken) => {
  return new Promise((resolve, reject) => {
    if (!accessToken) {
      reject('You need to pass the access_token param.');
      return;
    }

    const url = 'https://api.twitter.com/oauth2/invalidate_token';
    const method = 'post';
    const formData = {
      access_token: accessToken
    };
    const authorizationHeader = generateOauthHeader(url, method, {}, formData);

    request({
      url,
      method,
      headers: {
        Authorization: authorizationHeader,
      },
      qs: formData
    }, (error, response, body) => {
      console.log(body);
      if (!error && response.statusCode == 200) {
        resolve(body);
      } else {
        const parsedBody = JSON.parse(body);
        reject(parsedBody.errors);
      }
    });
  });
};
