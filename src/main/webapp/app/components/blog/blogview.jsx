import React, { Component } from 'react';
import * as blogService from '../../services/blogservice';
import * as commentService from '../../services/commentservice';
import * as utils from '../../utils/utils';
import EventEmitter from "react-native-eventemitter";
import NewCommentForm from "../comment/newcomment.jsx"

// For Pagination
var maxCommentsPerPage = 5;
var currCommentsPageNum = 0;

class BlogViewForm extends Component {

    constructor() {
        super();

        this.initialState = {
            showNewCommentForm: false
        };

        this.state = this.initialState;
    }

    componentDidMount() {
        console.log("blogview : componentDidMount");
        this.fillComponentData();
        this.registerForCommentEvents();
    }

    componentDidUpdate() {
        console.log("blogview : componentDidUpdate");
        this.fillComponentData();
    }

    emitHomeUpdate() {
        EventEmitter.emit("home", "refresh");
    }

    registerForCommentEvents() {
        EventEmitter.on("comment", (details) => {
            console.log("Eventemitter event : comment => " + details);
            if(details === "hide") {
                this.setState({showNewCommentForm: false});
            }
            //this.setState({showNewCommentForm: false});
            var blogId = $("#vblogId").val();
            this.readComments(blogId);
        });
    }

    fillComponentData() {
        //var blogId = $("#eblogId").val();
        //utils.setSelectedBlogId(blogId);
        var blogId = utils.getSelectedBlogId(blogId);

        blogService.readBlog(blogId, (err, blog) => {
            if(err !== "") {
                alert("blog read failed");
                //utils.setSelectedBlogId(undefined);
            } else {
                utils.setSelectedBlogId(blog.blogId);
                $("#vblogId").val(blog.blogId);
                $("#vblogTitle").val(blog.title);
                $("#vblogText").val(blog.blogText);
                $("#vblogCategory").val(blog.category);
                $("#vblogAuthorId").val(blog.author.userId);
                $("#vblogAuthName").val(
                        blog.author.firstName + " "
                                + blog.author.lastName);
                this.readComments(blog.blogId);
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

    onEdit(event) {
        console.log("cancel blog edit");
        event.preventDefault();
        var blogId = $("#vblogId").val();
        utils.setSelectedBlogId(blogId);
        console.log($("#editBlogMenu"))
        $("#editBlogMenu")[0].click();
        utils.initializeMenu();
    }

    onDelete(event) {
        console.log("on blog delete");
        event.preventDefault();

        var auth = utils.getFromBrowserCookie("Authorization");
        //var blogId = utils.getSelectedBlogId();
        var blogId = $("#vblogId").val();

        blogService.deleteBlog(blogId, auth, (err, blog) => {
            utils.setSelectedBlogId(undefined);
            if(err !== "") {
                alert("delete blog failed");
                //utils.setSelectedBlogId(undefined);
            } else {
                console.log($("#homeMenu"))
                $("#homeMenu")[0].click();
                utils.initializeMenu();
            }
        });
    }

    onAddComment(event) {
        console.log("onAddComment");
        this.setState({showNewCommentForm: true});
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

        var inputStyle = {
            outline: "none",
            border: "none"
        }

        return (
            <form id="viewBlogForm" className="text-left">
                <h2 className="text-center">Viewing Blog...</h2>
                <div className="container  col-lg-4 col-lg-offset-4">
                    <br />
                    <div>
                        <input id="vblogId" style={hideStyle} readOnly></input>
                        Title :<input id="vblogTitle" style={inputStyle} readOnly></input>
                        <br/>
                        Category :<input type="text" id="vblogCategory" style={inputStyle} placeholder="Category" readOnly></input>
                    </div>
                    <br />
                    Author ID :<input id="vblogAuthorId" style={hideStyle} readOnly></input><br/>
                    by <br/>Author Name :<input id="vblogAuthName" style={inputStyle} placeholder="Author" readOnly></input>
                    <br/>
                    Data :<textarea id="vblogText" className="form-control" rows="10" placeholder="blog text ..." readOnly></textarea>
                    <br />
                    <div>
                        <div>
                            <input className="no-border col-sm-2" id="commentsCount" style={inputStyle} placeholder="0 " readOnly></input> COMMENTS
                        </div>
                        <img src="./images/linesep-short.png"  className="seperators"></img>
                        <ul id="commentsList" style= {listStyle}>
                        <li id="commentItem1"></li>
                        <li id="commentItem2"></li>
                        <li id="commentItem1"></li>
                        </ul>
                        {this.state.showNewCommentForm ? <NewCommentForm /> : null}
                        <a href="#" id="commentsFirstPage" onClick={this.moveToFirstPage.bind(this)} className="glyphicon glyphicon-home"> </a>  |  <a href="#" id="commentsPrevPage" onClick={this.moveToPrevPage.bind(this)} className="glyphicon glyphicon-circle-arrow-left"> </a>  |  <a href="#" id="commentsNextPage" onClick={this.moveToNextPage.bind(this)} className="glyphicon glyphicon-circle-arrow-right"> </a>  |  <a>  </a>
                        <button id="addCommentBtn" onClick={this.onAddComment.bind(this)} className = "btn btn-primary glyphicon glyphicon-plus btn-xs"> </button>
                    </div>
                    <br />
                    <div className="input-group">
                        <button id="cancelBlogView" onClick={this.onCancel.bind(this)} className="btn btn-warning glyphicon glyphicon-remove cancelbtn"> </button>
                        <button id="veditBlog" onClick={this.onEdit.bind(this)} className="btn btn-success glyphicon glyphicon-pencil"> </button>
                        <button id="vdeleteBlog" onClick={this.onDelete.bind(this)} className="btn btn-danger glyphicon glyphicon-trash"> </button>
                    </div>
                </div>
            </form>
        );
    }

    ///////////////////////////////////////////////////////////////////////////////////
    // Comments
    showOrHideEditControls(i) {
        console.log("showOrHideEditControls " + i);
        var signedInUser = utils.getSignedInUser();
        var cuserId = "#cuserId" + i;
        var commentOwner = $(cuserId).val();

        var editbtn = "#editComment" + i;
        var savebtn = "#saveComment" + i;
        var deletebtn = "#deleteComment" + i;
        if(signedInUser === commentOwner) {
            $(editbtn).show();
            $(savebtn).show();
            $(deletebtn).show();
        } else {
            $(editbtn).hide();
            $(savebtn).hide();
            $(deletebtn).hide();
        }
    }

    registerForEVDEvents(i) {
        console.log("registerForEVDEvents " + i);
        this.showOrHideEditControls(i);

        var signedInUser = utils.getSignedInUser();
        var editbtn = "#editComment" + i;
        var savebtn = "#saveComment" + i;

        $(editbtn).click(function(e) {
            console.log(editbtn);
            var comment = "#commentId" + i;
            var commentId = $(comment).val();
            console.log(commentId);
            //setSelectedBlogId(blogId);
            //oadForm("editBlogForm", blogId);
        })

        $(savebtn).click(function(e) {
            console.log(savebtn);
            var comment = "#commentId" + i;
            var commentId = $(comment).val();
            console.log(commentId);

            console.log(signedInUser);
            //var blogId = utils.getSelectedBlogId();
            var blogId = $("#vblogId").val();
            var commentTextId = "#commentText" + i;
            var commentText = $(commentTextId).val();
            var updatedComment = {
                "addedBy" : signedInUser,
                "blog" : blogId,
                "commentText" : commentText,
                "commentId" : commentId
            }
            var auth = utils.getFromBrowserCookie("Authorization");
            var reqUrl = "" + utils.getBaseUrl() + "tecblog/comments/";
            commentService.updateComment(updatedComment, reqUrl, auth, (err, comment) => {
                if(!err) {
                    console.log(comment);
                    //this.readComments(blogId);
                    EventEmitter.emit("comment", "refresh");
                }
            });
        })

        var deletebtn = "#deleteComment" + i;
        $(deletebtn).click(function(e) {
            console.log(deletebtn);
            //var blogId = getSelectedBlogId();
            var blogId = $("#vblogId").val();
            var comment = "#commentId" + i;
            var commentId = $(comment).val();
            console.log(commentId);
            var auth = utils.getFromBrowserCookie("Authorization");
            var reqUrl = "" + utils.getBaseUrl() + "tecblog/comments/" + commentId;
            commentService.deleteComment(commentId, reqUrl, auth, (err, comment) => {
                if(!err) {
                    console.log(comment);
                    //this.readComments(blogId);
                    EventEmitter.emit("comment", "refresh");
                }
            });
        })
    }

    clearComments() {
        console.log("clearComments");
        var i = 0;
        $("#commentsList li").each((index, liElement) => {
            //liElement.html("");
            liElement.innerHTML = "";
        })
    }

    getCommentHtml(comments, index) {
        console.log("getCommentHtml ");
        var comment = comments[index];
        console.log(comment);

        return  "<div><input id=\"commentText" + index + "\" value=\"" + comment.commentText + "\"></input>"
        + " by <input style=\"outline: none; border: none;\" id=\"cuserId" + index + "\" value=" + comment.addedBy + " readonly></input>"
        + "<br /><button id=\"saveComment" + index + "\" class=\"btn btn-success glyphicon glyphicon-save btn-xs \"> </button>"
        + "<button id=\"deleteComment" + index + "\" class=\"btn btn-danger glyphicon glyphicon-trash btn-xs \"> </button>"
        + "<input id=\"commentId" + index + "\" value=" + comment.commentId + " style=\"display:none\"></input>"
        + "<input id=\"cblogId" + index + "\" value=" + comment.blog + " style=\"display:none\" readonly></input>"
        + "</div><br/>"
    }

    fillComments(comments) {
        console.log("fillComments");
        this.clearComments();
        //$("#commentsCount").val(comments.length);
        var i = 0;
        $("#commentsList li").each((index, liElement) => {
            console.log("comment item");
            if(comments && i < comments.length) {
                liElement.innerHTML = this.getCommentHtml(comments,i);
                console.log(this.getCommentHtml(comments,i));
                this.registerForEVDEvents(i);
            } else {
                return;
            }
            i++;
        });
    }

    refreshComments(comments, totalCount) {
        console.log("refreshComments");
        totalCount = (totalCount) ? +totalCount : comments.length;
        $("#commentsCount").val(totalCount);
        if(currCommentsPageNum > 0 && comments.length == 0) {
            currCommentsPageNum--;
            console.log("adjust current page : CP = " +  currCommentsPageNum);
        } else {
            this.fillComments(comments);
        }
    }

    readComments(blogId, pageNum, size) {
        pageNum = (pageNum) ? pageNum : 0;
        size = (size) ? size : maxCommentsPerPage;
        var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/" + blogId + "/comments?page=" + pageNum;
        console.log("Read all comments of a blog: ");
        commentService.getComments(reqUrl, (err, comments, totalCount) => {
            if(!err) console.log("getComments failed");
            this.refreshComments(comments, totalCount);
        });
    }
    ///////////////////////////////////////////////////////////////////////////////////
    // For Pagination
    moveToFirstPage(event) {
        console.log("blogFirstPage: 0");
        currCommentsPageNum = 0;
        event.preventDefault();
        //var blogId = getSelectedBlogId();
        var blogId = $("#vblogId").val();
        this.readComments(blogId, currCommentsPageNum);
    }

    moveToNextPage(event) {
        currCommentsPageNum++;
        console.log("blogNextPage: " + currCommentsPageNum);
        event.preventDefault();
        //var blogId = getSelectedBlogId();
        var blogId = $("#vblogId").val();
        this.readComments(blogId, currCommentsPageNum);
    }

    moveToPrevPage(event) {
        currCommentsPageNum = (currCommentsPageNum > 0) ?  --currCommentsPageNum : 0;
        console.log("blogNextPage: " + currCommentsPageNum);
        event.preventDefault();
        //var blogId = getSelectedBlogId();
        var blogId = $("#vblogId").val();
        this.readComments(blogId, currCommentsPageNum);
    }

    getCurrentCommentPage() {
        return currCommentsPageNum;
    }

    getMaxCommentPerPage() {
        return currCommentsPageNum;
    }
    ///////////////////////////////////////////////////////////////////////////////////
}

export default BlogViewForm;