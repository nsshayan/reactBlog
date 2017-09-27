import React, { Component } from 'react';
import * as utils from '../../utils/utils';
import EventEmitter from "react-native-eventemitter";

class MenuBar extends Component {
    constructor() {
        super();
        utils.initializeMenu();
    }

    onSignout(event) {
        console.log("on signout");
        event.preventDefault();
        utils.clearAuthCookies();
        $("#homeMenu")[0].click();
        utils.initializeMenu();
        this.emitHomeUpdate();
    }

    onSearch(event) {
        console.log("on search");
        event.preventDefault();
        this.emitHomeUpdate();
    }

    onHome(event) {
        console.log("on home");
        //event.preventDefault();
        this.emitHomeUpdate();
    }

    emitHomeUpdate() {
        EventEmitter.emit("home", "refresh");
    }

    render() {
        var hideStyle = {
            display: "none"
        }
        //onKeyPress={this.onSearch.bind(this)}
        return (
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#home" id="homeMenu" onClick={this.onHome.bind(this)}> CMAD Blog</a>
            </div>
            <div className="collapse navbar-collapse" id="myNavbar">
                <ul className="nav navbar-nav">
                    <li><a href="#newblog" id="addBlogMenu" style={hideStyle}>Blog <span className="glyphicon glyphicon-plus"></span></a></li>
                    <li><a href="#blogeditor" id="editBlogMenu" style={hideStyle}>Blog <span className="glyphicon glyphicon-pencil"></span></a></li>
                    <li><a href="#blogviewer" id="viewBlogMenu" style={hideStyle}>Blog <span className="glyphicon glyphicon-eye-open"></span></a></li>
                </ul>
                <div id="searchForm" className="navbar-form navbar-left">
                    <div className="input-group">
                        <input id="searchByCategory" type="text" className="form-control" placeholder="category"></input>
                        <div className="input-group-btn">
                            <button id="searchBlogsButton" onClick={this.onSearch.bind(this)} className="btn btn-default">
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><a href="#profile" id="profileMenu"  style={hideStyle} className="glyphicon glyphicon-user"><b>Profile</b></a></li>
                    <li><a href="#admin"  id="adminMenu" style={hideStyle}><span className="glyphicon glyphicon-list-alt"></span><b>Users</b></a></li>
                    <li><a href="#signup" id="signupMenu" ><span className="glyphicon glyphicon-user"></span> Register</a></li>
                    <li><a href="#signin" id="signinMenu"><span className="glyphicon glyphicon-log-in"></span> Log in</a></li>
                    <li><a href="#signout" id="signoutMenu" onClick={this.onSignout.bind(this)} style={hideStyle} ><span className="glyphicon glyphicon-log-in"></span> Log out</a></li>
                </ul>
            </div>
          </div>
        );
    }
}

export default MenuBar;