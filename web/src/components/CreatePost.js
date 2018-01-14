import React from 'react';

export default class CreatePost extends React.Component{
    constructor(props){
        super(props);
        //this.handleCreatePost=this.handleCreatePost.b
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.handleCreatePost}>
                    <input type="text" name="post" />
                    <button className="btn btn-primary">Upload Picture</button>
                    <button className="btn btn-primary">Take Picture</button>
                    <button className="btn btn-primary">Post</button>
                </form>
            </div>
        );
    }
}