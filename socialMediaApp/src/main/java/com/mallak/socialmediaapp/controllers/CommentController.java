package com.mallak.socialmediaapp.controllers;

import com.mallak.socialmediaapp.models.Comment;
import com.mallak.socialmediaapp.services.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("addcomment")
    public ResponseEntity<Comment> addComment(@RequestBody Comment comment){
        return commentService.createComment(comment);
    }

    @GetMapping("postcomments")
    public ResponseEntity<List<Comment>> getPostComments(@RequestBody Comment comment){
        return commentService.findAllComments(comment.getPostId());
    }
}
