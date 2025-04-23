import express from "express";
import cors from "cors";
import path from "path";

const app = express();

app.use(express.static("public"));
app.use(cors());

const _dirname = import.meta.dirname;
const filepath = path.join(_dirname, "/todos.json");

async function readFile() {
  try {
    const data = await fs.readfile(filepath, "utf-8");
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

app.listen(4000);
