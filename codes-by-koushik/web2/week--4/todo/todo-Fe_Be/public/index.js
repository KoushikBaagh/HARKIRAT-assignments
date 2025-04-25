const API_URL = "http://localhost:4000/";
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(API_URL + "todos")
    .then((response) => {
      const todos = response.data;
      todos.forEach((element) => {
        const newItem = document.createElement("li");
        newItem.textContent = element.title;
        const newButton = document.createElement("button");
        newButton.textContent = "Delete Todo";
        document.getElementById("ol").appendChild(newItem);
        newItem.appendChild(newButton);
        newButton.onclick = () => {
          deleteTodo(element.id, newItem);
        };
      });
    })
    .catch((error) => {
      // handle error
      console.log(error);
    });
});

// Reusable function to delete a todo
function deleteTodo(todoId, listItem) {
  axios
    .delete(API_URL + "delete-todo/" + todoId)
    .then((response) => {
      if (response.data.success) {
        document.getElementById("ol").removeChild(listItem);
      } else {
        alert("Failed to delete todo from server");
      }
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
      alert(
        "Failed to delete todo. Please check the server connection and logs."
      );
    });
}

function submit_todo() {
  const text = document.getElementById("inp").value;

  if (text === "") {
    alert("Please enter a todo item");
    return;
  }

  axios
    .post(API_URL + "create-todo", { title: text })
    .then((response) => {
      const newItem = document.createElement("li");
      newItem.textContent = text;
      document.getElementById("ol").appendChild(newItem);
      const newButton = document.createElement("button");
      newButton.innerHTML = "Delete Todo";
      newItem.appendChild(newButton);
      document.getElementById("inp").value = "";

      // Store the todo id from the server response
      const todoId = response.data.id;
      // Use the deleteTodo function for new items too
      newButton.onclick = () => {
        deleteTodo(todoId, newItem);
      };
    })
    .catch((error) => {
      console.error("Error creating todo:", error);
      alert(
        "Failed to create todo. Please check the server connection and logs."
      );
    });
}
