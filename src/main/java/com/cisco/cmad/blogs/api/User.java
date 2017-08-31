package com.cisco.cmad.blogs.api;

import org.mongodb.morphia.annotations.Entity;
import org.mongodb.morphia.annotations.Id;
import org.mongodb.morphia.annotations.Property;

@Entity
public class User {
    @Id
    @Property("_id")
    private String _id;

    private String userId;

    private String password;

    private String firstName;

    private String lastName;

    private String emailId;

    public User() {
        super();
    }

    public String getUserId() {
        return userId;
    }

    public User setUserId(String userId) {
        this.userId = userId;
        return this;
    }

    public String getId() {
        return _id;
    }

    public User setId(String id) {
        this._id = id;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public User setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public String getLastName() {
        return lastName;
    }

    public User setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public String getFullName() {
        return (lastName.isEmpty()) ? firstName : firstName + " " + lastName;
    }

    public String getEmailId() {
        return emailId;
    }

    public User setEmailId(String emailId) {
        this.emailId = emailId;
        return this;
    }
}