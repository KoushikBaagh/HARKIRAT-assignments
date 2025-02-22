// // Create a new Date object for the current date and time
// var now = new Date();

// // Get the current date
// var date = now.toLocaleDateString(); // e.g., "08/27/2024"

// // Get the current time
// var time = now.toLocaleTimeString(); // e.g., "10:35:45 AM"
// var time = now.toLocaleTimeString("en-US", { hour12: false });

// // Get the current day of the week
// var dayOfWeek = now.toLocaleDateString("en-US", { weekday: "long" }); // e.g., "Tuesday"

// // Display the results
// console.log("Date: " + date); // Date: 08/27/2024
// console.log("Time: " + time); // Time: 10:35:45 AM
// console.log("Day of the Week: " + dayOfWeek); // Day of the Week: Tuesday



const today = new Date();
const time = today.toLocaleTimeString("en-US", { hour12: false });

if (time >= "00:00:00" && time <= "12:00:00") {
  document.querySelector(".heading").style.color = "red";
} else if (time > "12:00:00" && time <= "18:00:00") {
  document.querySelector(".heading").style.color = "green";
} else {
  document.querySelector(".heading").style.color = "blue";
}

ReactDOM.render(
    <div>
        <h1 className="heading">Hello World !</h1>

        <p>
            Hi, My name is {name}... and the today date is{" "}
            {date.getDate() + " " + months[date.getMonth()]} and year is {yr}
        </p>
    </div>,

    document.getElementById("root");