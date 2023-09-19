package com.mallak.socialmediaapp.repositories;

import com.mallak.socialmediaapp.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface CommentRepository extends MongoRepository<Comment, String> {

    List<Comment> findAllByPostId(String postId);

    void deleteAllByPostId(String id);
}
