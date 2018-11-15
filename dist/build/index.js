/// <reference types="socket.io" />
const io = require('socket.io')();
import { T, now } from "./modules/timeline-monad";
import { render } from "./render";
import { save } from "./save";
const consoleTL = ((console) => T((self) => self.sync((a) => {
    console.log(a);
    return a;
})))(console);
const log = (a) => (consoleTL[now] = a);
const dataTL = T();
const baseOption = {
    safe: 'unsafe',
    header_footer: true,
    attributes: {
        icons: 'font'
    }
};
const socketManager = () => {
    consoleTL[now] = ("index.ts!!!!!!");
    io
        .on('connection', (client) => {
        consoleTL[now] = ('a user connected');
        client
            .on('event', (data) => {
            dataTL[now] = data;
            render(dataTL)(baseOption);
        });
        client
            .on('save', (f) => {
            save(dataTL)(baseOption)(f);
        });
        client
            .on('disconnect', () => {
            consoleTL[now] = ('a user disconnected');
        });
    });
    io.listen(3999);
};
socketManager();
