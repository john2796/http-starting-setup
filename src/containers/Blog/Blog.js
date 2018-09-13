import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "axios";

class Blog extends Component {
  state = {
    posts: []
  };

  //fetch to api server
  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      //once data is ready
      .then(response => {
        // to render 4 post only
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        console.log(response);
      });
  }

  render() {
    const posts = this.state.posts.map((post, index) => {
      return <Post key={post.id} post={post} />;
    });

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
