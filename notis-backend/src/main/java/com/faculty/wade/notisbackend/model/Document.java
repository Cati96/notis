package com.faculty.wade.notisbackend.model;

public class Document {

	private Integer id;

	private String type;

	private String format;

	private String template;

	private Double price;

	public Document() {
		super();
	}

	public Document(Integer id, String type, String format, String template, Double price) {
		super();
		this.id = id;
		this.type = type;
		this.format = format;
		this.template = template;
		this.price = price;
	}

	public Document(String type, String format, String template, Double price) {
		super();
		this.type = type;
		this.format = format;
		this.template = template;
		this.price = price;
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

	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}

	public String getTemplate() {
		return template;
	}

	public void setTemplate(String template) {
		this.template = template;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Document [id=");
		builder.append(id);
		builder.append(", type=");
		builder.append(type);
		builder.append(", format=");
		builder.append(format);
		builder.append(", template=");
		builder.append(template);
		builder.append(", price=");
		builder.append(price);
		builder.append("]");
		return builder.toString();
	}
}
