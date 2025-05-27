import React, { useEffect, useState } from "react";

const NotificationComponent = () => {
  let [notificationUpdate, setNotificationUpdate] = useState(0);
  const bellNotification = () => {
    setNotificationUpdate((notificationUpdate += 1));
    // console.log("re-rendering bell " + notificationUpdate + " times");
  };
  useEffect(() => {
    console.log("above set interval");
    setInterval(bellNotification, 1000);
    // console.log("The count has been updated to" + notificationUpdate);
  }, []);
  //   console.log("above set interval");
  //   setInterval(bellNotification, 1000);
  useEffect(() => {
    console.log("The count has been updated to " + notificationUpdate);
  }, [notificationUpdate]);
  console.log("The 2nd count has been updated to " + notificationUpdate);
  return (
    <>
      <div>
        <span
          style={{
            backgroundColor: "red",
            display: "inline-block", // imp
            height: 40, // imp
            width: 40, // imp
            lineHeight: "40px",
            textAlign: "center",
            borderRadius: "50%", // imp
            color: "white",
            fontSize: "16px",
          }}
        >
          {notificationUpdate}
        </span>
      </div>
      <div>
        <img
          src="https://cdn-icons-png.flaticon.com/128/3602/3602145.png"
          alt="Bell icon Image"
        />
        {/* <button onClick={bellNotification} style={{ cursor: "pointer" }}>
          Add new Notification
        </button> */}
      </div>
    </>
  );
};

export default NotificationComponent;
