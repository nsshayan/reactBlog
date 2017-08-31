import React, { Component } from 'react';
import * as blogService from '../../services/blogservice';
import * as utils from '../../utils/utils';

class NewBlogForm extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }

    onCancel(event) {
        console.log("cancel newblog");
        event.preventDefault();
        console.log($("#homeMenu"))
        $("#homeMenu")[0].click();
        utils.initializeMenu();
    }

    onCreate(event) {
        console.log("on create blog");
        event.preventDefault();
        var signedInUser = utils.getSignedInUser();
        console.log(signedInUser);
        var title = $("#nblogTitle").val();
        var category = $("#nblogCategory").val();
        var blogText = $("#nblogText").val();

        var newBlog = {
            "title" : title,
            "category" : category,
            "blogText" : blogText,
            "author" : {
                "userId" : signedInUser
            }
        }
        var auth = utils.getFromBrowserCookie("Authorization");

        blogService.createBlog(newBlog, auth, (err, blog) => {
            console.log(" =================== blogService.createBlog");
            console.log(err);
            if(err !== "") {
                alert("blog creation failed");
                //utils.setSelectedBlogId(undefined);
            } else {
                //utils.setSelectedBlogId(blog.blogId);
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
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
            <form id="newBlogForm" className="text-left">
                <h2 className="text-center">New Blog. </h2>
                <div className="container  col-lg-4 col-lg-offset-4">
                    <br />
                    <div>
                        Title :<input id="nblogTitle" placeholder="New blog title "></input>
                        <br/>
                        Category :<input type="text" name="blogCategory" id="nblogCategory" placeholder="Category"></input>
                    </div>
                    <br />
                    Data :<textarea id="nblogText" className="form-control" rows="10" placeholder="blog text ..." required></textarea>
                    <br />
                    <div className="input-group">
                        <button id="cancelBlogAdd" onClick={this.onCancel.bind(this)} className="btn btn-warning " type="button">Submit </button>
                        <button id="ncreateBlog" onClick={this.onCreate.bind(this)} className="btn btn-success" >Cancel</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default NewBlogForm;