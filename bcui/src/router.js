import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import LoginUser from './routes/LoginUser/LoginUser';
import Register from './routes/Register/Register';
export default class RouterWrap extends Component{
    render(){
        return (
            <div id="router">
                <HashRouter>
                    <Switch>
                        <Route path="/login" component={LoginUser}  exact />
                        <Route path="/register" component={Register}  exact />
                        <Route path="/home" component={DefaultLayout} />
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}