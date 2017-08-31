package com.cisco.cmad.blogs.api;

import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.PrePersist;
import org.mongodb.morphia.annotations.Property;

@Entity
public class Comment {
    @Id
    @Property("_id")
    private String commentId;

    private String commentText;

    private Date lastUpdatedOn;

    // @Reference(idOnly = true)
    private String addedBy;

    // @Reference(idOnly = true)
    private String blog;

    public Comment() {
        super();
    }

    @PrePersist
    public void prePersist() {
        this.lastUpdatedOn = new Date();
    }

    public String getCommentId() {
        return commentId;
    }

    public Comment setCommentId(String id) {
        this.commentId = id;
        return this;
    }

    public String getCommentText() {
        return commentText;
    }

    public Comment setCommentText(String text) {
        this.commentText = text;
        return this;
    }

    public Date getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public Comment setLastUpdatedOn(Date lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
        return this;
    }

    public String getBlog() {
        return blog;
    }

    public Comment setBlog(String blogId) {
        this.blog = blogId;
        return this;
    }

    public String getAddedBy() {
        return addedBy;
    }

    public Comment setAddedBy(String addedBy) {
        this.addedBy = addedBy;
        return this;
    }
}
