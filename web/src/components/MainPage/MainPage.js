import React from 'react';
import MainHeader from './MainHeader';
import Post from './Post';


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.posts = props.posts;
        this.replies = props.replies;

        console.log("posts: ", this.posts);
        console.log("replies: ", this.replies);
    }



    handleTest = (e) => {

        this.setState((prevState) => ({
            time: prevState.time.concat('4h ago')
        }));
        this.setState((prevState) => ({
            text: prevState.text.concat('4h ago')
        }));
        this.setState((prevState) => ({
            comments: prevState.comments.concat('4h ago')
        }));
        this.setState((prevState) => ({
            location: prevState.location.concat('4h ago')
        }));
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
