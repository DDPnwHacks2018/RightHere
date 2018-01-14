import React from 'react';
import ProfileHeader from './ProfileHeader';
import 'bootstrap/dist/css/bootstrap.css';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <ProfileHeader/>
                <div>
                    <h2>My Profile</h2>
                    <div className="picture">
                        <p>Picture</p>
                    </div>
                    <div className="row name-change">
                        <p className="col-1">Name: </p>
                        <input className="col-5" type="text" name="username"/>
                        <button className="col-2 btn btn-primary">Change</button>
                    </div>
                </div>
            </div>
        );
    }
}