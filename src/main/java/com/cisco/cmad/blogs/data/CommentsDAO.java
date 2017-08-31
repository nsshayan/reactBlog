package com.cisco.cmad.blogs.data;

import java.util.List;

import com.cisco.cmad.blogs.api.Comment;

public interface CommentsDAO {
    public void create(Comment comment);

    public Comment read(String commentId);

    public List<Comment> readAllByBlogId(String blogId, int pageNum);

    public void update(Comment comment);

    public void delete(String id);

    public void deleteAllByBlogId(String blogId);

    public long readCountByBlogId(String blogId);
}
