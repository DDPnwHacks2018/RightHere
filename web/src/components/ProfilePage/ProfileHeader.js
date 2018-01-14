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
            <div className="row justify-content-between Header">
                <a className="col-2 btn btn-primary" href="/"><i className="fa fa-arrow-left" aria-hidden="true"></i> Home</a>
                <button className="col-2 btn btn-primary"><i className="fa fa-floppy-o" aria-hidden="true"></i> Save</button>
            </div>
        );
    }

}
