import React, { useState, useEffect } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modals/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/Loader";
import { useLoading } from "./hooks/useLoader";

function App() {
  const [posts, setPosts] = useState([]);

  const [filter, setFilter] = useState({ sort: "", query: "" });

  const [modal, setModal] = useState(false);

  // const [isPostsLoading, setIsPostsLoading] = useState(false);

  const [fetchPosts, isPostsLoading, postsError] = useLoading(async () => {
    const posts = await PostService.getAll();
    setPosts(posts);
  });

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  useEffect(() => {
    fetchPosts();
  }, []);

  /* async function fetchPosts() {
    setIsPostsLoading(true);
    const posts = await PostService.getAll();
    setPosts(posts);

    setIsPostsLoading(false);
  }*/

  const createPost = (newPost) => {
    if (newPost.title && newPost.body) {
      setPosts([...posts, newPost]);
      setModal(false);
    }
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Add post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {isPostsLoading ? (
        <Loader />
      ) : (
        <PostList
          posts={sortedAndSearchedPosts}
          title="Post List"
          remove={removePost}
        />
      )}
    </div>
  );
}

export default App;
