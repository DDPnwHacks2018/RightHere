import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Header = (props) => (
    <div>
        <div className="container">
            <h1>RightHere</h1>
            <ul className="nav justify-content-end">
                <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
                </li>
                <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
                </li>
            </ul>
        </div>
    </div>
);
  
export default Header;