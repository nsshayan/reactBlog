package com.cisco.cmad.blogs.api;

@SuppressWarnings("serial")
public class EntityException extends RuntimeException {

    public EntityException() {
    }

    public EntityException(String message) {
        super(message);
    }

    public EntityException(Throwable cause) {
        super(cause);
    }

    public EntityException(String message, Throwable cause) {
        super(message, cause);
    }

    public EntityException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }

}
