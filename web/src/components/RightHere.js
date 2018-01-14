import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';
import 'bootstrap/dist/css/bootstrap.css';

export default class RightHere extends React.Component{
    render(){
        return(
            <div className="container">
                <MainHeader/>
                <Post/>
            </div>
        );
    }
}