package com.mallak.springbootapp.repositories;

import com.mallak.springbootapp.models.Post;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PostRepository extends MongoRepository<Post, String> {

    List<Post> findAllByUserId(String userId);

    List<Post> findAllByPostLikesIdsContaining(String userId);

    List<Post> findAllByPostCommentsIdsContaining(String userId);
}
