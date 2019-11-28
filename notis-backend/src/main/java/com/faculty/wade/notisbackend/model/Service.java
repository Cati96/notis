package com.faculty.wade.notisbackend.model;

import java.util.List;

public class Service {

	private Integer id;

	private String type;

	private String description;

	private List<Document> documents;

	public Service() {
		super();
	}

	public Service(Integer id, String type, String description, List<Document> documents) {
		super();
		this.id = id;
		this.type = type;
		this.description = description;
		this.documents = documents;
	}

	public Service(String type, String description, List<Document> documents) {
		super();
		this.type = type;
		this.description = description;
		this.documents = documents;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Document> getDocuments() {
		return documents;
	}

	public void setDocuments(List<Document> documents) {
		this.documents = documents;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Service [id=");
		builder.append(id);
		builder.append(", type=");
		builder.append(type);
		builder.append(", description=");
		builder.append(description);
		builder.append(", documents=");
		builder.append(documents);
		builder.append("]");
		return builder.toString();
	}
}
