package com.mallak.socialmediaapp.controllers;

import com.mallak.socialmediaapp.models.Post;
import com.mallak.socialmediaapp.services.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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

    @PostMapping("addpost")
    public ResponseEntity<Post> addPost(@RequestBody Post post){
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
}
