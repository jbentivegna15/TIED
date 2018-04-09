//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import UserBox from './UserBox';



ReactDOM.render(
        <UserBox
        url='http://localhost:3001/api/users'
        pollInterval={2000} />,
        document.getElementById('root')
    );

// import React from 'react';
// import ReactDom from 'react-dom';
//
// import { Router } from 'react-router-dom';
// import history from './history';
// import routes from './routes';
//
// // require('./stylesheets/base.scss');
// // require('./stylesheets/home.scss');
// // require('./stylesheets/contact.scss');
//
// ReactDom.render(
//   <Router history={history} routes={routes} />,
//   document.querySelector('#app')
// );
