//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now
const T = (timeFunction = () => { }) => ((observers) => {
    const timeline = ((observers) => {
        let currentVal = undefined; //immutable in the frozen universe
        const self = {
            type: "timeline-monad",
            //type used for TTX => TX
            get now() {
                return currentVal;
            },
            set now(val) {
                currentVal = val; //set the val
                const nouse = (val === undefined)
                    ? undefined //undefined never triggers
                    : observers.map((f) => f(val)); //sync(f)
            },
            sync: ((observers) => (f) => {
                const timeline = self;
                //observe timeline[now]
                const observe = ((observers) => (f) => //
                 observers[observers.length] = f)(observers);
                const syncTL = T();
                const nouse = observe((a) => {
                    const newVal = f(a);
                    // RightIdentity: join = TTX => TX  
                    const nouse = (newVal !== undefined) &&
                        (newVal.type === timeline.type)
                        ? newVal.sync((a) => syncTL.now = a)
                        : syncTL.now = newVal;
                    return true;
                });
                // trigger if the timeline.now
                // is already filled 
                const nouse1 = (timeline.now === undefined)
                    ? undefined //if undefined, do nothing
                    : timeline.now = timeline.now;
                return syncTL;
            })(observers),
        };
        return self;
    })(observers);
    return ((timeline) => ({
        init: (timeFunction) => {
            const nouse = // timeFunction = (timeline) =>{...
             timeFunction(timeline); // timeline[now] = x;}
            return timeline; // finally, return the timeline
        }
    }))(timeline);
})([]) //observers = []
    .init(timeFunction); //initiate & return the timeline
export { T };
