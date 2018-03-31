package com.joan.GetFishingApp.controllers;

import com.mongodb.Mongo;
import com.mongodb.client.MongoDatabase;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.swing.text.Document;
import java.util.ArrayList;
import java.util.List;

@Controller
public class BaseController {

    @RequestMapping("/")
    public String baseRoute(){
        return "index";
    }

}
