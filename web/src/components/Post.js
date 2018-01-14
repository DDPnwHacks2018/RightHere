import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Comments from './Comments';

export default class Post extends React.Component{
    constructor(props){
        super(props);
        this.state={
            time: '2:30',
            distance:'2km',
            text: 'I post a new moment',
            picture: 'THis is where picture live',
            comments: []
        };
        this.handleAddComment=this.handleAddComment.bind(this);
    }

    handleAddComment = (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment.value.trim();

        this.setState((prevState) => ({
            comments: prevState.comments.concat(comment)
          }));

        e.target.elements.comment.value = '';
    };

    render(){
        return(
            <div>
                <p>Time: {this.state.time}</p>
                <p>Distance: {this.state.distance}</p>
                <p>{this.state.text}</p>
                <p>{this.state.picture}</p>
                <Comments comments={this.state.comments}/>

                <form className="add-option" onSubmit={this.handleAddComment}>
                    <input className="add-option__input" type="text" name="comment" />
                    <button className="btn btn-primary">Send</button>
                </form>

            </div>
        );
    }
}