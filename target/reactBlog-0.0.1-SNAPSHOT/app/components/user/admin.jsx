import React, { Component } from 'react';
import * as userService from '../../services/userservice';
import * as utils from '../../utils/utils';

class AdminForm extends Component {

    constructor() {
        super();
    }

    fillComponentData() {
        var auth = utils.getFromBrowserCookie("Authorization");
        var rows = "";
        function getFormattedRows(users) {
            for (var i = 0; i < users.length; i++) {
                var row = "<tr><td>" + users[i].userId + "</td><td>"
                        + users[i].firstName + "</td><td>"
                        + users[i].lastName + "</td><td>"
                        + users[i].emailId + "</td><tr>";

                rows += row;
            }
            return rows;
        }

        userService.readAllUsers(auth, (err, users) => {
            if(err === "") {
                var rows = getFormattedRows(users);
                $("#userListTable").show();
                $('#userRows').html(rows);
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

    componentDidUpdate() {
        this.fillComponentData();
    }

    onCancel(event) {
        console.log("cancel profile view");
        event.preventDefault();
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
        utils.initializeMenu();
    }

    onRefresh() {
        this.fillComponentData();
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
            <form id="adminForm" className="text-center">
                <h2>List of Users</h2>
                <div className="imgcontainer">
                    <img src="./images/signin.png" alt="Signin" className="signin"></img>
                </div>
                <br />
                <div className="container col-lg-4 col-lg-offset-4" id="userListTable">
                    <div className="input-group">
                        <table className="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody id="userRows">
                            </tbody>
                        </table>
                    </div>
                    <div className="input-group">
                        <button id="cancelAdmin" onClick={this.onCancel.bind(this)} className="btn btn-warning glyphicon glyphicon-remove" type="button"> </button>
                        <button id="userListAdmin" onClick={this.onRefresh.bind(this)} className="btn btn-success glyphicon glyphicon-refresh" type="button"> </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default AdminForm;