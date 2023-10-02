package com.mallak.socialmediaapp.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "comments")
@Getter
@Setter
public class Comment {
    private String id;
    private String postId;
    private String userId;
    private String userPicture;
    private String commentOwner;
    private String commentOwnerName;
    private String body;
    private boolean isEdited;
    private Integer commentLikes = 0;
    private List<String> commentLikesIds = new ArrayList<>();
    private List<String> commentLikedBy = new ArrayList<>();
}
