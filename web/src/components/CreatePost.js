import React from 'react';
import CreateHeader from './CreateHeader';
import ImageUpload from '../components/ImageUpload';

export default class CreatePost extends React.Component{
    constructor(props){
        super(props);
        this.handleCreatePost=this.handleCreatePost.bind(this);
    }
    
    handleCreatePost = (e) => {
        e.preventDefault();
        
        const post = e.target.elements.content.value.trim();
        console.log({post});
        // this.setState((prevState) => ({
        //     comments: prevState.comments.concat(comment)
        //   }));

        e.target.elements.content.value = '';
    };

    render(){
        return(
            <div className="container">
                <CreateHeader/>
                <form onSubmit={this.handleCreatePost} className="form-group">
                    <input type="text" name="content"/>
                    <ImageUpload/>
                    <button className="btn btn-primary">Post</button>
                </form>
            </div>
        );
    }
}