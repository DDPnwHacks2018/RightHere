import React from 'react';

export default function PostCreateHeader(props) {
    return (
        <div className="row justify-content-between Header">
            <a className="col-2 btn btn-primary" href="/"> Back </a>
            <button className="col-2 btn btn-primary" onClick={props.onCreatePost}> Post </button>
        </div>
    );
}
