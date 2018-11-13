/// <reference types="socket.io" />
const io = require('socket.io')();
import { T, now } from "./modules/timeline-monad";
import { Socket } from "socket.io";

interface timeline {
  type: string,
  [now: string]: unknown,
  sync: Function

}
const consoleTL = ((console) => T(
  (self: timeline) => self.sync((a: undefined) => {
    console.log(a);
    return a;
  })
))(console);
const log = (a: undefined) => (consoleTL[now] = a);

consoleTL[now] = ("index.ts!!!!!!");

io
  .on('connection', (client: Socket) => {
    consoleTL[now] = ('a user connected');
    client
      .on('event', (data: object) => {
        consoleTL[now] = data;

      });
    client
      .on('disconnect', () => {
        consoleTL[now] = ('a user disconnected');
      });
  });

io.listen(3999);

