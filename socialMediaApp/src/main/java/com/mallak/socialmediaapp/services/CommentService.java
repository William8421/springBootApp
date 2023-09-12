package com.mallak.socialmediaapp.services;

import com.mallak.socialmediaapp.models.Comment;
import com.mallak.socialmediaapp.repositories.CommentRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;;
    }


    public ResponseEntity<Comment> createComment(Comment comment) {
        Comment newComment =  commentRepository.save(comment);
        return new ResponseEntity<>(newComment, HttpStatus.CREATED);
    }

    public ResponseEntity<List<Comment>> findAllComments(String postId) {
        List<Comment> allComments = commentRepository.findAllByPostId(postId);
        return new ResponseEntity<>(allComments, HttpStatus.OK);
    }
}
