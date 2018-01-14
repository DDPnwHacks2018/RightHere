import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

import MainPage from './components/MainPage/MainPage';
import PostCreatePage from './components/PostCreatePage/PostCreatePage';
import ProfilePage from './components/ProfilePage/ProfilePage';

import serverAPI from './utils/serverAPI';
import pGetGeolocation from './utils/pGetGeolocation';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            replies: {},
        };

        this.onNewPost = this.onNewPost.bind(this);
        this.onNewReply = this.onNewReply.bind(this);

        pGetGeolocation()
            .then((location) => {
                const loc = [
                    parseFloat(location.lat),
                    parseFloat(location.lng),
                ];

                return serverAPI.pGetPosts(loc)
                    .then((data) => {
                        const _posts = [];
                        const _replies = {};

                        data.posts.forEach((post) => {
                            const _post = {
                                _id: post._id,
                                loc: post.loc,
                                time: post.time,
                                text: post.text,
                                images: post.images,
                            };

                            _posts.push(_post);
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

                        console.log("listener registered");
                    });
            });
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                pGetGeolocation()
                    .then((location) => {
                        const loc = [
                            parseFloat(location.lat),
                            parseFloat(location.lng),
                        ];
                        serverAPI.updateLocation(loc);
                    });
            },
            2000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    onNewPost(data) {
        console.log("new post: ", data);
        const post = {
            _id: data._id,
            time: data.time,
            loc: data.loc,
            text: data.text,
            images: data.images,
        };

        this.setState((prevState, props) => ({
            posts: [post].concat(prevState.posts),
        }));
    }

    onNewReply(data) {
        console.log("new reply: ", data);
        const reply = data;

        this.setState((prevState, props) => {
            const replies = Object.assign({}, prevState.replies); // TODO: use deep copy
            replies[reply.post_id] = replies[reply.post_id] ? replies[reply.post_id].concat([reply]) : [reply];
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
