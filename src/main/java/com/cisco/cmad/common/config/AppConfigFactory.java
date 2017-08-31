package com.cisco.cmad.common.config;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;

public class AppConfigFactory {
    private static AppConfigFactory appConfig = null;
    private static PropertiesConfiguration configProps = null;
    private static final String APP_PROPERTIES_FILENAME = "application.properties";

    static {
        appConfig = new AppConfigFactory();
    }

    public static AppConfigFactory getInstance() {
        return appConfig;
    }

    private static void loadConfig() throws ConfigurationException {
        if (appConfig == null)
            throw new ConfigurationException();

        if (configProps == null) {
            configProps = new PropertiesConfiguration();
            configProps.load(APP_PROPERTIES_FILENAME);
        }
    }

    public PropertiesConfiguration getAppConfig() {
        try {
            loadConfig();
        } catch (ConfigurationException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return configProps;
    }
}
