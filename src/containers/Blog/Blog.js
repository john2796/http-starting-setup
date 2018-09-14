import React, { Component } from "react";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";
import axios from "../../axios";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false
  };

  //fetch to api server
  componentDidMount() {
    axios
      .get("/posts/")
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
      })
      //Catch Errors && Handling Errors
      .catch(error => {
        alert(error);
        this.setState({ error: true });
      });
  }
  //making post selectable to render on the screen
  postSelectedHandler = id => {
    this.setState({
      selectedPostId: id
    });
  };

  render() {
    let posts = <p>Something went Wrong !</p>;
    // Error Check, only display the error message if this.state.error is true , but if it does not equal to true render the post !
    if (this.state.error !== true) {
      posts = this.state.posts.map((post, index) => {
        return (
          <Post
            key={post.id}
            post={post}
            clicked={() => this.postSelectedHandler(post.id)}
          />
        );
      });
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
