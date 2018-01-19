# Simple twitter API integration using Koa + React

This is a simple twitter API integration software.

# API 

The API uses:

* Koa

## Instalation

~~~sh
cd api/
yarn install
touch .env
~~~

your `.env` should be something like:

~~~
TWITTER_CONSUMER_KEY=123
TWITTER_SECRET_KEY=123
~~~

Check your consumer and secret key on [apps.twitter.com](apps.twitter.com).

## Usage

To start the server, you should run:

~~~sh
yarn start
~~~

After that, you may access using the following url: [http://localhost:8081](http://localhost:8081)

## Test:

~~~sh
yarn test
~~~

# Single page application (SPA)

The SPA uses:

* React
* Redux
* Redux Saga
* Bootstrap

## Installation

~~~sh
cd spa/
yarn install
touch config.js
~~~

your `config.js` should be something like:

~~~js
module.exports = {
  API_URL: 'http://localhost:8081',
};
~~~

## Usage

To run the application, you should run:

~~~sh
yarn start
~~~

After that, you may access using the following url: [http://localhost:8080](http://localhost:8080)

## Test:

~~~sh
yarn test
~~~