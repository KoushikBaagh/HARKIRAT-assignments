document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("/todos")
    .then((response) => {
      const todos = response.data;
      todos.forEach((element) => {
        const newItem = document.createElement("li");
        newItem.textContent = element.title;
        newItem.setAttribute("data-id", element.id);
        const newButton = document.createElement("button");
        newButton.innerHTML = "Delete Todo";
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
API_URL = "http://localhost:4000/";

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

      const newButton = document.createElement("button");
      newButton.innerHTML = "Delete Todo";
      newItem.appendChild(newButton);
      document.getElementById("ol").appendChild(newItem);
      document.getElementById("inp").value = "";

      // Update click handler to use the deleteTodo function
      newButton.onclick = () => {
        deleteTodo(newTodo.id, newItem);
      };
    })
    .catch((error) => {
      console.error("Error creating todo:", error);
      alert(
        "Failed to create todo. Please check the server connection and logs."
      );
    });
}

// Function to delete a todo
function deleteTodo(id, itemElement) {
  axios
    .delete(API_URL + "delete-todo/" + id)
    .then(() => {
      // Remove the item from the DOM only after successful deletion
      document.getElementById("ol").removeChild(itemElement);
    })
    .catch((error) => {
      console.error("Error deleting todo:", error);
      alert("Failed to delete todo. The item was not removed from the server.");
    });
}
