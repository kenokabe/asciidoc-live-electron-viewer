/// <reference types="ws" />
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
    const WebSocket = require('ws');
    const server = new WebSocket.Server({ port: 3999 });
    server
        .on('connection', (client) => {
        consoleTL[now] = ('a user connected');
        client.send({});
        client
            .on('message', (msg) => msg.cmd === "event"
            ? ((data) => {
                dataTL[now] = data;
                render(dataTL)(baseOption);
            })(msg.data)
            : msg.cmd === "save"
                ? ((f) => {
                    save(dataTL)(baseOption)(f);
                })(msg.data)
                : undefined);
        client
            .on('close', () => {
            consoleTL[now] = ('a user disconnected');
        });
    });
};
socketManager();
