import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PostList from "./components/PostList";
import Create from "./pages/Create";
import PostPage from "./pages/PostPage";
import Update from "./pages/UpdatePost";
import { supabase } from "./supabase";

export default function App() {
  const [posts, setPosts] = useState([]);

  // LOAD POSTS FROM SUPABASE
  useEffect(() => {
    const loadPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setPosts(data);
    };

    loadPosts();
  }, []);


  // CREATE POST
  const addPost = async (title, content, imageUrl) => {
    const { data, error } = await supabase
      .from("posts")
      .insert([{ title, content, image_url: imageUrl }])
      .select();

    if (error) {
      console.error("Insert failed:", error);
      return;
    }

    if (Array.isArray(data) && data.length > 0) {
      setPosts(prev => [data[0], ...prev]);
    }
  };


  // UPDATE POST
  const updatePost = async (id, title, content, imageUrl) => {
    const { data, error } = await supabase
      .from("posts")
      .update({ title, content, image_url: imageUrl })
      .eq("id", id)
      .select();

    if (!error) {
      setPosts(prev =>
        prev.map(p => (p.id === id ? data[0] : p))
      );
    }
  };

  // DELETE POST
  const deletePost = async (id) => {
    await supabase.from("posts").delete().eq("id", id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  // UPVOTE POST
  const upvotePost = async (id, current) => {
    const { data } = await supabase
      .from("posts")
      .update({ upvotes: current + 1 })
      .eq("id", id)
      .select();

    setPosts(prev =>
      prev.map(p => (p.id === id ? data[0] : p))
    );
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PostList posts={posts} />} />
        <Route path="/create" element={<Create addPost={addPost} />} />
        <Route
          path="/post/:id"
          element={
            <PostPage
              posts={posts}
              deletePost={deletePost}
              upvotePost={upvotePost}
            />
          }
        />

        <Route
          path="/update/:id"
          element={<Update posts={posts} updatePost={updatePost} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
