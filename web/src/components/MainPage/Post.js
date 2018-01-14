import React from 'react';
//import Comments from './Comments';

import './Post.css';

import serverAPI from '../../utils/serverAPI';

const humanize = (time) => {
    time = Date.parse(time);

    const minute = 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;

    const delta = (Date.now() - time) / 1000.0;

    if (delta > year) {
        let nyear = delta * 1.0 / year;
        nyear = parseInt(Math.floor(nyear + 0.5));
        return nyear + (nyear === 1 ? "year" : "years");
    } else if (delta > month) {
        let nmonth = delta * 1.0 / month;
        nmonth = parseInt(Math.floor(nmonth + 0.5));
        return nmonth + (nmonth === 1 ? "month" : "months");
    } else if (delta > day) {
        let nday = delta * 1.0 / day;
        nday = parseInt(Math.floor(nday + 0.5));
        return nday + (nday === 1 ? "day" : "days");
    } else if (delta > hour) {
        let nhour = delta * 1.0 / hour;
        nhour = parseInt(Math.floor(nhour + 0.5));
        return nhour + (nhour === 1 ? "hour" : "hours");
    } else if (delta > minute) {
        let nminute = delta * 1.0 / minute;
        nminute = parseInt(Math.floor(nminute + 0.5));
        return nminute + (nminute === 1 ? "minute" : "minutes");
    } else {
        let nsecond = delta;
        return nsecond + (nsecond === 1 ? "second" : "seconds");
    }
}

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        console.log("props: ", props);

        this.textareaEle = null;

        this.onReplyPost = this.onReplyPost.bind(this);
    }

    onReplyPost() {
        const text = this.textareaEle.value.trim();
        serverAPI.pReplyPost(this.props.id, text);
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
            <div>
                <div className="row post">
                    <div className="col">
                        <div className="row postHeader">
                            <div className="col-4"><i className="fa fa-clock-o" aria-hidden="true"></i> {humanize(this.props.time)} </div>
                            <div className="col-4"> <i className="fa fa-map-marker" aria-hidden="true"></i> UBC</div>
                            <div className="col-4"> </div>
                        </div>
                        <hr />
                        <div className="row postContent">
                            <div className="col-12">{this.props.text}</div>
                        </div>
                        {
                            this.props.images && this.props.images.length > 0 && (
                                <div className="row postPicture">
                                    <div className="col">
                                        <img src={"data:image/jpg;base64," + this.props.images[0]} alt="preview img" />
                                    </div>
                                </div>
                            )
                        }
                        {
                            this.props.replies && this.props.replies.map((reply) => (
                                <div className="row postReplies" key={reply._id} >
                                    <div className="col">{reply.text}</div>
                                </div>
                            ))
                        }
                        <div className="row replyCreate">
                            <div className="col-10">
                                <textarea placeholder="Add Your Comment" ref={input => this.textareaEle = input}></textarea>
                            </div>
                            <div className="col-2 sendBtn">
                                <button className="btn btn-primary" onClick={this.onReplyPost}> Send </button>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        );
    }
}
