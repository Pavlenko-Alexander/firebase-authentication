import { useQuery } from "@tanstack/react-query";
import { url } from "../../constants";

async function getPosts(url) {
    const res = await fetch(`${url}/posts`);
    if (!res.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await res.json();
    return data;
  }
  
  export function useGetPosts() {
    return useQuery({
      queryKey: ["getPosts", url],
      queryFn: () => getPosts(url),
      refetchInterval: 60000,
    });
  }