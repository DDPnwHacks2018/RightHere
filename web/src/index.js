import React from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import AppRouter from './routers/AppRouter';
import {BrowserRouter,Route,Switch,Link,NavLink} from 'react-router-dom';


ReactDOM.render(<AppRouter/>, document.getElementById('root'));