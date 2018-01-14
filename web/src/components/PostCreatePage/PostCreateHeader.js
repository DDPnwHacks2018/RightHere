import React from 'react';

export default function PostCreateHeader(props) {
    return (
        <div className="row justify-content-between Header">
            <a className="col-2 btn btn-primary" href="/"> <i className="fa fa-arrow-left" aria-hidden="true"></i> Back </a>
            <button className="col-2 btn btn-primary" onClick={props.onCreatePost}><i className="fa fa-floppy-o" aria-hidden="true"></i> Post </button>
        </div>
    );
}
