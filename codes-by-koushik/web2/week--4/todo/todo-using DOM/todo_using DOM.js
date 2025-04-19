async function submit_todo() {
  try {
    const todo = document.getElementById("inp").value;
    const ol = document.getElementById("ol");
    const li = document.createElement("li");

    li.textContent = todo; // Never use text node. Why? See differnce between createTextNode and textContent

    const newButton = document.createElement("button");
    newButton.textContent = "Delete Todo";
    newButton.onclick = () => {
      ol.removeChild(li);
    };

    li.appendChild(newButton);
    ol.appendChild(li);
    document.getElementById("inp").value = ""; // resetting the bar to empty
  } catch (err) {
    console.error(err);
  }
}
