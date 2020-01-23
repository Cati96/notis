package com.faculty.wade.notisbackend.DTO;


import java.util.List;

public class EntityDTO {
    private String name;

    private Integer authorizationNumber;

    private String phoneNumber;

    private List<String> languages;
    public EntityDTO(){

    }
    public EntityDTO(String name, Integer authorizationNumber, String phoneNumber) {
        this.name = name;
        this.authorizationNumber = authorizationNumber;
        this.phoneNumber = phoneNumber;
    }

    public EntityDTO(String name, Integer authorizationNumber, String phoneNumber, List<String> languages) {
        this.name = name;
        this.authorizationNumber = authorizationNumber;
        this.phoneNumber = phoneNumber;
        this.languages = languages;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAuthorizationNumber() {
        return authorizationNumber;
    }

    public void setAuthorizationNumber(Integer authorizationNumber) {
        this.authorizationNumber = authorizationNumber;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public List<String> getLanguages() {
        return languages;
    }

    public void setLanguages(List<String> languages) {
        this.languages = languages;
    }
}
