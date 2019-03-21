import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles/reset.css';
import './static/styles/index.scss';
import './static/fonts/iconfont.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import './static/test'

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
