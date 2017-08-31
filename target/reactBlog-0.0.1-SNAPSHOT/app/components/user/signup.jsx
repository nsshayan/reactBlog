import React, { Component } from 'react';
import * as userService from '../../services/userservice';
import * as utils from '../../utils/utils';

class SignUpForm extends Component {

    onCancelSignup(event) {
        console.log("cancel signup");
        event.preventDefault();
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
    }

    onSignup(event) {
        console.log("on signup");
        event.preventDefault();
        console.log(utils.getBaseUrl());
        utils.clearAuthCookies();
        var user = {};
        var userId = $("#suUserId").val();
        var password = $("#suPassword").val();
        var firstName = $("#suFirstName").val();
        var lastName = $("#suLastName").val();
        var emailId = $("#suEmailId").val();
        var user = {
            "userId" : userId,
            "firstName" : firstName,
            "lastName" : lastName,
            "emailId" : emailId,
            "password" : password
        };

        userService.createUser(user, (err, user) => {
            if(err !== "") {
                alert("user signup failed");
            } else {
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
        });
    }

    render() {
        var hideStyle = {
          display: "none"
        };

        return (
          <form id="signupForm"  className="text-center" >
            <h2>Sign up</h2>
            <div className="imgcontainer">
              <img src="./images/signin.png" alt="Signin" className="signin"></img>
            </div>

            <div className="container col-lg-4 col-lg-offset-4">
              <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input className="form-control" type="text" placeholder="Enter User ID" name="suUserId" id="suUserId" required></input>
              </div>
              <br />
              <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                  <input className="form-control" type="password" placeholder="Enter Password" name="suPassword" id="suPassword" required></input>
              </div>
              <br />
              <div className="input-group">
                  <span className="input-group-addon">First Name</span>
                  <input className="form-control" type="text" placeholder="Enter First Name" name="suFirstName" id="suFirstName" required></input>
              </div>
              <br />
              <div className="input-group">
                  <span className="input-group-addon">Last Name</span>
                  <input className="form-control" type="text" placeholder="Enter Last Name" name="suLastName" id="suLastName" ></input>
              </div>
              <br />
              <div className="input-group">
                  <span className="input-group-addon">Email</span>
                  <input className="form-control" type="email" placeholder="Enter Email Id" name="suEmailId" id="suEmailId" ></input>
              </div>
              <br />
              <div className="input-group">
                <button id="cancelSignup" onClick={this.onCancelSignup.bind(this)} className="btn btn-warning glyphicon glyphicon-remove" type="button"> </button>
                <button id="signup" onClick={this.onSignup.bind(this)} className="btn btn-success glyphicon glyphicon-save"> </button>
              </div>
            </div>
          </form>
        );
    }
}

export default SignUpForm;