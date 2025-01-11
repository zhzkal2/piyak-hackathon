package com.example.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "sns.google")
public class GoogleProperties {
    private String url;
    private Client client;
    private Callback callback;
    private Token token;

    // getters and setters

    public static class Client {
        private String id;
        private String secret;

        // getters and setters
    }

    public static class Callback {
        private String url;

        // getters and setters
    }

    public static class Token {
        private String url;

        // getters and setters
    }
}