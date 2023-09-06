package com.mallak.socialmediaapp.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String profilePic;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private Integer age;
    private String gender;
    private List<Post> postIds;
}
