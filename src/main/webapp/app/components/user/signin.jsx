import React, { Component } from 'react';
import * as userService from '../../services/userservice';
import * as utils from '../../utils/utils';

class SignInForm extends Component {

    constructor() {
        super();
    }

    onSignin(event) {
        console.log("on signin");
        event.preventDefault();
        console.log(utils.getBaseUrl());
        utils.clearAuthCookies();
        var user = {};
        user.userId = $("#siUserId").val();
        user.password = $("#siPassword").val();
        userService.authenticateUser(user, (err, jwtToken) => {
            if(err !== "") {
                alert("Invalid user or password");
            } else {
                utils.addToBrowserCookie("Authorization", jwtToken);
                utils.addToBrowserCookie("userId", user.userId);
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
        });
    }

    onCancelSignin(event) {
        console.log("cancel signin");
        event.preventDefault();
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
    }

    render() {
      var hideStyle = {
        display: "none"
      };
      //onClick={this.onSignin.bind(this)}
      return (
        <form id="signinForm"  className="text-center">
          <h2>Log in</h2>

          <div className="container  col-lg-4 col-lg-offset-4">
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                <input className="form-control" type="text" placeholder="Enter User ID" name="siUserId" id="siUserId" required></input>
            </div>
            <br />
            <div className="input-group">
                <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                <input className="form-control" type="password" placeholder="Enter Password" name="siPassword" id="siPassword" required></input>
            </div>
            <br />
           <div className="input-group">
                <button id="cancelSignin" onClick={this.onCancelSignin.bind(this)} className="btn btn-warning" type="button">Cancel </button>
                <button id="signin"  onClick={this.onSignin.bind(this)} className="btn btn-success" >Submit </button>
           </div>
          </div>
        </form>
      );
  }
}

export default SignInForm;