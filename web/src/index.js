import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import AppRouter from './routers/AppRouter';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';

// -- test --
//import TestApp from './utils/TestApp'

//ReactDOM.render(<TestApp/>, document.getElementById('test'));

ReactDOM.render(<AppRouter/>, document.getElementById('root'));
