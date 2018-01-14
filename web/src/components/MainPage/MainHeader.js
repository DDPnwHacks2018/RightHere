import React from 'react';


export default class MainHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(e) {
        e.preventDefault();
        console.log("press");
    }

    render() {
        return (
            <div className="row justify-content-between Header">
                <a className="col-2 btn btn-primary" href="/profile">Profile</a>
                <button className="col-2 btn btn-primary">Top</button>
                <a className="col-2 btn btn-primary" href="/create">Post</a>
            </div>
        );
    }

}
