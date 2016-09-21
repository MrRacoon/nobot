# NoBot

A small Irc bot to try out [node-irc][nodeirc] and [redux][redux] together.

## To run

You'll need to:

* Install dependencies
* Fill out a `config.js` file.
* Build
* Start

```bash
$ npm install

$ cat >> config.js << EOF
export const host = 'YOUR_IRC_SERVER_HOSTNAME';
export const nick = 'aReallyCoolNic';
export const channels = [
  'A_CHANNEL'
];
EOF

$ npm run build && npm run start
```

Then you should get a bot in your channel.

## Example conversation

```
< MrRacoon> nobot: load erik
-nobot:#RacoonCity- loading payload

< MrRacoon> nobot: fire
-nobot:#RacoonCity- firing for effect
< nobot> erik
-nobot:#RacoonCity- firing complete

< MrRacoon> nobot: fire
-nobot:#RacoonCity- need to reload
```

[redux]: https://github.com/reactjs/redux
[nodeirc]: https://github.com/martynsmith/node-irc
