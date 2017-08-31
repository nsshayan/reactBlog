import * as utils from '../utils/utils';

// #AJAX POST
export function createBlog(newBlog, auth, callback) {
    console.log("createBlog");
    console.log(utils.getBaseUrl());
    console.log("createBlog");
    console.log(newBlog);
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/";
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "POST",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(blog, status, xhr) {
            console.log("New blog created: ");
            console.log(blog);
            callback("", blog)
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Create blog failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(newBlog),
        headers: {
            "Authorization": auth
        }
    })
}

// #AJAX GET
export function readBlog(blogId, callback) {
    console.log("readBlog");
    if(!blogId) return;

    var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/" + blogId;
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "GET",
        dataType : "json",
        success : function(blog, status, xhr) {
            console.log("Read blog success: ");
            console.log(blog);
            callback("", blog);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Read blog failed : ");
                console.log(err);
                console.log(status);
                callback("error")
            }
        }
    })
}


export function searchBlogs(filters, pageNum, size, callback) {
    if(!filters) callback("error");

    var userId = (filters.userId) ? filters.userId : "";
    var category = (filters.category) ? filters.category : "";

    var filterByUser = (!userId || userId === "") ? false : true;
    pageNum = (pageNum) ? pageNum : 0;
    size = (size) ? size : 5;

    // #AJAX GET all blogs
    function getBlogs(reqUrl) {
        console.log("getBlogs");
        $.ajax({
            url : reqUrl,
            type : "GET",
            dataType : "json",
            success : function(blogs, status, xhr) {
                console.log(reqUrl + " success");
                console.log(blogs);
                callback("", blogs);
            },
            error : function(xhr, status, err) {
                if(err) {
                    console.log(reqUrl + " failure");
                    console.log(err);
                    console.log(status);
                    callback("pageError");
                }
            }
        })
    }

    function readBlogs() {
        // var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs?category=WEB";
        var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs?page=" + pageNum;
        console.log("Read all blogs: ");
        getBlogs(reqUrl);
    }

    function readBlogsByUserId() {
        if(!userId) callback("error");

        // var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs?category=WEB";
        var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/users/" + userId + "&page=" + pageNum;
        console.log("Read blogs by userId: " + userId);
        getBlogs(reqUrl);
    }

    function readBlogsByCategoryAndUser() {
        if(!category || category == "" ) {
            if(filterByUser && userId){
                console.log("Read blogs of user");
                return readBlogsByUserId();
            }
            console.log("Read all blogs");
            return readBlogs();
        }

        var reqUrl = utils.getBaseUrl() + "tecblog/blogs";
        if(filterByUser && userId) {
            reqUrl += "/users/" + userId +  "?category=" + category + "&page=" + pageNum;
            console.log("Read all my blogs for a category: ");
        } else {
            reqUrl += "?category=" +  category + "&page=" + pageNum;
            console.log("Read all blogs by category: ");
        }

        return getBlogs(reqUrl);
    }

    readBlogsByCategoryAndUser(category, filterByUser, userId, pageNum, size, callback);
}


// #AJAX PUT
export function updateBlog(newBlog, auth, callback) {
    console.log(utils.getBaseUrl());
    console.log("updateBlog");

    console.log(newBlog);
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/";
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "PUT",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(blog, status, xhr) {
            console.log("blog updated: ");
            console.log(blog);
            callback("", blog);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("update blog failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(newBlog),
        headers: {
            "Authorization": auth
        }
    })
}

// #AJAX DELETE
export function deleteBlog(blogId, auth, callback) {
    var reqUrl = "" + utils.getBaseUrl() + "tecblog/blogs/"
            + blogId;
    $.ajax({
        url : reqUrl,
        type : "DELETE",
        success : function(blog, status, xhr) {
            console.log("Delete blog success: " + blogId);
            callback("", blog);
            //setSelectedBlogId(undefined);
            //loadForm();
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Delete blog failed : " + blogId);
                console.log(err);
                console.log(status);
                callback("error");
                //setSelectedBlogId(undefined);
                //loadForm();
            }
        },
        headers: {
                "Authorization": auth
        }
    })
}