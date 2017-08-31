import React, { Component } from 'react';
import * as blogService from '../../services/blogservice';
import * as utils from '../../utils/utils';
import EventEmitter from "react-native-eventemitter";

var searchTimer;

class HomeForm extends Component {

    constructor() {
        super();

        searchTimer = setInterval(() => { this.onSearchTimer() }, 1000);
    }

    componentDidMount() {
        this.fillComponentData(0);
        this.registerForRefresh();
    }

    componentDidUpdate() {
        this.fillComponentData();
    }

    componentDidLoad() {
        this.fillComponentData();
    }

    registerForRefresh() {
        EventEmitter.on("home", (details) => {
            console.log("Eventemitter event : Home => " + details);
            this.fillComponentData();
        });
    }

    onSearchTimer() {
        var category = $("#searchByCategory").val();
        var oldCategory = utils.getFromBrowserCookie("blogCategory");
        if(category !== oldCategory) {
            utils.addToBrowserCookie("blogCategory", category);
            this.fillComponentData();
        }
    }

    fillComponentData(pageNum) {
        var filters = {};
        filters.category = utils.getSelectedCategory();
        console.log("fillComponentData : filters = " + filters);
        var maxSize = utils.getMaxBlogsPerPage();
        blogService.searchBlogs(filters, pageNum, maxSize, (err, blogs) => {
            if(err !== "") {
                if(err === "pageError") {
                    if(utils.getCurrentBlogPage() > 0) {
                        utils.moveToPrevPage();
                    } else {
                       this.fillHomeBlogForm([]);
                    }
                }
            } else {
                this.fillHomeBlogForm(blogs);
            }
        });
    }

    getBlogHtml(blogs, index) {
        console.log("getBlogHtml");
        var blog = blogs[index];
        return "<div><br/><div><input id=\"lblogId" + index + "\" value=\""
        + blog.blogId + "\""
        + " style=\"display:none\" readonly></input>"
        + "<b id=\"lblogTitle" + index + "\">"
        + blog.title
        + " </b></div><button class=\"btn btn-info glyphicon glyphicon-pencil btn-xs\" id=\"leditBlog" + index + "\"></button><button "
        + "id=\"lviewBlog" + index + "\" class=\"btn btn-success glyphicon glyphicon-eye-open btn-xs\"></button><button "
        + " class=\"btn btn-danger glyphicon glyphicon-trash btn-xs\" id=\"ldeleteBlog" + index + "\"></button>"
        + "</br><input style=\"outline: none; border: none;\" type=\"text\" id=\"lblogCategory" + index + "\" value=\""
        + blog.category + "\""
        + " readonly></input>"
        + "<br/><input id=\"lblogAuthorId" + index + "\"  value=\""
        + blog.author.userId + "\""
        + " style=\"display:none\" readonly></input>written by <input style=\"outline: none; border: none;\" id=\"lblogAuthName" + index + "\"  value=\""
        + blog.author.firstName
        + " "
        + blog.author.lastName + "\""
        + " readonly></input>"
        + "<div><textarea style=\"outline: none; border: none;\" id=\"lblogText" + index + "\"  class=\"form-control\" rows=\"5\" readonly required>" + blog.blogText + "</textarea>"
        + "</div><br/></div>";
    }

    setBlogsInnerHtml(index, htmlFrag) {
        console.log("setBlogsInnerHtml");
        var identifier = "#blogItem" + index;
        $(identifier).html(htmlFrag);
    }

    showOrHideEditControls(i) {
        console.log("showOrHideEditControls " + i);
        var signedInUser = utils.getSignedInUser();
        console.log(signedInUser);
        var buserId = "#lblogAuthorId" + i;
        var blogOwner = $(buserId).val();
        console.log(blogOwner);

        var editbtn = "#leditBlog" + i;
        var deletebtn = "#ldeleteBlog" + i;
        var viewbtn = "#lviewBlog" + i;
        $(viewbtn).show();
        if(signedInUser == blogOwner) {
            $(editbtn).show();
            $(deletebtn).show();
        } else {
            $(editbtn).hide();
            $(deletebtn).hide();
        }
    }

