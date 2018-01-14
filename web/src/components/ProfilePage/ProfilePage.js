import React from 'react';
import ProfileHeader from './ProfileHeader';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <ProfileHeader />
                <div className="row">
                    <div className="col">
                        <h2>My Profile</h2>
                        <div className="picture">
                            <img src="head.png" alt="Smiley face"></img>
                        </div>
                        <div className="row name-change">
                            <p className="col-1">Name: </p>
                            <input className="col-5" type="text" name="username" />
                            <button className="col-2 btn btn-primary">Change</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
