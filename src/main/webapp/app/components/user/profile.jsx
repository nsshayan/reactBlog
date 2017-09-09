import React, { Component } from 'react';
import * as userService from '../../services/userservice';
import * as utils from '../../utils/utils';

class ProfileForm extends Component {

    constructor() {
        super();
    }

    fillComponentData() {
        var userId = utils.getSignedInUser();
        var auth = utils.getFromBrowserCookie("Authorization");
        userService.readUser(userId, auth, (err, user) => {
            if(err === "") {
                $("#puUserId").val(user.userId);
                $("#puPassword").val("");
                $("#puFirstName").val(user.firstName);
                $("#puLastName").val(user.lastName);
                $("#puEmailId").val(user.emailId);
            } else {
                $("#signinMenu")[0].click();
                utils.clearAuthCookies();
                utils.initializeMenu();
            }
        });
    }

    componentDidMount() {
        this.fillComponentData();
    }

    componentDidMount() {
        this.fillComponentData();
    }

    onCancelProfileUpdate(event) {
        console.log("cancel profile view");
        event.preventDefault();
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
        utils.initializeMenu();
    }

    onProfileUpdate(event) {
        console.log("profile update");
        event.preventDefault();
        var userId = $("#puUserId").val();
        var password = $("#puPassword").val();
        var firstName = $("#puFirstName").val();
        var lastName = $("#puLastName").val();
        var emailId = $("#puEmailId").val();
        var user = {
            "userId" : userId,
            "firstName" : firstName,
            "lastName" : lastName,
            "emailId" : emailId,
            "password" : password
        };
        var auth = utils.getFromBrowserCookie("Authorization");
        userService.updateUser(userId, auth, (err, user) => {
            utils.clearAuthCookies();
            if(err === "") {
                $("#signinMenu")[0].click();
            } else {
                console.log($("#homeMenu"))
                $("#homeMenu")[0].click();
            }
            utils.initializeMenu();
        });
    }

    onProfileDelete(event) {
        console.log("profile update");
        event.preventDefault();
        var userId = utils.getSignedInUser();
        var auth = utils.getFromBrowserCookie("Authorization");
        userService.deleteUser(userId, auth, (err, user) => {
            utils.clearAuthCookies();
            console.log($("#homeMenu"))
            $("#homeMenu")[0].click();
            utils.initializeMenu();
        });
    }

    render() {
        var hideStyle = {
            display: "none"
        };

        var signOffStyle = {
            "backgroundColor": "#f1f1f1"
        };
        // style={hideStyle}
        return (
            <form id="profileForm"  className="text-center">
                <h2>Profile Update</h2>
                <div className="imgcontainer">
                    <img src="./images/signin.png" alt="Signin" className="signin"></img>
                </div>

                <div className="container col-lg-4 col-lg-offset-4">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                        <input className="form-control" type="text" placeholder="Enter User ID" name="puUserId" id="puUserId" required readOnly></input>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                        <input className="form-control" type="password" placeholder="Enter Password" name="puPassword" id="puPassword" required></input>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon">First Name</span>
                        <input className="form-control" type="text" placeholder="Enter First Name" name="puFirstName" id="puFirstName" required></input>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon">Last Name</span>
                        <input className="form-control" type="text" placeholder="Enter Last Name" name="puLastName" id="puLastName" ></input>
                    </div>
                    <br />
                    <div className="input-group">
                        <span className="input-group-addon">Email</span>
                        <input className="form-control" type="email" placeholder="Enter Email Id" name="puEmailId" id="puEmailId" ></input>
                    </div>
                    <br />
                   <div className="input-group">
                        <button id="cancelProfile" onClick={this.onCancelProfileUpdate.bind(this)} className="btn btn-warning" type="button">Cancel </button>
                        <button id="profile" onClick={this.onProfileUpdate.bind(this)} className="btn btn-success">Submit</button>
                   </div>
                   <br />
                </div>

            </form>
        );
  }
}

export default ProfileForm;