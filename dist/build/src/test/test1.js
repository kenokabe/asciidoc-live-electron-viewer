import { T, now } from "../modules/timeline-monad";
const log = (a) => {
    console.log(a);
    return a;
};
const test_timeline_monad = () => {
    log("=========================");
    log("test_timeline_monad  ========= ");
    {
        const a = T();
        a[now] = 9;
        console.log(a[now]);
    }
    //
    {
        const timerTL = T((timeline) => {
            const f = () => { timeline[now] = "1 second"; };
            setTimeout(f, 1000);
        });
        const nouseTL = timerTL.sync(log);
    }
    //---------------------------------
    /*
    {
      const fs = require("fs");
  
      const initTL = T();
  
      const fileRead = (dataTL: any) => {
  
        fs.readFile("package.json", "utf8",
          (err: any, text: string) => {
            dataTL[now] = text;
          });
  
        return initTL;
      };
  
      const print = (initTL: any) => {
        console.log("====================================");
        dataTL.sync(log);
  
        return initTL;
      };
  
      const tl = initTL
        .sync(fileRead)
        .sync(print);
  
      const dataTL = T();
      initTL[now] = dataTL;
    }
  
    //===========================
  */
    log("timeline");
    {
        const m = T();
        const f = (a) => a * 2;
        log(f(5)); //10
        //left
        m
            .sync(f)
            .sync(log); //10
        //right
        m.sync((a) => {
            const tl = T();
            tl[now] = a;
            return tl;
        })
            .sync(log); //5 on  m[now] = 5;
        //Associativity
        m
            .sync(f)
            .sync(log);
        const m1 = T((timeline) => m.sync((a) => timeline[now] = a));
        m1
            .sync(f)
            .sync(log);
        m[now] = 5;
    }
    //
    //
    console.log("double-check");
    {
        const f = (m) => m.sync((a) => a * 2);
        const a = T();
        const aa = T();
        const bb = aa.sync(f);
        const nouseTL = bb.sync(log);
        aa[now] = a;
        a[now] = 7;
    }
};
/*
{//----------------------------------------
 
  const allTL = (...TLs: any[]) => {
    const resultTL = T();
    const updateFlagTLs = TLs.map(
      (TL: any) => {
        const flagTL = T();
        flagTL[now] = 0;
        TL.sync(() => (flagTL[now] = 1) && updateCheck());
        return flagTL;
      }
    );
    const updateCheck = () => {
      const dummy = (updateFlagTLs
        .map((flagTL: any) => flagTL[now])
        .reduce((a: number, b: number) => (a * b))
        === 1) //all  updated
        ? resultTL[now] = TLs.map(TL => TL[now])
        : true;
    };
    return resultTL;
  };
  //-----------------------------------
  const a = T();
  const b = T();
  const ab = allTL(a, b);
  ab.sync(log);
 
  a[now] = 1;
  b[now] = 2;
 
}//-------------------------------------
 
*/
export { test_timeline_monad };
