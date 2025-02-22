function setTimeoutPromisified(duration) {
  return new Promise(function (resolve) {
    setTimeout(resolve, duration);
  });
}

function callback(duration) {
  if (duration == 1000) console.log("1 second has passed");
  if (duration == 4000) console.log("Hello");
  if (duration == 9000) console.log("there");
}

setTimeoutPromisified(1000).then(() => callback(1000));
setTimeoutPromisified(4000).then(() => callback(4000));
setTimeoutPromisified(9000).then(() => callback(9000));
