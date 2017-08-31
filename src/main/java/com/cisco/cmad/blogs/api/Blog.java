package com.cisco.cmad.blogs.api;

import java.util.Date;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.PrePersist;
import org.mongodb.morphia.annotations.Property;
import org.mongodb.morphia.annotations.Reference;
import org.mongodb.morphia.annotations.Validation;

@Entity
@Validation("{ title : { $type : string }," + "blogText : {$type : string }")
public class Blog {

    @Id
    @Property("_id")
    private String blogId;

    private String title;

    private Date lastUpdatedOn;

    private String blogText;

    private String category;

    // @Embedded
    @Reference(idOnly = true)
    private User author;

    @PrePersist
    public void prePersist() {
        this.lastUpdatedOn = new Date();
    }

    public Blog() {
    }

    public String getBlogId() {
        return blogId;
    }

    public Blog setBlogId(String id) {
        this.blogId = id;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Blog setTitle(String title) {
        this.title = title;
        return this;
    }

    public Date getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    public Blog setLastUpdatedOn(Date lastUpdatedOn) {
        this.lastUpdatedOn = lastUpdatedOn;
        return this;
    }

    public String getBlogText() {
        return blogText;
    }

    public Blog setBlogText(String text) {
        this.blogText = text;
        return this;
    }

    public User getAuthor() {
        return author;
    }

    public Blog setAuthor(User author) {
        this.author = author;
        // author.addBlog(this);
        return this;
    }

    public String getCategory() {
        return category;
    }

    public Blog setCategory(String category) {
        this.category = category;
        return this;
    }

}
