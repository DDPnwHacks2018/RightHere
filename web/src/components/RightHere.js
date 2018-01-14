import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './Header';
import Post from './Post';

export default class RightHere extends React.Component{
    render(){
        return(
            <div className="container">
                <Header/>
                <Post />
            </div>
        );
    }
}