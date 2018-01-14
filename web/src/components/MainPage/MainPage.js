import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';


export default class MainPage extends React.Component {
    constructor(props){
        super(props);

    }
    
    render() {
        return (
            <div className="container">
                <MainHeader />
                <div className="row">
                    <div className="col">
                        <Post time={'2h ago'} text={'a post'} />
                    </div>
                </div>
            </div>
        );
    }
}
