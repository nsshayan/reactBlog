package com.cisco.cmad.blogs.api;

import java.util.List;

public interface Comments {
    public void create(Comment comment) throws InvalidEntityException, DuplicateEntityException, EntityException;

    public Comment read(String commentId) throws DataNotFoundException, EntityException;

    public List<Comment> readAllByBlogId(String blogId, int pageNum) throws DataNotFoundException, EntityException;

    public Comment update(Comment comment) throws DataNotFoundException, EntityException;

    public void delete(String commentId) throws EntityException;

    public void deleteAllByBlogId(String blogId) throws EntityException;

    public long readCountByBlogId(String commentId) throws DataNotFoundException, EntityException;
}