    registerForEVDEvents(i) {
        console.log("registerForEVDEvents " + i);
        this.showOrHideEditControls(i);
        var editbtn = "#leditBlog" + i;
        $(editbtn).click((e) => {
            console.log(editbtn);
            var blog = "#lblogId" + i;
            var blogId = $(blog).val();
            console.log("selected blogId = " + blogId);
            utils.setSelectedBlogId(blogId);
            $("#editBlogMenu")[0].click();
        })

        var viewbtn = "#lviewBlog" + i;
        $(viewbtn).click((e) => {
            console.log(viewbtn);
            var blog = "#lblogId" + i;
            var blogId = $(blog).val();
            console.log("view blog ID : " + blogId);
            utils.setSelectedBlogId(blogId);
            $("#viewBlogMenu")[0].click();
        })

        var delbtn = "#ldeleteBlog" + i;
        $(delbtn).click((e) => {
            console.log(delbtn);
            var blog = "#lblogId" + i;
            var blogId = $(blog).val();
            utils.setSelectedBlogId(blogId);
            var auth = utils.getFromBrowserCookie("Authorization");

            blogService.deleteBlog(blogId, auth, (err, blog) => {
                utils.setSelectedBlogId(undefined);
                if(err !== "") {
                    alert("delete blog failed");
                } else {
                    console.log($("#homeMenu"))
                    $("#homeMenu")[0].click();
                    utils.initializeMenu();
                }
            });
        })
    }

    clearHomeBlogForm() {
        console.log("clearHomeBlogForm");
        var i = 0;
        $("#blogsList li").each((index, liElement) => {
            //var liElement = $(this);
            console.log(liElement);
            liElement.innerHTML = "";
        })
    }

    fillHomeBlogForm(blogs) {
        console.log("fillHomeBlogForm");
        this.clearHomeBlogForm();
        //var i = 0;
        console.log($("#blogsList li"));
        $("#blogsList li").each((index, liElement) => {
            console.log("blog item");
            if(blogs && index < blogs.length) {
                console.log(liElement);
                //var liElement = $(this);
                liElement.innerHTML = this.getBlogHtml(blogs,index);
                //liElement.eq(0).html(this.getBlogHtml(blogs,index));
                console.log(this.getBlogHtml(blogs,index));
                console.log(liElement);
                this.registerForEVDEvents(index);
            } else {
                return;
            }
        });
    }

    onFirstPage(event) {
        console.log("on first page");
        utils.moveToFirstPage();
        var pageNum = utils.getCurrentBlogPage();

        this.fillComponentData(pageNum);
    }

    onPrevPage(event) {
        console.log("on prev page");
        utils.moveToPrevPage();
        var pageNum = utils.getCurrentBlogPage();
        this.fillComponentData(pageNum);
    }

    onNextPage(event) {
        console.log("on next page");
        utils.moveToNextPage();
        var pageNum = utils.getCurrentBlogPage();
        this.fillComponentData(pageNum);
    }

    render() {
        var formStyle = {
            paddingLeft: "16px"
        };

        var listStyle = {
            listStyleType: "none"
        };

        return (
            <form id="homeForm" className="text-left">
                <div style= { formStyle } >
                    <br/>
                    <img src="./images/linesep-short.png"  className="seperators"></img>
                    <div><b>BLOGS</b></div>
                    <ul id="blogsList" style = { listStyle } >
                        <li id="blogItem1"></li>
                        <li id="blogItem2"></li>
                        <li id="blogItem3"></li>
                        <li id="blogItem4"></li>
                        <li id="blogItem5"></li>
                    </ul>
                    <a href="#" id="blogFirstPage" onClick={this.onFirstPage.bind(this)} className="glyphicon glyphicon-home"> </a>  |  <a href="#" id="blogPrevPage" onClick={this.onPrevPage.bind(this)} className="glyphicon glyphicon-circle-arrow-left"> </a>  |  <a href="#" id="blogNextPage" onClick={this.onNextPage.bind(this)} className="glyphicon glyphicon-circle-arrow-right"> </a>
                </div>
            </form>
        );
    }
}

export default HomeForm;