import { useQuery } from "@tanstack/react-query";
import { url } from "../../constants";

async function getComments(url, postId) {
    const res = await fetch(`${url}/posts/${postId}/comments`);
    if (!res.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await res.json();
    return data;
  }
  
  export function useGetComments(postId) {
    return useQuery({
      queryKey: ["getComments", url, postId],
      queryFn: () => getComments(url, postId),
    });
  }