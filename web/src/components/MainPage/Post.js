import React from 'react';
//import Comments from './Comments';

import './Post.css';

export default function Post(props) {
    /*
    handleAddComment = (e) => {
        e.preventDefault();

        const comment = e.target.elements.comment.value.trim();

        setState((prevState) => ({
            comments: prevState.comments.concat(comment)
        }));

        e.target.elements.comment.value = '';
    };
    */
    return (
        <div className="row post">
            <div className="col">
                <div className="row postHeader">
                    <div className="col-4"> {props.time} </div>
                    <div className="col-4"> </div>
                    <div className="col-4"> </div>
                </div>
                <div className="row postText">
                    <div className="col">
                        {props.text}
                    </div>
                </div>
                <div className="row replyCreate">
                    <div className="col-8">
                        <textarea rows={1}></textarea>
                    </div>
                    <div className="col-4">
                        <a> send </a>
                    </div>
                </div>

                {/*
                <form className="add-option" onSubmit={handleAddComment}>
                    <input className="add-option__input" type="text" name="comment" />
                    <button className="btn btn-primary">Send</button>
                </form>
                */}
            </div>

        </div >
    );
}
