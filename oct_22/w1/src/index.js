console.log("Start");

setTimeout(() => {
  console.log("ZERO");
}, 0);

setImmediate(() => {
  console.log("Immediate");
});

setTimeout(() => {
  console.log("5 timeout");
}, 5);

setTimeout(() => {
  console.log("100 Timeout");
}, 100);

console.log("End");
