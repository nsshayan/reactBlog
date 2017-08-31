export function getBaseUrl() {
    console.log("getBaseUrl");
    var url = window.location.href;
    var arr = url.split("/");
    //console.log(arr);
    var baseUrl = arr[0] + "//" + arr[2] + "/" + arr[3] + "/";
    console.log(baseUrl);
    //return window.location.href.match(/^.*\//)[0];
    return baseUrl;
}

export function addToBrowserCookie(key, value) {
    console.log("addToBrowserCookie");
    $.cookie(key, value);
}

export function removeBrowserCookie(key) {
    console.log("removeBrowserCookie");
    $.removeCookie(key);
}

export function clearBrowserCookie() {
    removeBrowserCookie("selectedBlogId");
    clearAuthCookies();
}
export function getFromBrowserCookie(key) {
    console.log("getFromBrowserCookie");
    return $.cookie(key);
}

export function getSignedInUser() {
    console.log("getSignedInUser");
    return $.cookie("userId");
}

export function getQueryStringParams(paramName) {
    console.log("getQueryStringParams");
    var pageURL = window.location.search.substring(1);
    var urlVariables = pageURL.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] === paramName) {
            return parameterName[1];
        }
    }
}

export function getLocationHash() {
    console.log("getLocationHash");
    var hash = window.location.hash;
    console.log(hash);
    return hash;
}

export function hideAllBlogForms() {
    console.log("hideAllBlogForms");
    $("#homeForm").hide();
    $("#viewBlogForm").hide();
    $("#newBlogForm").hide();
    $("#editBlogForm").hide();
}

export function hideAllUserForms() {
    console.log("hideAllUserForms");
    $("#signinForm").hide();
    $("#signupForm").hide();
    $("#profileForm").hide();
    $("#adminForm").hide();
}

export function initializeMenu() {
    console.log("initializeMenu");
    var signedInUserId = getSignedInUser();
    console.log(signedInUserId);
    if (signedInUserId) {
        $("#profileMenu").show();
        $("#signinMenu").hide();
        $("#signupMenu").hide();
        $("#signoutMenu").show();
        $("#addBlogMenu").show();
        if (signedInUserId === "admin") {
            $("#adminMenu").show();
        } else {
            $("#adminMenu").hide();
        }
    } else {
        $("#profileMenu").hide();
        $("#signinMenu").show();
        $("#signupMenu").show();
        $("#signoutMenu").hide();
        $("#adminMenu").hide();
        $("#addBlogMenu").hide();
    }
}

export function setPageContext(context) {
    console.log("setPageContext : " + context);
    context = (context) ? context : "#homeForm";
    addToBrowserCookie("pageContext", context);
}

export function getPageContext() {
    var context = getFromBrowserCookie("pageContext");
    context = (context) ? context : "#homeForm";
    console.log("getPageContext : " + context);
    return context;
}

export function clearPageContext() {
    removeBrowserCookie("pageContext");
}

export function clearAuthCookies() {
    console.log("clearAuthCookies");
    removeBrowserCookie("Authorization");
    removeBrowserCookie("userId");
}

//var selectedBlogId = undefined;

export function setSelectedBlogId(blogId) {
    addToBrowserCookie("selectedBlogId", blogId);
    //selectedBlogId = blogId;
}

export function getSelectedBlogId() {
    return getFromBrowserCookie("selectedBlogId");
}

var selectedBlogCategory = "";

export function setSelectedCategory(category) {
    $("#searchByCategory").val(category);
    selectedBlogCategory = (category) ? category : "";
}

export function getSelectedCategory() {
    selectedBlogCategory = $("#searchByCategory").val();
    selectedBlogCategory = (selectedBlogCategory) ? selectedBlogCategory : "";
    return selectedBlogCategory;
}

// For Pagination
var maxBlogsPerPage = 5;
var currBlogPageNum = 0;

export function moveToFirstPage() {
    console.log("blogFirstPage: 0");
    currBlogPageNum = 0;
}

export function moveToNextPage() {
    currBlogPageNum++;
    console.log("blogNextPage: " + currBlogPageNum);
}

export function moveToPrevPage() {
    currBlogPageNum = (currBlogPageNum > 0) ?  --currBlogPageNum : 0;
    console.log("blogNextPage: " + currBlogPageNum);
}

export function getCurrentBlogPage() {
    return currBlogPageNum;
}

export function getMaxBlogsPerPage() {
    return maxBlogsPerPage;
}