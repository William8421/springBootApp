package com.mallak.socialmediaapp.repositories;

import com.mallak.socialmediaapp.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {

    User findByEmail(String email);

    User findByUsername(String username);
}
