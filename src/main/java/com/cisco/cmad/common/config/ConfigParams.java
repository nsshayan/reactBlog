package com.cisco.cmad.common.config;

import java.util.logging.Logger;

import org.apache.commons.configuration.PropertiesConfiguration;

public class ConfigParams {
    private final static Logger logger = Logger.getLogger("ConfigParams");

    private final static Integer USERS_DEFAULT_MAX_PAGE_SIZE = 10;
    private final static Integer BLOGS_DEFAULT_MAX_PAGE_SIZE = 5;
    private final static Integer COMMENTS_DEFAULT_MAX_PAGE_SIZE = 3;
    private final static Long JWT_DEFAULT_TIMEOUT = 20L;

    public final static String mongoHost;
    public final static String mongoPort;
    public final static String mongoDbName;
    public final static Integer usersMaxPageSize;
    public final static Integer blogsMaxPageSize;
    public final static Integer commentsMaxPageSize;
    public final static Long jwtTimeout;
    public final static Boolean jwtEnabled;
    public final static Boolean encryptPassword;

    // private static final AppConfigFactory appConfigFactory = new
    // AppConfigFactory();

    static {
        PropertiesConfiguration props = AppConfigFactory.getInstance().getAppConfig();
        Boolean flag;
        Integer pageSize;
        mongoHost = props.getString("mongo.host");
        mongoPort = props.getString("mongo.port");
        mongoDbName = props.getString("mongo.dbName");
        if (mongoHost == null || mongoHost.isEmpty() || mongoPort == null || mongoPort.isEmpty() || mongoDbName == null
                || mongoDbName.isEmpty()) {
            logger.warning("Mongo Connection Detail(s) not defined");
        }
        pageSize = props.getInt("users.max.page.size");
        usersMaxPageSize = (pageSize == null) ? USERS_DEFAULT_MAX_PAGE_SIZE : pageSize;
        pageSize = props.getInt("blogs.max.page.size");
        blogsMaxPageSize = (pageSize == null) ? BLOGS_DEFAULT_MAX_PAGE_SIZE : pageSize;
        pageSize = props.getInt("comments.max.page.size");
        commentsMaxPageSize = (pageSize == null) ? COMMENTS_DEFAULT_MAX_PAGE_SIZE : pageSize;
        Long timeout = props.getLong("jwt.timeout");
        jwtTimeout = (timeout == null) ? JWT_DEFAULT_TIMEOUT : timeout;
        flag = props.getBoolean("jwt.auth.enabled");
        jwtEnabled = (flag == null) ? new Boolean(false) : flag;
        flag = props.getBoolean("users.encrypt.password");
        encryptPassword = (flag == null) ? new Boolean(false) : flag;
    }
}
