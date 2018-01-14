import React from 'react';
import MainPage from '../components/MainPage/MainPage';
import PostCreatePage from '../components/PostCreatePage/PostCreatePage';
import ProfilePage from '../components/ProfilePage/ProfilePage';
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';

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

export default AppRouter;
