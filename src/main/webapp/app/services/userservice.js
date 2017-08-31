import * as utils from '../utils/utils';

// #AJAX POST
export function createUser(user, callback) {
    console.log("createUser");
    console.log(utils.getBaseUrl());
    console.log("createUser")
    console.log(user);
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users/";
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "POST",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(user, status, xhr) {
            console.log("Sign up success: ");
            console.log(user);
            callback("", user);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Sign up failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(user)
    })
}

// #AJAX GET user
export function readUser(userId, auth, callback) {
    console.log("readUser");
    if(!userId) callback("error");

    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users/" + userId;
    $.ajax({
        url : reqUrl,
        type : "GET",
        dataType : "json",
        success : function(user, status, xhr) {
            console.log("Read user success: ");
            console.log(user);
            callback("", user);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Read user failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        headers: {
            "Authorization": auth
        }
    })
}

//#AJAX GET all users
export function readAllUsers(auth, callback) {
    console.log("readAllUsers");
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users";
    $.ajax({
        url : reqUrl,
        type : "GET",
        dataType : "json",
        success : function(users, status, xhr) {
            console.log("Read all users success: ");
            console.log(users);
            callback("", users);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Read all users failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        headers: {
            "Authorization": auth
        }
    })
}

// #AJAX POST signin
export function authenticateUser(user, callback) {
    console.log("authenticateUser");
    console.log(utils.getBaseUrl());
    console.log(user);
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users/" + user.userId;
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "POST",
        contentType : "application/json; charset=utf-8",
        success : function(data, status, xhr) {
            console.log(data);
            var jwtToken = xhr.getResponseHeader("Authorization");
            console.log(jwtToken);
            callback("", jwtToken);
        },
        error : function(xhr, status, err) {
            if(err) {
                //alert("Invalid user or password");
                console.log(err);
                console.log(status);
                console.log("authenticateUser failed");
                callback("error");
            }
        },
        data : JSON.stringify(user)
    })
    console.log("authenticate user end");
}

// #AJAX PUT profile update
export function updateUser(user, auth, callback) {
    console.log("updateUser");
    console.log(utils.getBaseUrl());
    console.log("updateUser")
    console.log(user);
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users/";
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "PUT",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(data, status, xhr) {
            console.log("Profile update success: ");
            console.log(data);
            callback("", data);
        },
        error : function(xhr, status, err) {
            if(err){
                console.log("Profile update failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(user),
        headers: {
            "Authorization": auth
        }
    })
}

export function deleteUser(userId, auth, callback) {
    console.log("deleteUser");
    if(!userId) callback("error");
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/users/" + userId;
    $.ajax({
        url : reqUrl,
        type : "DELETE",
        success : function(user, status, xhr) {
            console.log("Delete user success: ");
            console.log(userId);
            callback("", user);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Delete user failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        headers: {
            "Authorization": auth
        }
    })
}