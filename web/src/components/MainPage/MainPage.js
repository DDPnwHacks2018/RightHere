import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <MainHeader />

                <div className="row">
                    <div className="col">
                        <Post time={'2h ago'} text={'cold evening'} comments={'Good pics'} location={'Vancouver'}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <Post time={'3h ago'} text={'running outside'} comments={'bad pics'} location={'New York'}/>
                    </div>
                </div>


            </div>
        );
    }
}
