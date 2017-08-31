import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app.jsx';
import MenuBar from "./app/components/menubar/menubar.jsx"
// user forms
import SignInForm from "./app/components/user/signin.jsx"
import SignUpForm from "./app/components/user/signup.jsx"
import ProfileForm from "./app/components/user/profile.jsx"
import AdminForm from "./app/components/user/admin.jsx"
// blog forms
import HomeForm from "./app/components/blog/home.jsx"
import NewBlogForm from "./app/components/blog/newblog.jsx"
import BlogEditForm from "./app/components/blog/blogedit.jsx"
import BlogViewForm from "./app/components/blog/blogview.jsx"

import { BrowserRouter,
         HashRouter as Router,
         Route, IndexRoute,
         hashHistory, browserHistory,
         createMemoryHistory, Switch
       } from 'react-router-dom'

ReactDOM.render(<MenuBar />, document.getElementById('menuBar'));
ReactDOM.render(
    <Router>
       <Switch>
          <Route exact path = "/signup"     component = {SignUpForm} />
          <Route exact path = "/signin"     component = {SignInForm} />
          <Route exact path = "/profile"    component = {ProfileForm} />
          <Route exact path = "/admin"      component = {AdminForm} />
          <Route exact path = "/home"       component = {HomeForm} />
          <Route exact path = "/newblog"    component = {NewBlogForm} />
          <Route exact path = "/blogeditor" component = {BlogEditForm} />
          <Route exact path = "/blogviewer" component = {BlogViewForm} />
          <Route       path = "/"           component = {App} />
       </Switch>
   </Router>,
    document.getElementById('app'));
