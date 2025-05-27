import { useState } from "react";
import PostComponent from "./PostComponent";

const StateComponents = () => {
  let [isNotificationUpdate, setisNotificationUpdate] = useState(0);
  const [Posts, setPosts] = useState([]);

  const mappedPosts = Posts.map((post) => (
    <PostComponent
      name={post.name}
      subtitle={post.subtitle}
      time={post.time}
      image={post.image}
      description={post.description}
    />
  ));

  const postFunction = () => {
    setPosts([
      ...Posts,
      {
        name: "John Doe",
        subtitle: "Working with WebRTC",
        image:
          "https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg",
        description:
          "This is a sample post description. It demonstrates the PostComponent in action.",
        time: "2 hours ago",
      },
    ]);
  };

  const buttonFunction = () => {
    setisNotificationUpdate((isNotificationUpdate += 1));
    console.log("Its, Re-rendering Koushik");
  };

  return (
    <>
      <div>
        <button onClick={buttonFunction}>Toggle Notification</button>
        {isNotificationUpdate}
      </div>
      <br />
      <div>
        <button onClick={postFunction}>Add Posts</button>
        {mappedPosts}
      </div>
    </>
  );
};
export default StateComponents;
