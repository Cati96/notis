package com.faculty.wade.notisbackend.model;

public class Review {

	private Integer id;

	private Double points;

	private String username;

	private String comment;

	private EntityType entityType;

	private Integer entityTypeId;

	public Review() {
		super();
	}

	public Review(Integer id, Double points, String username, String comment, EntityType entityType,
			Integer entityTypeId) {
		super();
		this.id = id;
		this.points = points;
		this.username = username;
		this.comment = comment;
		this.entityType = entityType;
		this.entityTypeId = entityTypeId;
	}

	public Review(Double points, String username, String comment, EntityType entityType, Integer entityTypeId) {
		super();
		this.points = points;
		this.username = username;
		this.comment = comment;
		this.entityType = entityType;
		this.entityTypeId = entityTypeId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Double getPoints() {
		return points;
	}

	public void setPoints(Double points) {
		this.points = points;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public EntityType getEntityType() {
		return entityType;
	}

	public void setEntityType(EntityType entityType) {
		this.entityType = entityType;
	}

	public Integer getEntityTypeId() {
		return entityTypeId;
	}

	public void setEntityTypeId(Integer entityTypeId) {
		this.entityTypeId = entityTypeId;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Review [id=");
		builder.append(id);
		builder.append(", points=");
		builder.append(points);
		builder.append(", username=");
		builder.append(username);
		builder.append(", comment=");
		builder.append(comment);
		builder.append(", entityType=");
		builder.append(entityType);
		builder.append(", entityTypeId=");
		builder.append(entityTypeId);
		builder.append("]");
		return builder.toString();
	}
}
