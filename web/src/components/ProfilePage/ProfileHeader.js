import React from 'react';

export default class ProfileHeader extends React.Component{
    constructor(props){
        super(props);
        this.handleSave=this.handleSave.bind(this);
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log("press");
    };
    render(){
        return(
            <div className="container">
                <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                        <a className="nav-link" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/profile" onClick={this.handleSave}>Save</a>
                    </li>
                    
                </ul>
            </div>
        );
    }
    
}
