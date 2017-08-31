package com.cisco.cmad.utils.mongo;

import org.apache.commons.configuration.PropertiesConfiguration;
import org.mongodb.morphia.Datastore;
import org.mongodb.morphia.Morphia;

import com.cisco.cmad.common.config.AppConfigFactory;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public final class MongoClientUtils {
    private static MongoClient mongoClient = null;
    private static Morphia morphia = null;
    private static Datastore dataStore = null;

    private static MongoClient getMongoClientInstance() {
        if (mongoClient == null) {
            PropertiesConfiguration config = AppConfigFactory.getInstance().getAppConfig();
            String mongoHost = config.getString("mongo.host");
            String mongoPort = config.getString("mongo.port");
            String connStr = mongoHost + ":" + mongoPort;
            mongoClient = new MongoClient(connStr);
        }
        return mongoClient;
    }

    private static Morphia getMorphiaInstance() {
        getMongoClientInstance();
        if (morphia == null) {
            morphia = new Morphia();
        }
        return morphia;
    }

    public static Datastore getMongoDataStore() {
        if (dataStore == null) {
            Morphia morp = getMorphiaInstance();
            PropertiesConfiguration config = AppConfigFactory.getInstance().getAppConfig();
            String dbName = config.getString("mongo.dbName");
            prepareDatabase();
            dataStore = morp.createDatastore(mongoClient, dbName);
        }
        return dataStore;
    }

    public static void prepareDatabase() {
        if (mongoClient == null)
            return;

        PropertiesConfiguration config = AppConfigFactory.getInstance().getAppConfig();
        String dbName = config.getString("mongo.dbName");
        try {
            mongoClient.getDatabase(dbName).getCollection("User");
        } catch (Exception e) {
            // The below line ensure db is created if not already created.
            mongoClient.getDatabase(dbName).createCollection("User");
        }
    }

    @SuppressWarnings("deprecation")
    public static void clearDatabase() {
        getMongoClientInstance();
        PropertiesConfiguration config = AppConfigFactory.getInstance().getAppConfig();
        String dbName = config.getString("mongo.dbName");
        // The below line ensure db is created if not already created.
        prepareDatabase();
        DB db = mongoClient.getDB(dbName);
        DBCollection commentCollection = db.getCollection("Comment");
        DBCollection blogCollection = db.getCollection("Blog");
        DBCollection userCollection = db.getCollection("User");
        commentCollection.drop();
        blogCollection.drop();
        userCollection.drop();
    }

}
