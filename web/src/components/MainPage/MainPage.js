import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.posts = props.posts;
        this.replies = props.replies;
    }

    render() {
        return (
            <div className="container">
                <MainHeader />

                {
                    this.posts.map((post) => {
                        const replies = this.replies[post.id];
                        return (
                            <div className="row" key={post.id}>
                                <div className="col">
                                    <Post time={post.time} text={post.text} images={post.images} replies={replies} />
                                </div>
                            </div>
                        );
                    })
                }

            </div>
        );
    }
}
