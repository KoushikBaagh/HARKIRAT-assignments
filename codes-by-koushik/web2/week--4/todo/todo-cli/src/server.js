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

app.put("/update-todo/:id", async (req, res) => {
  try {
    const data = await readFile();
    const idToUpdate = parseInt(req.params.id);
    const is_present = data.findIndex((todo) => todo.id == idToUpdate);
    if (is_present == -1) {
      // If todo with the given id is not found
      return res.send("Todo not found");
    } else {
      const todos = data.filter((todos) => todos.id != idToUpdate);
      todos.push(req.body);
      function comparefn(a, b) {
        return a.id - b.id;
      }
      todos.sort(comparefn);
      await writeFile(todos);
      res.send("Todo updated successfully");
    }
  } catch (err) {
    res.send("Error! Cannot update todos");
  }
});
app.listen(4000);
