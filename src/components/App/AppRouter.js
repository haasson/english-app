import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../../routes";
import {useAuthentication} from "../../hooks/app/useAuthentication";

export const AppRouter = () => {
  const [user] = useAuthentication()

  const routesType = user ? privateRoutes : publicRoutes
  const routes = routesType.map(route => {
    return <Route {...route} key={route.path} exact={true} />
  })

  const redirect = user ? '/glossary' : '/login'


  return (
    <Switch>
      {routes}
      <Redirect to={redirect} />
    </Switch>
  )
};