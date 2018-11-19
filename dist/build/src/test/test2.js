import { T, now } from "../modules/timeline-monad";
const log = (a) => {
    console.log(a);
    return a;
};
const test2 = () => {
    log("=========================");
    log("test allTL ========= ");
    const allTL = (TLs) => {
        const resultTL = T();
        const updateFlagTLs = TLs
            .map((TL) => {
            const flagTL = T();
            flagTL[now] = 0;
            TL.sync(() => (flagTL[now] = 1)
                && updateCheck());
            return flagTL;
        }); ////
        const updateCheck = () => (updateFlagTLs
            .map((flagTL) => flagTL[now])
            .reduce((a, b) => (a * b))
            === 1) //all  updated
            ? resultTL[now] = TLs.map(TL => TL[now])
            : true;
        return resultTL;
    };
    //-----------------------------------
    const a = T();
    const b = T();
    const ab = allTL([a, b]);
    ab.sync(log);
    a[now] = 1;
    b[now] = 2;
}; //-------------------------------------
export { test2 };
