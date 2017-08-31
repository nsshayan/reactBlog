import React, { Component } from 'react';
import { Router, Route, Link, browserHistory, IndexRoute  } from 'react-router'
import HomeForm from './components/blog/home.jsx'
import * as utils from './utils/utils';

export class App extends Component {
    constructor() {
        super();
        utils.clearBrowserCookie();
    }

    render() {
        return (
          <div>
            <HomeForm></HomeForm>
          </div>
        );
    }
}

