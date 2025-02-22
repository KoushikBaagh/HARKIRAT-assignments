import express from "express";
import fs, { readFile } from "fs";
import path from "path";
import todos from "../todos.json";
const app = express();
const filePath = path.join(__dirname, "..", "todos.json");
app.use(express.json());

app.post("/create-todo", (req, res) => {
  todos.push(req.body);
  fs.writeFile(filePath, JSON.stringify(todos), (err) => {
    if (err) throw err;
  });
  res.send("Todo printed in todos.json");
});

// app.put("/update-todo/:id", (req, res) => {
//   const id = req.params.id;
// });

app.delete("/delete-todo/:id", (req, res) => {
  const id = Number(req.params.id);
  // console.log(id);
  fs.readFile(filePath, (err, data) => {
    if (err != null) {
      res.status(500);
    }
    const contentArray = JSON.parse(data.toString());
    // console.log("Original todos array:", contentArray);
    // const updatedContentArray = delete contentArray[id - 1]; // using delete() method. But delet() returns NULL
    const updatedContentArray = contentArray.filter(
      (todos: any) => todos.id != id
    );
    // console.log("Updated todos array:", updatedContentArray);
    fs.writeFile(filePath, JSON.stringify(updatedContentArray), (err) => {
      if (err) res.status(500);
      else res.send("Successfully wrote to todos.json");
    });
  });
});

app.get("/get-todo", (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) throw err;
    const contentArray = JSON.parse(data.toString());
    res.send(contentArray);
  });
});

app.listen(3000, () => {
  console.log("Sever listening Koushik");
});
/************************************************ */
// import express from "express";
// import todos from "../todos.json"; // Ensure your tsconfig.json allows JSON imports

// const app = express();
// app.get("/get-todo", (req, res) => {
//   //
//   res.send(todos);
// });

// app.listen(3000, () => {
//   console.log("Sever listening Koushik");
// });
/************************************************ */
