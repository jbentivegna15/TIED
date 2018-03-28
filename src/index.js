//index.js
import React from 'react';
import ReactDOM from 'react-dom';
import CommentBox from './CommentBox';



ReactDOM.render(
        <CommentBox
        url='http://localhost:3001/api/comments'
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
