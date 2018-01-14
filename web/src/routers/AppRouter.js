import React from 'react';
import RightHere from '../components/RightHere';
import Header from '../components/Header';
import CreatePost from '../components/CreatePost';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';

const AppRouter = ()=>(
    <BrowserRouter>
        <div>
            <Header/>
            <Switch>
                <Route path="/" component={CreatePost} exact={true}/>
                <Route path="/create" component={CreatePost} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;