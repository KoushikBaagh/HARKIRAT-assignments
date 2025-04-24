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

function submit_todo() {
  const text = document.getElementById("inp").value;
  const newItem = document.createElement("li");
  newItem.textContent = text;
  const newButton = document.createElement("button");
  newButton.innerHTML = "Delete Todo";
  document.getElementById("ol").appendChild(newItem);
  newItem.appendChild(newButton);
  document.getElementById("inp").value = "";

  newButton.onclick = delete_todo = () => {
    document.getElementById("ol").removeChild(newItem);
  };
}
