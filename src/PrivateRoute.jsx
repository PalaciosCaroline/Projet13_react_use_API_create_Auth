import React from 'react'
import {Route, redirect} from 'react-router-dom'
import AuthService from './services/auth-service'

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
    const isAuthentificated = AuthService.isAuthentificated;
    if (!isAuthentificated) {
        return redirect('/login')
       
    }
    return <Component {...props} />
    }} />
);

    export default PrivateRoute;
 