import { useQuery } from "@tanstack/react-query";
import { url } from "../../constants";

async function getUsers(url) {
    const res = await fetch(`${url}/users`);
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await res.json();
    return data;
  }
  
  export function useGetUsers() {
    return useQuery({
      queryKey: ["getUsers", url],
      queryFn: () => getUsers(url),
    });
  }