/// <reference types="ws" />
import { T, now } from "./modules/timeline-monad";

import { render } from "./render";
import { save } from "./save";
import { Socket } from "net";
import { SocketType } from "dgram";

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

  const WebSocket = require('ws');

  const server = new WebSocket.Server({ port: 3999 });

  server
    .on('connection',
      (client: any) => {//type?
        consoleTL[now] = ('a user connected');

        client.send({});

        interface msg {
          cmd: string;
          data: any;
        }

        client
          .on('message', (msg: msg) =>
            msg.cmd === "event"
              ? ((data: data) => {
                dataTL[now] = data;
                render(dataTL)(baseOption);
              })(msg.data)
              : msg.cmd === "save"
                ? ((f: Function) => {
                  save(dataTL)(baseOption)(f);
                })(msg.data)
                : undefined
          );

        client
          .on('close', () => {
            consoleTL[now] = ('a user disconnected');
          });
      });
};

socketManager();