package com.mallak.socialmediaapp.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Document(collection = "posts")
public class Post {
    private String id;
    private String userId;
    private String body;
    private String image;
    private Integer likes;
    private boolean isEdited;

    public Post(String body, String image, String id, String userId) {
        this.id = id;
        this.body = body;
        this.userId = userId;
        this.image = image;
    }
}
