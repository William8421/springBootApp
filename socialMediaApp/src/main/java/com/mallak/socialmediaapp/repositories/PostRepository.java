package com.mallak.socialmediaapp.repositories;

import com.mallak.socialmediaapp.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findAllByUserId(String userId);
}
