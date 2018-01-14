import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class MainHeader extends React.Component{
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
            <div className="container">
                <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                        <a className="nav-link" href="/">RightHere</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link">Top</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile" onClick={this.handleSave}>Post</a>
                    </li>   
                </ul>
            </div>
        );
    }
    
}