﻿import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinksPage, CreatePage, DetallPage, AuthPages} from './pages'

export const useRoutes = isAuthenticated => {
  if(isAuthenticated) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/create" exact>
          <CreatePage />
        </Route>
        <Route path="/detail/:id">
          <DetallPage />
        </Route>
        <Redirect to="/create"/>
      </Switch>
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPages />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}