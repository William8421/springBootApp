package com.mallak.springbootapp.controllers;

import com.mallak.springbootapp.models.Comment;
import com.mallak.springbootapp.services.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = { "http://localhost:3000", "http://192.168.1.104:3000" })
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/addcomment")
    public ResponseEntity<String> addComment(@RequestBody Map<String, String> payload) {
        return commentService.createComment(payload.get("userId"), payload.get("postId"), payload.get("body"));
    }

    @PostMapping("/postcomments")
    public ResponseEntity<List<Comment>> getPostComments(@RequestBody Map<String, String> payload) {
        return commentService.getAllPostComments(payload.get("postId"));
    }

    @PutMapping("/updatepostcomment")
    public ResponseEntity<String> updatePostComment(@RequestBody Comment comment) {
        return commentService.updateComment(comment);
    }

    @PostMapping("deletecomment")
    public ResponseEntity<String> deletePostComment(@RequestBody Map<String, String> payload) {
        return commentService.deleteComment(payload.get("id"), payload.get("postId"));
    }

    @PostMapping("commentlike")
    public ResponseEntity<String> manageCommentLikes(@RequestBody Map<String, String> payload) {
        return commentService.commentLikes(payload.get("id"), payload.get("userId"));
    }

}
