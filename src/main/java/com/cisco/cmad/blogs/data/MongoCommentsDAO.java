package com.cisco.cmad.blogs.data;

import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.FindOptions;

import com.cisco.cmad.blogs.api.Comment;
import com.cisco.cmad.common.config.ConfigParams;
import com.cisco.cmad.utils.mongo.MongoClientUtils;

public class MongoCommentsDAO extends BasicDAO<Comment, Long> implements CommentsDAO {

    public MongoCommentsDAO() {
        this(Comment.class, MongoClientUtils.getMongoDataStore());
    }

    public MongoCommentsDAO(Class<Comment> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

    @Override
    public void create(Comment comment) {
        ObjectId _id = new ObjectId();
        comment.setCommentId(_id.toHexString());
        save(comment);
    }

    @Override
    public Comment read(String commentId) {
        Comment comment = findOne("_id", commentId);
        return comment;
    }

    @Override
    public List<Comment> readAllByBlogId(String blogId, int pageNum) {
        if (pageNum < 0)
            throw new IllegalArgumentException();

        FindOptions options = getFindOptions(pageNum);
        List<Comment> comments = createQuery().filter("blog", blogId).order("-lastUpdatedOn").asList(options);
        return comments;
    }

    private FindOptions getFindOptions(int pageNum) {
        FindOptions options = new FindOptions();
        options.batchSize(ConfigParams.commentsMaxPageSize);
        options.limit(ConfigParams.commentsMaxPageSize);
        if (pageNum > 0) {
            options.skip(pageNum * ConfigParams.commentsMaxPageSize);
        }
        return options;
    }

    @Override
    public void update(Comment comment) {
        Comment foundComment = read(comment.getCommentId());
        if (foundComment == null)
            throw new IllegalArgumentException();
        save(comment);
    }

    @Override
    public void delete(String commentId) {
        Comment comment = read(commentId);
        delete(comment);
    }

    @Override
    public void deleteAllByBlogId(String blogId) {
        deleteByQuery(createQuery().filter("blog", blogId));
    }

    @Override
    public long readCountByBlogId(String blogId) {
        long count = createQuery().filter("blog", blogId).count();
        return count;
    }

}
