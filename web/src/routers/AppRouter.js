import React from 'react';
import RightHere from '../components/RightHere';
import CreatePost from '../components/CreatePost';
import Profile from '../components/Profile';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={RightHere} exact={true}/>
                <Route path="/create" component={CreatePost} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;