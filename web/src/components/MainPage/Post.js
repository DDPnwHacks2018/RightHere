import React from 'react';
//import Comments from './Comments';

import './Post.css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state
    }

    
    handleAddComment = (e) => {
        e.preventDefault();
        const comment = e.target.elements;
        // const comment = e.target.elements.comment.value.trim();
        console.log(comment);
        // setState((prevState) => ({
        //     comments: prevState.comments.concat(comment)
        // }));

        // e.target.elements.comment.value = '';
    }

    render() {
        return (
            <div>
                <div className="row post">
                    <div className="col">
                        <div className="row postHeader">
                            <div className="col-4"> {this.props.time} </div>
                            <div className="col-4"> {this.props.location}</div>
                            <div className="col-4"> </div>
                        </div>
                        <div className="row postContent">
                            <div className="col-10">{this.props.text}</div>
                        </div>
                        
                    </div>
                </div>
                <div className="row replyCreate">
                    <div className="col-10">{this.props.comments}</div>
                    
                    <div className="col-10">
                        <textarea placeholder="Add Your Comment"></textarea>
                    </div>
                    <div className="col-2 sendBtn">
                        <button className="btn btn-primary" onClick={this.handleAddComment}>Send</button>
                    </div>
                    
                </div>
            </div>
        );
    }
}