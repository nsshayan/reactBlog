import React, { Component } from 'react';
import * as commentService from '../../services/commentservice';
import * as utils from '../../utils/utils';
import EventEmitter from "react-native-eventemitter";

class NewCommentForm extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    onCancel(event) {
        console.log("comment onCancel");
        $("bcfText").val("comment text ... ");
        EventEmitter.emit("comment", "hide");
    }

    onCreate(event) {
        console.log("comment onCreate");
        var commentText = $("#bcfText").val();
        var blogId = $("#vblogId").val();
        var addedBy = utils.getSignedInUser();
        console.log(addedBy);

        var newComment = {
            "commentText" : commentText,
            "addedBy" : addedBy,
            "blog" : blogId,
        }
        var auth = utils.getFromBrowserCookie("Authorization");
        var reqUrl = "" + utils.getBaseUrl() + "tecblog/comments/";
        commentService.createComment(newComment, reqUrl, auth, (err, blog) => {
            if(err !== "") {
                alert("comment creation failed");
            }
        });

        $("bcfText").val("comment text ... ");
        EventEmitter.emit("comment", "hide");
    }

    render() {
        var formStyle = {
            paddingLeft: "16px"
        };

        var listStyle = {
            listStyleType: "none"
        };

        var hideStyle = {
            display : "none"
        };

        return (
            <div id="blogCommentForm" className="text-left">
                <div>
                    <input id="bcfText" placeholder="comment text ... "></input>
                    <button id="bcfSave"  onClick={this.onCreate.bind(this)} className="btn btn-success">Save </button>
                    <button id="bcfCancel" onClick={this.onCancel.bind(this)} className="btn btn-warning">Cancel </button>
                </div>
                <br />
            </div>
        );
    }
}

export default NewCommentForm;