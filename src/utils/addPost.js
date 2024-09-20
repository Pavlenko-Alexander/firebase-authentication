import { url } from "../constants";

export async function addPost(title, body, userId) {
    const res = await fetch(`${url}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, body, userId })
    });
    if (!res.ok) {
      throw new Error(`Add post error: ${res.status}, ${res.statusText}`);
    }
  }