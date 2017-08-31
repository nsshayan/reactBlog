package com.cisco.cmad.blogs.data;

import java.util.List;

import org.bson.types.ObjectId;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.dao.BasicDAO;
import org.mongodb.morphia.query.FindOptions;

import com.cisco.cmad.blogs.api.Blog;
import com.cisco.cmad.blogs.api.EntityException;
import com.cisco.cmad.blogs.api.InvalidEntityException;
import com.cisco.cmad.common.config.ConfigParams;
import com.cisco.cmad.utils.mongo.MongoClientUtils;

public class MongoBlogsDAO extends BasicDAO<Blog, Long> implements BlogsDAO {

    public MongoBlogsDAO() {
        this(Blog.class, MongoClientUtils.getMongoDataStore());
    }

    public MongoBlogsDAO(Class<Blog> entityClass, Datastore ds) {
        super(entityClass, ds);
    }

    @Override
    public void create(Blog blog) {
        ObjectId _id = new ObjectId();
        blog.setBlogId(_id.toHexString());
        save(blog);
    }

    @Override
    public Blog read(String blogId) {
        Blog blog = findOne("_id", blogId);
        return blog;
    }

    @Override
    public List<Blog> readByCategory(String category, int pageNum) {
        if (pageNum < 0)
            throw new IllegalArgumentException();

        FindOptions options = getFindOptions(pageNum);
        List<Blog> blogs = createQuery().filter("category", category).order("-lastUpdatedOn").asList(options);
        return blogs;
    }

    private FindOptions getFindOptions(int pageNum) {
        FindOptions options = new FindOptions();
        options.batchSize(ConfigParams.blogsMaxPageSize);
        options.limit(ConfigParams.blogsMaxPageSize);
        if (pageNum > 0) {
            options.skip(pageNum * ConfigParams.blogsMaxPageSize);
        }
        return options;
    }

    @Override
    public List<Blog> readAllBlogs(int pageNum) {
        if (pageNum < 0)
            throw new IllegalArgumentException();
        FindOptions options = getFindOptions(pageNum);
        List<Blog> blogs = createQuery().order("-lastUpdatedOn").asList(options);
        return blogs;
    }

    @Override
    public List<Blog> readByUserId(String userId, int pageNum) {
        if (pageNum < 0)
            throw new IllegalArgumentException();
        FindOptions options = getFindOptions(pageNum);
        List<Blog> blogs = createQuery().filter("userId", userId).order("-lastUpdatedOn").asList(options);
        return blogs;
    }

    @Override
    public void update(Blog blog) {
        Blog foundBlog = read(blog.getBlogId());
        if (foundBlog == null)
            throw new IllegalArgumentException();
        save(blog);
    }

    @Override
    public void delete(String id) {
        Blog blog = read(id);
        delete(blog);
    }

    @Override
    public Long getCount() {
        return count();
    }

    @Override
    public Long readCountByUserId(String userId) {
        long count = createQuery().filter("author", userId).count();
        return count;
    }

    @Override
    public void deleteAllByUserId(String userId) throws InvalidEntityException, EntityException {
        long count = readCountByUserId(userId);
        int pageNum = 0;
        while (count > 0) {
            List<Blog> blogs = readByUserId(userId, pageNum++);
            if (blogs != null) {
                count = count - blogs.size();
                deleteBlogs(blogs);
            } else {
                break;
            }
        }
    }

    private void deleteBlogs(List<Blog> blogs) {
        for (Blog blog : blogs) {
            delete(blog.getBlogId());
        }
    }
}
