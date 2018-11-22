
import { T, now } from "./modules/timeline-monad";

import { render } from "./render";
import { save } from "./save";
import { Socket } from "net";


interface timeline {
  type: string;
  [now: string]: any;
  sync: Function;
}
interface dir_name {
  dir: string;
  name: string;
}
interface data {
  text: string;
  dir_name: dir_name;
  line: number;
  lines: number;
}

const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: undefined) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: undefined) => (consoleTL[now] = a);

const dataTL = T();

const baseOption = {
  safe: 'unsafe',
  header_footer: true,
  attributes:
  {
    icons: 'font'
  }
};

const socketManager = () => {
  consoleTL[now] = ("index.ts!!!!!!");

  const net = require('net');
  const JsonSocket = require("json-socket-international");

  interface msg {
    cmd: string;
    data: any;
  }

  var port = 3999;
  var server = net.createServer();
  server
    .listen(port);
  server
    .on('connection',
      (socketTCP: Socket) => {
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
        const savedF = (name: string) => {
          socket.sendMessage({
            cmd: "saved",
            data: name
          });
        };

        socket
          .on('message',
            (msg: msg) =>
              (msg.cmd === "ping")
                ? ping()
                : (msg.cmd === "render")
                  ? (dataTL[now] = msg.data) &&
                  // save(dataTL)(baseOption)(savedF)
                  render(dataTL)(baseOption)(renderDoneF)
                  : (msg.cmd === "save")
                    ? save(dataTL)(baseOption)(savedF)
                    : undefined
          );

        socket
          .on('close',
            () => {
              consoleTL[now] = "VSCode client disconnected...";
            });
      });


}

socketManager();