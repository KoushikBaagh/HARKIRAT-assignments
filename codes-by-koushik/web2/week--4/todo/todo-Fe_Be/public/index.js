document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("/todos")
    .then((response) => {
      const todos = response.data;
      todos.forEach((element) => {
        const newItem = document.createElement("li");
        newItem.textContent = element.title;
        const newButton = document.createElement("button");
        newButton.innerHTML = "Delete Todo";
        document.getElementById("ol").appendChild(newItem);
        newItem.appendChild(newButton);
        newButton.onclick = () => {
          document.getElementById("ol").removeChild(newItem);
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
      document.getElementById("ol").appendChild(newItem);
      const newButton = document.createElement("button");
      newButton.innerHTML = "Delete Todo";
      newItem.appendChild(newButton);
      document.getElementById("ol").appendChild(newItem);
      document.getElementById("inp").value = "";
      // This onclickk is wrong
      newButton.onclick = () => {
        document.getElementById("ol").removeChild(newItem);
      };
    })
    .catch((error) => {
      console.error("Error creating todo:", error);
      alert(
        "Failed to create todo. Please check the server connection and logs."
      );
    });
}
