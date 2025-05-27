import React from "react";
import NotificationComponent from "./NotificationComponent";
import PostCard from "./PostCard";
import PostComponent from "./PostComponent";
import StateComponents from "./StateComponent";
import ProblematicComponent from "./ProblematicComponent";

function App() {
  // const [count, setCount] = useState(0);
  const numbers = [1, 2, 3, 4, 5];
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, info) {
      console.error("Error caught:", error, info);
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children;
    }
  }

  return (
    <>
      <>
        <div>
          <PostCard
            name="Harkirat Singh"
            imageURL="https://koushikbaagh.github.io/static/media/LinkedIN%20Headshot.07326bed.jpg"
            subtitle="Working with WebRTC"
            profileviewers="41,903"
            postimpressions="1312"
          />
          <br />
          <StateComponents />
          <br />
          <PostComponent
            name="John Doe"
            subtitle="Working with WebRTC"
            image="https://appx-wsb-gcp-mcdn.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg"
            description="This is a sample post description. It demonstrates the PostComponent in action."
            time="2 hours ago"
          />
          {/* <NotificationComponent /> */}
          <ErrorBoundary>
            {/* This is how you would demonstrate an error boundary */}
            {/* throw new Error("Error while rendering"); */}
            <ProblematicComponent />
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ErrorBoundary>
        </div>
      </>
    </>
  );
}

export default App;
