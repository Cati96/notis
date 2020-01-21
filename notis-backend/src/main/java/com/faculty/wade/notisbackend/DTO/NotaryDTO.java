package com.faculty.wade.notisbackend.DTO;


public class NotaryDTO {
    private String name;

    private Integer authorizationNumber;

    private String phoneNumber;

    public NotaryDTO(String name, Integer authorizationNumber, String phoneNumber) {
        this.name = name;
        this.authorizationNumber = authorizationNumber;
        this.phoneNumber = phoneNumber;
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
}
