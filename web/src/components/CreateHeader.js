import React from 'react';

const CreateHeader = (props) => (
    <div>

        <ul className="nav nav-tabs">
            <li className="nav-item">
                <a className="nav-link" href="/">Back</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/">
                    <button className="btn btn-primary">Post</button>
                </a>
            </li>
        </ul>

    </div>
);
  
export default CreateHeader;