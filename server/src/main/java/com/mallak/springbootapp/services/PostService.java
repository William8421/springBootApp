package com.mallak.springbootapp.services;

import com.mallak.springbootapp.models.Comment;
import com.mallak.springbootapp.models.Post;
import com.mallak.springbootapp.repositories.CommentRepository;
import com.mallak.springbootapp.repositories.PostRepository;
import com.mallak.springbootapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
    }

    public ResponseEntity<List<Post>> allPosts() {
        try{
            List<Post> posts = postRepository.findAll();
            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<Post>> getUserPosts(String userId) {
        try {
            List<Post> myPosts = postRepository.findAllByUserId(userId);
            return new ResponseEntity<>(myPosts, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> createPost(Post post) {
        try{
            post.setPostLikesIds(new ArrayList<>());
            post.setCreatedAt(new Date());
            postRepository.save(post);
            return new ResponseEntity<>("Post added", HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> updatePost(Post post) {
        try{
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
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> deletePost(String id) {
        try {
            Post post = postRepository.findById(id).orElse(null);
            List<Comment> allComments = commentRepository.findAllByPostId(post.getId());
            postRepository.deleteById(id);
            commentRepository.deleteAllByPostId(post.getId());
            return new ResponseEntity<>("Post deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> likes(String id, String userId) {
        try {
            Post post = postRepository.findById(id).orElse(null);
            if(post == null){
                return new ResponseEntity<>("post not found", HttpStatus.BAD_REQUEST);
            }
            if (post.getPostLikesIds().contains(userId)) {
                post.setPostLikes(post.getPostLikes() - 1);
                post.getPostLikesIds().remove(userId);
                postRepository.save(post);
                return new ResponseEntity<>("Unliked", HttpStatus.OK);
            } else {
                post.setPostLikes(post.getPostLikes() + 1);
                post.getPostLikesIds().add(userId);
                postRepository.save(post);
                return new ResponseEntity<>("Liked ", HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<Post>> getLikedPostsByUser(String userId) {
        try {
            List<Post> likedPosts = postRepository.findAllByPostLikesIdsContaining(userId);
            return new ResponseEntity<>(likedPosts, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<Post>> getCommentedPostsByUser(String userId) {
        try {
            List<Post> commentedPosts = postRepository.findAllByPostCommentsIdsContaining(userId);;
            return new ResponseEntity<>(commentedPosts, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
