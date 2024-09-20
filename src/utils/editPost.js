import { url } from "../constants";

export async function editPost(userId, id, title, body) {
    const res = await fetch(`${url}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, id, title, body })
    });
    if (!res.ok) {
      throw new Error(`Edit post error: ${res.status}, ${res.statusText}`);
    }
  }