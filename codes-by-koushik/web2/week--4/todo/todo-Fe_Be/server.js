import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs/promises";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

const _dirname = import.meta.dirname;
const filepath = path.join(_dirname, "/todos.json");

async function readFile() {
  try {
    const data = await fs.readFile(filepath, "utf-8");
    const todos = JSON.parse(data);
    return todos;
  } catch (err) {
    throw err;
  }
}
async function writeFile(data) {
  try {
    await fs.writeFile(filepath, JSON.stringify(data), "utf-8");
  } catch (err) {
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
    // Reading existing todos before creating new ones preserves data
    // integrity, maintains the array structure, ensures unique IDs,
    // persists all user todos, and handles concurrent operations.
    const todos = await readFile();

    // Generate unique ID using timestamp
    const newTodo = {
      id: Date.now().toString(),
      title: req.body.title,
    };

    // Add new todo to the array
    todos.push(newTodo);

    // Write updated todos back to file
    await writeFile(todos);
    console.log("todos wrote successfully");

    // IMPORTANT: Sending a response is critical in HTTP communication -
    // without this line, the client will time out and show an error even
    // though the todo was saved successfully!
    res.status(200).send({ success: true });
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).send({ success: false });
  }
});

app.listen(4000);
