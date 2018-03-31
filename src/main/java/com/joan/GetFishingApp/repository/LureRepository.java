package com.joan.GetFishingApp.repository;

import com.joan.GetFishingApp.model.Lure;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LureRepository extends MongoRepository<Lure, String> {

}
