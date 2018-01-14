import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import PostCreatePage from './components/PostCreatePage/PostCreatePage';
import ProfilePage from './components/ProfilePage/ProfilePage';

import serverAPI from './utils/serverAPI';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            replies: {},
        };

        this.onNewPost = this.onNewPost.bind(this);
        this.onNewReply = this.onNewReply.bind(this);

        serverAPI.pGetPosts()
            .then((data) => {
                const _posts = [];
                const _replies = {};

                data.posts.forEach((post) => {
                    _posts.push(post.post);
                    post.replies.forEach((reply) => {
                        const post_id = reply.post_id;
                        _replies[post_id] = _replies[post_id] || [];
                        _replies[post_id].push(reply);
                    });
                });

                this.setState((prevState, props) => ({
                    posts: _posts,
                    replies: _replies,
                }));
            })
            .then(() => {
                serverAPI.onNewPost(this.onNewPost);
                serverAPI.onNewReply(this.onNewReply);
            });
    }

    onNewPost(data) {
        this.setState((prevState, props) => ({
            posts: [data.post].concat(prevState.posts),
        }));
    }

    onNewReply(data) {
        this.setState((prevState, props) => {
            const replies = Object.assign({}, prevState.replies); // TODO: use deep copy
            const reply = data.reply;
            replies[reply.post_id] = replies[reply.post_id].concat([reply]);
            return {
                replies: replies,
            };
        })
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route path="/" component={() => (<MainPage posts={this.state.posts} replies={this.state.replies} />)} exact={true} />
                        <Route path="/create" component={PostCreatePage} />
                        <Route path="/profile" component={ProfilePage} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

/*
const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={MainPage} exact={true} />
                <Route path="/create" component={PostCreatePage} />
                <Route path="/profile" component={ProfilePage} />
            </Switch>
        </div>
    </BrowserRouter>
);
*/
//export default AppRouter;
