import React from 'react';

export default class ProfileHeader extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
    }

    handleSave = (e) => {
        e.preventDefault();
        console.log("press");
    };

    render() {
        return (
            <div className="row justify-content-between profileHeader">
                <button className="col-2 btn btn-primary">Home</button>
                <button className="col-2 btn btn-primary">Save</button>
            </div>
        );
    }

}
