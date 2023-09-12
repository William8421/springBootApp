package com.mallak.socialmediaapp.services;

import com.mallak.socialmediaapp.models.Comment;
import com.mallak.socialmediaapp.models.Post;
import com.mallak.socialmediaapp.models.User;
import com.mallak.socialmediaapp.repositories.PostRepository;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final MongoTemplate mongoTemplate;

    public PostService(PostRepository postRepository, MongoTemplate mongoTemplate) {
        this.postRepository = postRepository;
        this.mongoTemplate = mongoTemplate;
    }

    public ResponseEntity<List<Post>> allPosts() {
        List<Post> posts = postRepository.findAll();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }





    public ResponseEntity<List<Post>> getUserPosts(String userId) {
        List<Post> myPosts = postRepository.findAllByUserId(userId);
        return new ResponseEntity<>(myPosts, HttpStatus.OK);
    }

    public ResponseEntity<String> updatePost(Post post) {
        Post oldPost = postRepository.findById(post.getId()).orElse(null);
        if(oldPost == null){
            return new ResponseEntity<>("Post not found", HttpStatus.BAD_REQUEST);
        }else{
            if(post.getBody() != null){
                oldPost.setBody(post.getBody());
            }
            if(post.getImage() != null){
                oldPost.setImage(post.getImage());
            }
            oldPost.setEdited(true);
            postRepository.save(oldPost);
            return new ResponseEntity<>("Post updated successfully", HttpStatus.OK);
        }
    }

    public ResponseEntity<String> deletePost(String id) {
        try{
            postRepository.deleteById(id);
            return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<Post> createPost(Post post) {
        Post newPost = postRepository.save(post);
        return new ResponseEntity<>(newPost, HttpStatus.OK);
    }
}
