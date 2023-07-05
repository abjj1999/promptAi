"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
// import PromptCardList from "./PromptCardList";

const PromptCardList = ({ data, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {data.map((post, index) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);



const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {};
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      // console.log(data);
      setPosts(data);
    }
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form action="" className="relative w-full flex-center">
        <input
          type="text"
          className="
            search_input peer
          "
          placeholder="Search for a tag"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList
        data = {posts}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;
