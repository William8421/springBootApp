package com.mallak.springbootapp.services;

import com.mallak.springbootapp.models.Comment;
import com.mallak.springbootapp.models.Post;
import com.mallak.springbootapp.models.User;
import com.mallak.springbootapp.repositories.CommentRepository;
import com.mallak.springbootapp.repositories.PostRepository;
import com.mallak.springbootapp.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository,
            UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public ResponseEntity<String> createComment(String userId, String postId, String body) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            Post post = postRepository.findById(postId).orElse(null);

            if (post == null) {
                return new ResponseEntity<>("post not found", HttpStatus.BAD_REQUEST);
            }
            if (user != null) {
                Comment comment = new Comment();
                comment.setBody(body);
                comment.setPostId(postId);
                comment.setUserId(userId);
                comment.setCreatedAt(new Date());
                commentRepository.save(comment);
                post.setPostComments(post.getPostComments() + 1);
                post.getPostCommentsIds().add(user.getId());
                postRepository.save(post);
            }
            return new ResponseEntity<>("Comment added", HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<List<Comment>> getAllPostComments(String postId) {
        try {
            List<Comment> allComments = commentRepository.findAllByPostId(postId);
            return new ResponseEntity<>(allComments, HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> updateComment(Comment comment) {
        try {
            Comment oldComment = commentRepository.findById(comment.getId()).orElse(null);
            if (oldComment == null) {
                return new ResponseEntity<>("comment not found", HttpStatus.BAD_REQUEST);
            } else {
                oldComment.setBody(comment.getBody());
                oldComment.setEdited(true);
                commentRepository.save(oldComment);
                return new ResponseEntity<>("Comment updated successfully", HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public ResponseEntity<String> deleteComment(String id, String postId) {
        try {
            Post post = postRepository.findById(postId).orElse(null);
            Comment comment = commentRepository.findById(id).orElse(null);

            if ((post != null) && (comment != null)) {
                if (post.getPostCommentsIds().contains(comment.getUserId())) {
                    post.setPostComments(post.getPostComments() - 1);
                    post.getPostCommentsIds().remove(comment.getUserId());
                }
                postRepository.save(post);
            }
            commentRepository.deleteById(id);
            return new ResponseEntity<>("Comment deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public ResponseEntity<String> commentLikes(String id, String userId) {
        try {
            Comment comment = commentRepository.findById(id).orElse(null);
            if (comment == null) {
                return new ResponseEntity<>("Comment not found", HttpStatus.BAD_REQUEST);
            }
            if (comment.getCommentLikesIds().contains(userId)) {
                comment.setCommentLikes(comment.getCommentLikes() - 1);
                comment.getCommentLikesIds().remove(userId);
                commentRepository.save(comment);
                return new ResponseEntity<>("Unliked", HttpStatus.OK);
            } else {
                comment.setCommentLikes(comment.getCommentLikes() + 1);
                comment.getCommentLikesIds().add(userId);
                commentRepository.save(comment);
                return new ResponseEntity<>("Liked", HttpStatus.OK);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
