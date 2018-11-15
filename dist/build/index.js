/// <reference types="socket.io" />
const io = require('socket.io')();
import { T, now } from "./modules/timeline-monad";
import { render } from "./render";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const socketManager = () => {
    consoleTL[now] = ("index.ts!!!!!!");
    io
        .on('connection', (client) => {
        consoleTL[now] = ('a user connected');
        client
            .on('event', (data) => (render(data)));
        client
            .on('save', (f) => f());
        client
            .on('disconnect', () => {
            consoleTL[now] = ('a user disconnected');
        });
    });
    io.listen(3999);
};
socketManager();
