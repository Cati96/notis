package com.faculty.wade.notisbackend.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class EntityObject {
	private Integer id;

	private String entityType;

	private String name;

	private Integer authorizationNumber;

	private String phoneNumber;

	private Address address;

	private String timetable;

	private String services;

	private String languages;
}
