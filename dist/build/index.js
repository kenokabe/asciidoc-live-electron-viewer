/// <reference types="socket.io" />
const io = require('socket.io')();
import { T, now } from "./modules/timeline-monad";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
consoleTL[now] = ("index.ts!!!!!!");
io
    .on('connection', (client) => {
    consoleTL[now] = ('a user connected');
    client
        .on('event', (data) => {
        consoleTL[now] = data;
    });
    client
        .on('disconnect', () => {
        consoleTL[now] = ('a user disconnected');
    });
});
io.listen(3999);
