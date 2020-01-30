package com.faculty.wade.notisbackend.DTO;

import lombok.Getter;

@Getter
public class DocumentDTO {
    private Integer entityId;
    private Integer serviceId;
    private Integer documentId;
    private String entityType;
    private String type;
    private String format;
    private String template;
    private Double price;
}
