package com.cisco.cmad.blogs.data;

import java.util.List;
import java.util.logging.Logger;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;

import com.cisco.cmad.blogs.api.User;
import com.cisco.cmad.utils.jwt.PasswordUtils;
import com.cisco.cmad.utils.mongo.MongoClientUtils;

public class MongoUsersDAO extends BasicDAO<User, Long> implements UsersDAO {

    // Set logger
    private Logger logger = Logger.getLogger(getClass().getName());

    public MongoUsersDAO() {
        this(User.class, MongoClientUtils.getMongoDataStore());
    }

    public MongoUsersDAO(Class<User> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

    @Override
    public void create(User user) {
        ObjectId _id = new ObjectId();
        user.setId(_id.toHexString());
        user.setPassword(PasswordUtils.encryptPassword(user.getPassword()));
        save(user);
    }

    @Override
    public User read(String userId) {
        User user = createQuery().field("userId").contains(userId).get();
        return user;
    }

    @Override
    public User readByUserIdAndPassword(String userId, String password) {
        String encryptedPassword = PasswordUtils.encryptPassword(password);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++");
        logger.info(encryptedPassword);
        logger.info("+++++++++++++++++++++++++++++++++++++++++++++++++");
        User user = createQuery().field("userId").contains(userId).field("password").contains(encryptedPassword).get();
        return user;
    }

    @Override
    public List<User> readAllUsers() {
        List<User> userList = createQuery().asList();
        return userList;
    }

    @Override
    public void update(User user) {
        User foundUser = read(user.getUserId());
        if (foundUser == null)
            throw new IllegalArgumentException();
        user.setPassword(PasswordUtils.encryptPassword(user.getPassword()));
        save(user);
    }

    @Override
    public void delete(String userId) {
        User user = read(userId);
        delete(user);
    }

    @Override
    public Long getCount() {
        return count();
    }
}
