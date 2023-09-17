package com.mallak.socialmediaapp.controllers;

import com.mallak.socialmediaapp.models.Post;
import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.services.PostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/allposts")
    public ResponseEntity<List<Post>> getAllPosts(){
        return postService.allPosts();
    }

    @PostMapping("/addpost")
    public ResponseEntity<String> addPost(@RequestBody Post post){
        return postService.createPost(post);
    }

    @GetMapping("/userposts")
    public ResponseEntity<List<Post>> getSingleUserPosts(@RequestBody Post post){
        return postService.getUserPosts(post.getUserId());
    }

    @PutMapping("/updatepost")
    public ResponseEntity<String> updateUserPost(@RequestBody Post post){
        return postService.updatePost(post);
    }

    @DeleteMapping("/deletepost")
    public ResponseEntity<String> deleteUserPost(@RequestBody Post post){
        return postService.deletePost(post.getId());
    }

    @PostMapping("postlike")
    public ResponseEntity<String> manageLikes(@RequestBody Map<String, String> payload){
        return postService.likes(payload.get("id"), payload.get("userId"));
    }
}
