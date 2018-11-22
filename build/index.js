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
    const net = require('net');
    const JsonSocket = require("json-socket-international");
    var port = 3999;
    var server = net.createServer();
    server
        .listen(port);
    server
        .on('connection', (socketTCP) => {
        const socket = new JsonSocket(socketTCP);
        consoleTL[now] = "VSCode client connected!";
        const ping = () => {
            socket.sendMessage({
                cmd: "ping",
                data: "Ping Succeeded! Viewer is ready."
            });
        };
        const renderDoneF = () => {
            socket.sendMessage({
                cmd: "renderDone",
                data: {}
            });
        };
        const savedF = (name) => {
            socket.sendMessage({
                cmd: "saved",
                data: name
            });
        };
        socket
            .on('message', (msg) => (msg.cmd === "ping")
            ? ping()
            : (msg.cmd === "render")
                ? (dataTL[now] = msg.data) &&
                    render(dataTL)(baseOption)(renderDoneF)
                : (msg.cmd === "save")
                    ? save(dataTL)(baseOption)(savedF)
                    : undefined);
        socket
            .on('close', () => {
            consoleTL[now] = "VSCode client disconnected...";
        });
    });
};
socketManager();
