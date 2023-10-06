package com.mallak.springbootapp.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Document(collection = "comments")
@Getter
@Setter
public class Comment {
    private String id;
    private Date createdAt;
    private String postId;
    private String userId;
    private String body;
    private boolean isEdited;
    private Integer commentLikes = 0;
    private List<String> commentLikesIds = new ArrayList<>();
}
