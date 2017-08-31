package com.cisco.cmad.blogs.rest;

import java.util.List;
import java.util.logging.Logger;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.Blogs;
import com.cisco.cmad.blogs.api.Comment;
import com.cisco.cmad.blogs.api.Comments;
import com.cisco.cmad.blogs.api.User;
import com.cisco.cmad.blogs.api.Users;
import com.cisco.cmad.blogs.service.BlogsService;
import com.cisco.cmad.blogs.service.CommentsService;
import com.cisco.cmad.blogs.service.UsersService;

@Path("/blogs")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BlogsController {
    private Users userService = UsersService.getInstance();
    private Blogs blogsService = BlogsService.getInstance();
    private Comments commentsService = CommentsService.getInstance();
    private Logger logger = Logger.getLogger(getClass().getName());

    @POST
    @Path("/")
    @JwtTokenExpected
    public Response create(Blog blog) {
        validateBlogDetails(blog);
        User user = userService.read(blog.getAuthor().getUserId());
        blog.setAuthor(user);
        blogsService.create(blog);
        return Response.ok().entity(blog).build();
    }

    @GET
    @Path("/{blogId}")
    public Response read(@PathParam("blogId") String blogId) {
        if (blogId.isEmpty())
            throw new IllegalArgumentException("invalid Blog ID");
        Blog blog = blogsService.read(blogId);
        return Response.ok().entity(blog).build();
    }

    @GET
    @Path("/")
    public Response read(@Context UriInfo info) {
        // @QueryParam("category") String category) {
        List<Blog> matched;
        GenericEntity<List<Blog>> entities;
        String category = info.getQueryParameters().getFirst("category");
        String pageStr = info.getQueryParameters().getFirst("page");
        int pageNum = (pageStr == null || pageStr.isEmpty()) ? 0 : Integer.parseInt(pageStr);
        if (category == null || category == "") {
            logger.info("BlogsController: readAllBlogs");
            matched = blogsService.readAllBlogs(pageNum);
        } else {
            logger.info("BlogsController: readByCategory : " + category);
            matched = blogsService.readByCategory(category, pageNum);
        }
        entities = new GenericEntity<List<Blog>>(matched) {
        };
        return Response.ok().entity(entities).build();
    }

    @GET
    @Path("/users/{userId}")
    public Response readByUserId(@Context UriInfo info) {
        List<Blog> matched;
        GenericEntity<List<Blog>> entities;
        String userId = info.getPathParameters().getFirst("userId");
        String pageStr = info.getQueryParameters().getFirst("page");
        int pageNum = (pageStr == null || pageStr.isEmpty()) ? 0 : Integer.parseInt(pageStr);
        logger.info("BlogsController: readByUserId : " + userId);
        if (userId.isEmpty())
            throw new IllegalArgumentException("invalid User ID");
        matched = blogsService.readByUserId(userId, pageNum);
        entities = new GenericEntity<List<Blog>>(matched) {
        };
        return Response.ok().entity(entities).build();
    }

    @GET
    @Path("/{blogId}/comments")
    public Response readAllComments(@Context UriInfo info) {
        List<Comment> comments;
        GenericEntity<List<Comment>> entities;
        String blogIdStr = info.getPathParameters().getFirst("blogId");
        String pageStr = info.getQueryParameters().getFirst("page");

        if (blogIdStr.isEmpty())
            throw new IllegalArgumentException("invalid Blog ID");
        long count = commentsService.readCountByBlogId(blogIdStr);
        int pageNum = (pageStr == null || pageStr.isEmpty()) ? 0 : Integer.parseInt(pageStr);
        comments = commentsService.readAllByBlogId(blogIdStr, pageNum);
        entities = new GenericEntity<List<Comment>>(comments) {
        };
        return Response.ok().entity(entities).header("count", count).build();
    }

    @PUT
    @Path("/")
    @JwtTokenExpected
    public Response update(Blog updatedBlog) {
        validateBlogDetails(updatedBlog);
        Blog blog = blogsService.read(updatedBlog.getBlogId());
        blog.setTitle(updatedBlog.getTitle());
        blog.setBlogText(updatedBlog.getBlogText());
        blog.setCategory(updatedBlog.getCategory());
        blogsService.update(blog);
        blog = blogsService.read(blog.getBlogId());
        return Response.ok().entity(blog).build();
    }

    @DELETE
    @Path("/{blogId}")
    @JwtTokenExpected
    public Response delete(@PathParam("blogId") String blogId) {
        if (blogId.isEmpty())
            throw new IllegalArgumentException("invalid Blog ID");
        blogsService.delete(blogId);
        // commentsService.
        return Response.noContent().build();
    }

    private void validateBlogDetails(Blog blog) {
        if (blog.getTitle().isEmpty() || blog.getCategory().isEmpty() || blog.getBlogText().isEmpty()) {
            throw new IllegalArgumentException("blog data is invalid");
        }
    }
}
