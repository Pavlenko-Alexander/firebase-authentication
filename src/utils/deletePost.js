import { url } from "../constants";

export async function deletePost(id) {
    const res = await fetch(
      `${url}/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      },
    );
    if (!res.ok) {
      throw new Error(`Delete post error: ${res.status}, ${res.statusText}`);
    }
  }