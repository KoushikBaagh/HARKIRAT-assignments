// import express from "express";
// import fs from "fs";
// import path from "path";
// import todos from "../todos.json";
// const app = express();
// const filePath = path.join(__dirname, "..", "todos.json");
// app.use(express.json());

// app.post("/create-todo", (req, res) => {
//   todos.push(req.body);
//   fs.writeFile(filePath, JSON.stringify(todos), (err) => {
//     if (err) throw err;
//   });
//   res.send("Todo printed in todos.json");
// });

// app.put("/update-todo/:id", (req, res) => {
//   const id = Number(req.params.id);
//   fs.readFile(filePath, (err, data) => {
//     if (err != null) res.status(500);
//     const contentArray = JSON.parse(data.toString());
//     const index = contentArray.findIndex((todo: any) => todo.id == id);
//     if (index === -1) {
//       res.status(404);
//       return;
//     }
//     contentArray[index].task = req.body.task;
//     contentArray[index].done = req.body.done;
//     fs.writeFile(filePath, JSON.stringify(contentArray), (err) => {
//       if (err) res.status(500);
//       else res.send("Successfully wrote to todos.json");
//     });
//   });

//   // console.log(is_Found);
// });

// app.delete("/delete-todo/:id", (req, res) => {
//   const id = Number(req.params.id);
//   // console.log(id);
//   fs.readFile(filePath, (err, data) => {
//     if (err != null) {
//       res.status(500);
//     }
//     const contentArray = JSON.parse(data.toString());
//     // console.log("Original todos array:", contentArray);
//     // const updatedContentArray = delete contentArray[id - 1]; // using delete() method. But delet() returns NULL
//     const updatedContentArray = contentArray.filter(
//       (todos: any) => todos.id != id
//     );
//     // console.log("Updated todos array:", updatedContentArray);
//     fs.writeFile(filePath, JSON.stringify(updatedContentArray), (err) => {
//       if (err) res.status(500);
//       else res.send("Successfully wrote to todos.json");
//     });
//   });
// });

// app.get("/get-todo", (req, res) => {
//   fs.readFile(filePath, (err, data) => {
//     if (err) throw err;
//     const contentArray = JSON.parse(data.toString());
//     res.send(contentArray);
//   });
// });

// app.listen(3000, () => {
//   console.log("Sever listening Koushik");
// });
/**************************************************************************/
import express from "express";
import fs from "fs/promises";
import path from "path";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

const __dirname = import.meta.dirname;
const filePath = path.join(__dirname, "todos.json");
console.log(`File path is in: ${filePath}`); // For debugging

async function readFile() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const todos = JSON.parse(data);
    console.log(todos);
    return todos;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

async function writeFile(todos) {
  try {
    await fs.writeFile(filePath, JSON.stringify(todos), "utf8");
    console.log("Successfully wrote to todos.json");
  } catch (err) {
    console.error("Error writing to file:", err);
    throw err;
  }
}

app.get("/todos", async (req, res) => {
  try {
    const todos = await readFile();
    res.send(todos);
  } catch (err) {
    res.status(500).send("Error reading todos");
  }
});

app.post("/create-todo", async (req, res) => {
  try {
    const todos = await readFile();
    todos.push(req.body);
    await writeFile(todos);
    res.send("Todos created successfully");
  } catch (err) {
    res.status(500).send("Error! Cannot create todos");
  }
});

app.put("/delete-todo", async (req, res) => {
  try {
    const data = await readFile();
    const idToDelete = req.body.id;
    // Find if the todo exists
    const is_present = data.findIndex((todos) => todos.id == idToDelete);
    if (is_present == -1) {
      // If todo with the given id is not found
      return res.send("Todo not found");
    }
    const todos = data.filter((todos) => todos.id != idToDelete);
    await writeFile(todos);
    res.send("Deleted todos");
  } catch (err) {
    res.send("Error! Cannot update todos");
  }
});

app.listen(3000);
