import { useEffect, useState } from "react";

export function useFetch() {
  const [post, setPost] = useState(0);
  async function getPosts() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    const json = await response.json();
    setPost(json);
  }
  useEffect(() => {
    getPosts();
  });
  return post.title;
}
