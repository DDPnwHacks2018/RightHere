import React from 'react';
import serverAPI from './serverAPI';

export default class TestApp extends React.Component {
  constructor(props) {
    super(props);

    this.onNewPost = this.onNewPost.bind(this);
    this.onNewReply = this.onNewReply.bind(this);

    this.createPost = this.createPost.bind(this);
    this.replyPost = this.replyPost.bind(this);
    this.getPosts = this.getPosts.bind(this);


    serverAPI.onNewPost(this.onNewPost);
    serverAPI.onNewReply(this.onNewReply);
  }

  onNewPost(data) {
    console.log("TestApp:onNewPost: ", data);
  }

  onNewReply(data) {
    console.log("TestApp:onNewReply: ", data);
  }

  getPosts() {
    console.log("TestApp:getPosts");

    serverAPI.getPosts((data) => {
      console.log("posts received: ", data);
    });
  }

  createPost() {
    console.log("TestApp:createPost");

    const text = "a post";
    serverAPI.createPost(text, (data) => {
      console.log("post created: ", data)
    });
  }

  replyPost() {
    console.log("TestApp:replyPost");

    const post_id = "1";
    const text = "a reply";
    serverAPI.replyPost(post_id, text, (data) => {
      console.log("post replied: ", data);
    });
  }

  render() {
    return (
      <div>
        <span> For Test </span>

        <button onClick={this.createPost}> createPost </button>
        <button onClick={this.replyPost}> replyPost </button>
        <button onClick={this.getPosts}> getPosts </button>
      </div>
    );
  }

}
