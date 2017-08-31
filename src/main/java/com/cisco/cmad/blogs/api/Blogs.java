package com.cisco.cmad.blogs.api;

import java.util.List;

public interface Blogs {
    public void create(Blog blog) throws InvalidEntityException, DuplicateEntityException, EntityException;

    public Blog update(Blog updatedBlog) throws InvalidEntityException, EntityException;

    public void delete(String blogId) throws InvalidEntityException, EntityException;

    public List<Blog> readByCategory(String category, int pageNum) throws DataNotFoundException, EntityException;

    public List<Blog> readAllBlogs(int pageNum) throws DataNotFoundException, EntityException;

    public Blog read(String blogId) throws DataNotFoundException, EntityException;

    public List<Blog> readByUserId(String userId, int pageNum) throws DataNotFoundException, EntityException;

    public Long count();
}
