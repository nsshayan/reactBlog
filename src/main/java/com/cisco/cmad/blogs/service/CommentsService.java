package com.cisco.cmad.blogs.service;

import java.util.List;

import com.cisco.cmad.blogs.api.Comment;
import com.cisco.cmad.blogs.api.Comments;
import com.cisco.cmad.blogs.api.DataNotFoundException;
import com.cisco.cmad.blogs.api.DuplicateEntityException;
import com.cisco.cmad.blogs.api.EntityException;
import com.cisco.cmad.blogs.api.InvalidEntityException;
import com.cisco.cmad.blogs.data.CommentsDAO;
import com.cisco.cmad.blogs.data.MongoCommentsDAO;

public class CommentsService implements Comments {
    private CommentsDAO dao = new MongoCommentsDAO();

    private static CommentsService commentsService = null;

    private CommentsService() {
    }

    public static CommentsService getInstance() {
        if (commentsService == null) {
            commentsService = new CommentsService();
        }
        return commentsService;
    }

    @Override
    public void create(Comment comment) throws InvalidEntityException, DuplicateEntityException, EntityException {
        if (comment == null)
            throw new InvalidEntityException();
        // if (dao.read(blog.getIsbn()) != null)
        // throw new DuplicateBlogException();
        dao.create(comment);
    }

    @Override
    public Comment read(String commentId) throws DataNotFoundException, EntityException {
        Comment comment = dao.read(commentId);
        if (comment == null)
            throw new DataNotFoundException();
        return comment;
    }

    @Override
    public Comment update(Comment updatedComment)
            throws InvalidEntityException, DataNotFoundException, EntityException {
        if (updatedComment == null)
            throw new InvalidEntityException();

        try {
            dao.update(updatedComment);
        } catch (Exception e) {
            throw new EntityException();
        }
        return updatedComment;
    }

    @Override
    public void delete(String id) throws EntityException {
        read(id);
        try {
            dao.delete(id);
        } catch (Exception e) {
            e.printStackTrace();
            throw new EntityException();
        }
    }

    @Override
    public List<Comment> readAllByBlogId(String blogId, int pageNum) throws DataNotFoundException, EntityException {
        List<Comment> comments = dao.readAllByBlogId(blogId, pageNum);
        if (comments == null)
            throw new DataNotFoundException();
        return comments;
    }

    @Override
    public long readCountByBlogId(String blogId) throws DataNotFoundException, EntityException {
        long count = dao.readCountByBlogId(blogId);
        return count;
    }

    @Override
    public void deleteAllByBlogId(String blogId) throws EntityException {
        long count = dao.readCountByBlogId(blogId);
        int pageNum = 0;
        while (count > 0) {
            List<Comment> comments = dao.readAllByBlogId(blogId, pageNum++);
            if (comments != null) {
                count = count - comments.size();
                deleteComments(comments);
            } else {
                break;
            }
        }
    }

    private void deleteComments(List<Comment> comments) {
        for (Comment comment : comments) {
            delete(comment.getCommentId());
        }
    }

}
