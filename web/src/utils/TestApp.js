import React from 'react';
import serverAPI from './serverAPI';

export default class TestApp extends React.Component {
  constructor(props){
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.createPost = this.createPost.bind(this);
    this.onPostCreated = this.onPostCreated.bind(this);

    serverAPI.registerUpdateListener(this.onUpdate);
  }

  onUpdate(data) {
    console.log("TestApp:onUpdate: ", data);
  }

  createPost() {
    console.log("TestApp:createPost");

    const text = "some text";
    const pic = "a pic";

    serverAPI.postCreate(text, pic, this.onPostCreated);
  }

  onPostCreated(data) {
    console.log("TestApp:onPostCreated: ", data);
  }

  render() {
    return (
      <div>
        <span> For Test </span>
        <button onClick={serverAPI.triggerUpdate}> update </button>
        <button onClick={this.createPost}> create </button>
      </div>
    );
  }
}