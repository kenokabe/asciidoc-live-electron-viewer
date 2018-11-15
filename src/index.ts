/// <reference types="socket.io" />
const io = require('socket.io')();
import { T, now } from "./modules/timeline-monad";
import { Socket } from "socket.io";

import { render } from "./render";
import { save } from "./save";

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

  io
    .on('connection', (client: Socket) => {
      consoleTL[now] = ('a user connected');

      client
        .on('event', (data: data) => {
          dataTL[now] = data;
          render(dataTL)(baseOption);
        });

      client
        .on('save', (f: Function) => {
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