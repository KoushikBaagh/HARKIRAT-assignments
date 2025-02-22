// function setTimeoutPromisified(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// setTimeoutPromisified(1000).then(function () {
//   console.log("hi");
//   setTimeoutPromisified(3000).then(function () {
//     console.log("hello");
//     setTimeoutPromisified(5000).then(function () {
//       console.log("hello there");
//     });
//   });
// });

/*
Promisified verison of setTimeout() start 


setTimeoutPromisified(3000).then(callback);
function setTimeoutPromisified(ms) {
  const pr = new Promise(function (resolve) {
    setTimeout(resolve, ms);
  });

  return pr;
}
function callback() {
  console.log("3 seconds have passed");
}


Promisified verison of setTimeout() END 
*/
///////////////////////////////////////////////////////////////
/*
Promisified verison of fetch() start 
*/

fetchPromisified("https://jsonplaceholder.typicode.com/todos/1")
  .then(response)
  .catch(error);

function fetchPromisified(url) {
  return new Promise(function (resolve, reject) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
}

function response(data) {
  console.log("URL Fetched", data);
}

function error(err) {
  console.error(err.message);
}
/*
Promisified verison of fetch() END 
*/

/*
Promisified verison of read() start 
*/




/*
Promisified verison of read() END 
*/
