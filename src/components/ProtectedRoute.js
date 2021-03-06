import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ( {component: Component, authenticated, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => authenticated ? <Component {...props} /> : <Redirect to="/login" {...props}/>}
    />
)

export default ProtectedRoute;
