import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
            <div className="container profileHeader">
                    <button className="col-1 link-left btn btn-primary">Home</button>
                    <button className="col-1 link-right btn btn-primary">Save</button>
            </div>
        );
    }
    
}
