import React from 'react';
//import Comments from './Comments';

import './Post.css';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    /*
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
    */

    render() {
        const Line = () => (
            <div className="row justify-content-center">
                <div className="col-5 line">
                </div>
            </div>
        );

        return (
            <div className="row post">
                <div className="col">
                    <div className="row postHeader">
                        <div className="col-12"> {this.props.time} </div>
                    </div>
                    <div className="row postContent">
                        <div className="col">{this.props.text}</div>
                    </div>

                    {
                        this.props.replies.map((reply) => {
                            <div className="row postReplies" key={reply.id}>
                                <div className="col">{reply.text}</div>
                            </div>
                        })
                    }
                    <div className="row replyCreate">
                        <div className="col-10">
                            <textarea placeholder="Add Your Comment"></textarea>
                        </div>
                        <div className="col-2 sendBtn">
                            <button className="btn btn-primary"> Send </button>
                        </div>
                    </div>
                    <Line />
                </div>
            </div>
        );
    }
}
