const express = require("express");

const app = express();
// function thst returns a boolesn if the age is 14.
function check_age(age) {
  if (age >= 14) {
    return true;
  } else return false;
}

app.get("/ride1", function (req, res) {
  if (check_age(req.query.age) === true) {
    res.json({
      msg: "You have successfully booked ride1",
    });
  } else {
    res.status(411).json({
      msg: "You are not eligible",
    });
  }
});

app.listen(3000);
