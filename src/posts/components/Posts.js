import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MoonLoader from "react-spinners/MoonLoader";
import { useGetPosts } from "../hooks/usePosts";
import Post from "./Post";
import { addPost } from "../../utils/addPost";
import { deletePost } from "../../utils/deletePost";
import { editPost } from "../../utils/editPost";
import Form from "../../form/Form";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

function Posts() {
  const [openAddForm, setOpenAddForm] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { data, isLoading } = useGetPosts();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUser(user);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPosts(data);
  }, [data]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleAddPost = async (userId, id, title, body) => {
    await addPost(title, body, userId);
    setPosts(
      posts.concat([{ userId: userId, id: id, title: title, body: body }])
    );
  };

  const handleDeletePost = async (id) => {
    await deletePost(id);
    await setPosts(posts.filter((post) => post.id !== id));
  };

  const handleEditPost = async (newPost) => {
    await editPost(
      newPost.userId,
      newPost.id,
      newPost.newTitle,
      newPost.newBody
    );
    await setPosts(
      posts.map((post) => (post.id === newPost.id ? newPost : post))
    );
  };

  return (
    <>
      {user && (
        <div className="px-8">
          <p className="text-3xl text-center"> Kochanet </p>

          <div className="w-full flex justify-around md:justify-end py-6">
            <button
              className="flex w-24 md:w-32 mr-4 justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
              onClick={() => setOpenAddForm(true)}
            >
              Add Post
            </button>
            <button
              className="flex w-24 md:w-32 justify-center rounded-full bg-[#30CEAF] py-2 font-semibold text-[#09363F] hover:bg-[#72FFE3] active:bg-[#72FFE3]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>

          {isLoading ? (
            <div className="fixed z-10 flex min-h-lvh w-full items-center justify-center bg-[#0b3038]/40">
              <MoonLoader size={150} />
            </div>
          ) : (
            posts?.map((post) => (
              <Post
                {...post}
                handleDeletePost={handleDeletePost}
                handleEditPost={handleEditPost}
                key={post.id}
              />
            ))
          )}

          {openAddForm && (
            <Form
              closeForm={() => setOpenAddForm(false)}
              onSubmit={handleAddPost}
              postsLength={posts?.length}
            />
          )}
        </div>
      )}
    </>
  );
}

export default Posts;
