const btn = document.getElementById("btn");

const inp = document.getElementById("inp");

const list = document.getElementById("list");

function addTodo() {
  const value = inp.value; /// got teh value from the text field
  const item = document.createElement("li"); // created a new list item
  const newContent = document.createTextNode(value); // created a new content
  item.appendChild(newContent);
  list.appendChild(item);
  inp.value = "";
}

btn.onclick = addTodo;
