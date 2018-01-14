import React from 'react';

export default class CreateHeader extends React.Component{
    constructor(props){
        super(props);
        this.handlePost=this.handlePost.bind(this);
    }

    handlePost = (e) => {
        e.preventDefault();
        console.log("press");
    };

    render(){
        return(
            <div className="container Header">
                <a className="col-1 link-left btn btn-primary" href="/">Home</a>
                <button className="col-1 link-right btn btn-primary">Post</button>
            </div>
        );
    }
    
}