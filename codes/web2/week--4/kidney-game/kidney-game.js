const express = require("express");
const app = express();

const Users = [
  {
    name: "John",
    kidneys: [{ health: false }],
  },
  {
    name: "Jane",
    kidneys: [{ health: true }],
  },
  {
    name: "Alice",
    kidneys: [{ health: true }, { health: true }],
  },
  {
    name: "Bob",
    kidneys: [{ health: false }],
  },
  {
    name: "Koushik",
    kidneys: [{ health: true }],
  },
];

const userKidneys = Users[4].kidneys; /// find the kidneys that you want to work

app.get("/", function (req, res) {
  // code starts here
  // GOAL : User needs to check, how many kidneys he have and what is their health
  const noOfKidneys = Users[4].kidneys.length;
  //// try to use res.send() beacuse it will display the result on the webpage
  // res.send({ noOfKidneys, userKidneys, healthyKidneys });
  res.send({ noOfKidneys, userKidneys });
});

app.post("/", function (req, res) {
  Users[4].kidneys.push({ health: false });
  res.send("Kidney added to user Koushik");
});

app.put("/", function (req, res) {
  for (let i = 0; i < Users[4].kidneys.length; i++) {
    Users[4].kidneys[i].health = true;
  }
  res.json({});
});

app.delete("/", function (req, res) {
  ///// this must delete all false kidneys
  function isTrue(x) {
    return x.health === true;
  }

  const userKidneys = Users[4].kidneys;
  const healthyKidneys = userKidneys.filter(isTrue);

  ///// IMPORTANT STEP Update the user's kidneys array with only healthy kidneys
  Users[4].kidneys = healthyKidneys;

  // Send the updated kidneys as a response
  res.json(Users[4].kidneys);
});
app.listen(3000);
