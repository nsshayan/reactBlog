import React, { Component } from 'react';
import * as blogService from '../../services/blogservice';
import * as utils from '../../utils/utils';
import EventEmitter from "react-native-eventemitter";

class BlogEditForm extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.fillComponentData();
    }

    componentDidUpdate() {
        this.fillComponentData();
    }

    emitHomeUpdate() {
        EventEmitter.emit("home", "refresh");
    }

    fillComponentData() {
        var blogId = utils.getSelectedBlogId();

        blogService.readBlog(blogId, (err, blog) => {
            if(err !== "") {
                //alert("blog read failed");
                utils.setSelectedBlogId(undefined);
            } else {
                utils.setSelectedBlogId(blog.blogId);
                $("#eblogId").val(blog.blogId);
                $("#eblogTitle").val(blog.title);
                $("#eblogText").val(blog.blogText);
                $("#eblogCategory").val(blog.category);
                $("#eblogAuthorId").val(blog.author.userId);
                $("#eblogAuthName").val(
                        blog.author.firstName + " "
                                + blog.author.lastName);
            }
        });
    }

    onCancel(event) {
        console.log("cancel blog edit");
        event.preventDefault();
        utils.setSelectedBlogId(undefined);
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
        utils.initializeMenu();
        //this.emitHomeUpdate();
    }

    onSave(event) {
        console.log("on blog update/save");
        event.preventDefault();

        var auth = utils.getFromBrowserCookie("Authorization");
        var blogId = utils.getSelectedBlogId();
        var signedInUser = utils.getSignedInUser();
        console.log(signedInUser);
        var title = $("#eblogTitle").val();
        var category = $("#eblogCategory").val();
        var blogText = $("#eblogText").val();

        var newBlog = {
            "blogId" : blogId,
            "title" : title,
            "category" : category,
            "blogText" : blogText,
        }

        blogService.updateBlog(newBlog, auth, (err, blog) => {
            if(err !== "") {
                alert("blog update failed");
                //utils.setSelectedBlogId(undefined);
            } else {
                utils.setSelectedBlogId(blog.blogId);
                console.log($("#homeMenu"))
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
            //this.emitHomeUpdate();
        });
    }

    onDelete(event) {
        console.log("on blog delete");
        event.preventDefault();

        var auth = utils.getFromBrowserCookie("Authorization");
        var blogId = $("#lblogId").val();
        utils.setSelectedBlogId(blogId);
        //var blogId = utils.getSelectedBlogId();
        //var blogId = $("#eblogId").val();

        blogService.deleteBlog(blogId, auth, (err, blog) => {
            utils.setSelectedBlogId(undefined);
            if(err !== "") {
                alert("delete blog failed");
            } else {
                console.log($("#homeMenu"))
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
            //this.emitHomeUpdate();
        });
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
            <form id="editBlogForm" className="text-left">
                <h2 className="text-center">Editing Blog ...</h2>
                <div className="container  col-lg-4 col-lg-offset-4">
                    <br />
                    <img src="./images/linesep-short.png"  className="seperators"></img>
                    <div>
                        <input id="eblogId" style= {hideStyle} readOnly></input>
                        <input id="eblogTitle" placeholder="edit blog title "></input>
                        <input type="text" id="eblogCategory" placeholder="Category"></input>
                        <input id="eblogAuthorId" style= {hideStyle} readOnly></input>
                        by <input className="no-border" id="eblogAuthName" placeholder="Author" readOnly></input>
                        <textarea id="eblogText" className="form-control" rows="10" placeholder="blog text ..." required></textarea>
                    </div>
                    <br />
                    <img src="./images/linesep-short.png"  className="seperators"></img>
                    <div className="input-group">
                        <button id="cancelBlogEdit" onClick={this.onCancel.bind(this)} className="btn btn-warning" type="button">Cancel </button>
                        <button id="esaveBlog" onClick={this.onSave.bind(this)} className="btn btn-success">Save </button>
                        <button id="edeleteBlog" onClick={this.onDelete.bind(this)} className="btn btn-danger" >Delete </button>
                    </div>
                </div>
            </form>
        );
    }
}

export default BlogEditForm;