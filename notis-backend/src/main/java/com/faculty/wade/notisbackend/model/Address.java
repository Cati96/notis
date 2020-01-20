package com.faculty.wade.notisbackend.model;

public class Address {

	private Integer id;

	private String country;

	private String county;

	private String city;
	
	private String locality;

	private String street;

	private String streetNumber;
	
	private String zipCode;

	private String others;

	public Address() {
		super();
	}

	public Address(Integer id, String country, String county, String city, String locality, String street, String streetNumber,
			String zipCode, String others) {
		super();
		this.id = id;
		this.country = country;
		this.county = county;
		this.city = city;
		this.locality= locality;
		this.street = street;
		this.streetNumber = streetNumber;
		this.zipCode=zipCode;
		this.others = others;
	}

	public Address(String country, String county, String city, String locality, String street, String streetNumber,
			String zipCode, String others) {
		super();
		this.country = country;
		this.county = county;
		this.city = city;
		this.locality= locality;
		this.street = street;
		this.streetNumber = streetNumber;
		this.zipCode=zipCode;
		this.others = others;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCounty() {
		return county;
	}

	public void setCounty(String county) {
		this.county = county;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStreet() {
		return street;
	}

	public void setStreet(String street) {
		this.street = street;
	}

	public String getStreetNumber() {
		return streetNumber;
	}

	public void setStreetNumber(String streetNumber) {
		this.streetNumber = streetNumber;
	}

	public String getOthers() {
		return others;
	}

	public void setOthers(String others) {
		this.others = others;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Address [id=");
		builder.append(id);
		builder.append(", country=");
		builder.append(country);
		builder.append(", county=");
		builder.append(county);
		builder.append(", city=");
		builder.append(city);
		builder.append(", locality=");
		builder.append(locality);
		builder.append(", street=");
		builder.append(street);
		builder.append(", streetNumber=");
		builder.append(streetNumber);
		builder.append(", zipCode=");
		builder.append(zipCode);
		builder.append(", others=");
		builder.append(others);
		builder.append("]");
		return builder.toString();
	}
}
