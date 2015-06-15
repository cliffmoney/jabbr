# jabber
> A Peer to Peer language learning app

## Team

  - __Product Owner__: Brandon Ellis
  - __Scrum Master__: Jeff Peoples
  - __Development Team Members__: Bill Kilmer, Angela Wang

## Usage

> This app is built with Angular.js on the front-end and Node.js/Express on the back-end. There are several major parts of this app:

1. Database: MongoDB (Mongoose ODM) - Jabbr stores user data on MongoDB, and uses the Mongoose ODM (think ORM for NoSQL) to provide an interaction between server code and MongoDB.

1. Socket.IO: Used for event system and text chat.

1. webRTC: Established client-to-client connection for audio/video chat.

## Requirements

- Node 0.12.x
- MongoDB 3.0.0

## Development

### Installing Dependencies

From within the project root:

```
npm install -g bower
npm install
bower install
```


### Getting started

To start MongoDB and serve the app, simply use

`grunt serve`

from the root directory.

### Roadmap

View the project roadmap [here](https://trello.com/b/h2Xwq7YW/cliffmoney).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.