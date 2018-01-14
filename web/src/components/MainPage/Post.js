import React from 'react';
//import Comments from './Comments';

import './Post.css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    
    handleAddComment = (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment.value.trim();

        setState((prevState) => ({
            comments: prevState.comments.concat(comment)
        }));

        e.target.elements.comment.value = '';
    };

    render() {
        return (
            <div className="row post">
                <div className="col">
                    <div className="row postHeader">
                        <div className="col-4"> {this.props.time} </div>
                        <div className="col-4"> </div>
                        <div className="col-4"> </div>
                    </div>
                </div>
                <div className="row replyCreate">
                    <div className="col-8">
                        <textarea rows={1}></textarea>
                    </div>
                    <div className="col-4">
                        <a> send </a>
                    </div>

                    
                    <form className="add-option" onSubmit={this.handleAddComment}>
                        <input className="add-option__input" type="text" name="comment" />
                        <button className="btn btn-primary">Send</button>
                    </form>
                    
                </div>
            </div>
    );
}
