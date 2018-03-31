package com.joan.GetFishingApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Lure {

    @Id
    private String id;
    private String fish;
    private String season;
    private String temp;
    private String clarity;
    private String lurelist;
    private String selecttag;

    //CONSTRUCTORS
    protected Lure(){}

    // don't include the id field
    public Lure(String fish, String season, String temp, String clarity, String lurelist, String selecttag) {
        this.fish = fish;
        this.season = season;
        this.temp = temp;
        this.clarity = clarity;
        this.lurelist = lurelist;
        this.selecttag = selecttag;
    }

    //GETTERS AND SETTERS
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFish() {
        return fish;
    }

    public void setFish(String fish) {
        this.fish = fish;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }

    public String getClarity() {
        return clarity;
    }

    public void setClarity(String clarity) {
        this.clarity = clarity;
    }

    public String getLurelist() {
        return lurelist;
    }

    public void setLurelist(String lurelist) {
        this.lurelist = lurelist;
    }

    public String getSelecttag() {
        return selecttag;
    }

    public void setSelecttag(String selecttag) {
        this.selecttag = selecttag;
    }
}
