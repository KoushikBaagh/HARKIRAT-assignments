let i = 0;
function button() {
  const element = document.querySelector("input");
  const todoText = element.value;
  if (todoText != "") {
    const newList = document.getElementById("todoList");

    const listItem = document.createElement("li"); // creates a <li> item
    listItem.id = "todo-" + i;
    // console.log(listItem.id);
    i = i + 1;

    const newContent = document.createTextNode(todoText + "  ");
    listItem.appendChild(newContent);

    const delBtn = document.createElement("button");

    delBtn.onclick = function () {
      deleteTodo(listItem.id);
    };
    listItem.appendChild(delBtn);
    delBtn.appendChild(document.createTextNode("Delete"));
    newList.appendChild(listItem);
    listItem.id = "todo-" + i;
    // console.log(listItem.id);
    i = i + 1;
    element.value = "";

    function deleteTodo(id) {
      const element = document.getElementById(id);
      element.parentNode.removeChild(element);
    }
  }
}

/*************************************** */

// function button() {
//   let text = document.getElementById("inp").value;

//   if (text != null) {
//     let node = document.getElementById("todoList");
//     const listItem = document.createElement("li");
//     let delbutton = document.createElement("BUTTON");
//     let textnode = document.createTextNode("Delete");
//     // appending text to button
//     delbutton.append(textnode);
//     node.append(text + "  " + delbutton);
//   }
// }
