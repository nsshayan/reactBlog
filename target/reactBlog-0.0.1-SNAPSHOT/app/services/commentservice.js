// #AJAX POST
export function createComment(newComment, reqUrl, auth, callback) {
    console.log("createComment");
    console.log(newComment);
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "POST",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(comment, status, xhr) {
            console.log("New comment created: ");
            console.log(comment);
            //setSelectedBlogId(blog.blogId);
            callback("", comment);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("Create comment failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(newComment),
        headers: {
            "Authorization": auth
        }
    })
}

// #AJAX PUT
export function updateComment(updatedComment, reqUrl, auth, callback) {
    console.log("updateComment");
    console.log(updatedComment);
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "PUT",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(comment, status, xhr) {
            console.log("comment updated: ");
            console.log(comment);
            //setSelectedBlogId(blog.blogId);
            callback("", comment);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("comment update failed : ");
                console.log(err);
                console.log(status);
                callback("error");
            }
        },
        data : JSON.stringify(updatedComment),
        headers: {
            "Authorization": auth
        }
    })
}

// #AJAX DELETE
export function deleteComment(commentId, reqUrl, auth, callback) {
    console.log("deleteComment");
    console.log(commentId);
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "DELETE",
        dataType : "json",
        contentType : "application/json; charset=utf-8",
        success : function(comment, status, xhr) {
            console.log("comment deleted: ");
            console.log(comment);
            //setSelectedBlogId(blog.blogId);
            callback("", {});
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log("comment delete failed : ");
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

// #AJAX GET blog comments
export function getComments(reqUrl, callback) {
    console.log("getComments");
    console.log(reqUrl);
    $.ajax({
        url : reqUrl,
        type : "GET",
        dataType : "json",
        success : function(comments, status, xhr) {
            console.log(reqUrl + " success");
            console.log(comments);
            var count = xhr.getResponseHeader('count');
            callback("", comments, count);
            //refreshComments(comments, count);
        },
        error : function(xhr, status, err) {
            if(err) {
                console.log(reqUrl + " failure");
                console.log(err);
                console.log(status);
                //refreshComments([], 0);
                callback("error", [], 0);
            }
        }
    })
}