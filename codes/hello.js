// setTimeout(function () {
//   console.log("Hi, 1 seconds");
//   setTimeout(function () {
//     console.log("Hello, 1+3 seconds");
//     setTimeout(function () {
//       console.log("Hi there 1+3+5 seconds");
//     }, 5000);
//   }, 3000);
// }, 1000);

function setTimeoutPromisifeid(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runDelays() {
  await setTimeoutPromisifeid(1000);
  console.log("Hi, 1 second");

  await setTimeoutPromisifeid(3000);
  console.log("Hello, 1+3 seconds");

  await setTimeoutPromisifeid(5000);
  console.log("Hi there 1+3+5 seconds");
}

runDelays();
