// Summary on this Class Component
// - fetching data on update (without creating an infinite loops)
// - whenever you click an post it will render on the screen
// - using the 'id' props to identified if the post has the same id
// use a if check so it doesn't loop on requesting when selecting a post to render

import React, { Component } from "react";

import axios from "axios";
import "./FullPost.css";

class FullPost extends Component {
  state = { loadedPost: null };

  componentDidUpdate() {
    //this first check means dont return anything if the props is null only return if its true
    if (this.props.id) {
      // this check means if you don't have this.state.loaded or if you do have it but the id is different so it doesn't duplicate any posts then return axios LOL damn
      if (
        !this.state.loadedPost ||
        (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)
      ) {
        axios.get("/posts/" + this.props.id).then(response => {
          this.setState({ loadedPost: response.data });
        });
      }
    }
  }

  //delete Post
  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.id).then(response => {
      console.log(response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    // check means dont return anything if the props is null only return if its true
    if (this.props.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>
              Delete
            </button>
          </div>
        </div>
      );
    }

    return post;
  }
}

export default FullPost;
