import React from 'react';
import ProfileHeader from './ProfileHeader';

export default class Profile extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="container">
                <ProfileHeader/>
                <h2>My Profile</h2>
                <div>
                    <p>Picture</p>
                </div>
                <div>
                    <p>Your Name: </p>
                </div>
            </div>
        );
    }
}