package com.faculty.wade.notisbackend.model;

import java.util.HashMap;
import java.util.Map;

public enum EntityType {

	NOTARY("notary"), TRANSLATOR("translator");

	private final String type;

	private final static Map<String, EntityType> entities = new HashMap<>();

	static {
		for (EntityType type : EntityType.values()) {
			entities.put(type.getEntityType(), type);
		}
	}

	private EntityType(String type) {
		this.type = type;
	}

	public static EntityType getEntityType(String type) {
		return entities.get(type);
	}

	private String getEntityType() {
		return type;
	}
}
