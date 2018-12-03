//the timeline property `now` means
//time-index of the current time
// on the timeline from now until the future / next - now
const right = (a) => (b) => b;
const Events = () => ((observers) => ({
    register: (f) => (observers[observers.length] = f),
    trigger: (val) => right(observers.map((f) => f(val)))(val)
}))([]);
const T = ((Events) => (timeFunction = () => { }) => {
    //immutable in the frozen universe
    let currentVal = undefined;
    const timeline = ((ev) => ({
        type: "timeline-monad",
        get now() {
            return currentVal;
        },
        set now(val) {
            currentVal = val;
            (currentVal === undefined)
                ? undefined
                : ev.trigger(currentVal);
        },
        sync: ((ev) => (f) => {
            const syncTL = T();
            const todo = (val) => {
                const newVal = f(val);
                // RightIdentity: join = TTX => TX  
                return (newVal !== undefined) &&
                    (newVal.type === timeline.type)
                    ? newVal.sync((val) => syncTL.now = val)
                    : syncTL.now = newVal;
            };
            ev.register(todo);
            timeline.now = timeline.now;
            return syncTL;
        })(ev)
    }))(Events());
    timeFunction(timeline);
    return timeline;
})(Events);
export { T };
