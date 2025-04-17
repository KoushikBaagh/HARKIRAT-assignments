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
    delBtn.appendChild(document.createTextNode("Delete")); // add text inside delete button
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
/////////////////////////////// Another Method
// script = "";
// const button = () => {
//   const text = document.getElementById(".input").value;
//   // Create delete button
//   const deleteButton = document.createElement("button");
//   deleteButton.innerText = "Delete";
//   let newLI = document.createElement("li");
//   newLI.innerText = text;
//   document.getElementById(".ul").appendChild(newLI);
//   newLI.appendChild(document.createTextNode("  "));
//   newLI.appendChild(deleteButton);
//   document.getElementById(".input").value = "";
//   const deleteTodo = () => {
//     newLI.remove();
//   };
//   deleteButton.onclick = deleteTodo;
// };
