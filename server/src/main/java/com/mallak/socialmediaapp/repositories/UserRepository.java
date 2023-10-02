package com.mallak.socialmediaapp.repositories;

import com.mallak.socialmediaapp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    User findByUsername(String username);

}
