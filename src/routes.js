import React from 'react';
import  { Route } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Contact from './components/views/contact';

export default (
  <Route path='/' component={App}>
    <Route exact path = "/" component={Home} />
    <Route path='comment' component={Comment} />
    <Route path='*' component={Home} />
  </Route>
);
