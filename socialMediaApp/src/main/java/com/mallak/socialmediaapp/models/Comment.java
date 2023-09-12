package com.mallak.socialmediaapp.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
@Getter
@Setter
public class Comment {
    private String id;
    private String postId;
    private String body;

//    public Comment(String body, String id, String postId) {
//        this.id = id;
//        this.body = body;
//        this.postId = postId;
//    }
}
