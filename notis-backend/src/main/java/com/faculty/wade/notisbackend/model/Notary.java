package com.faculty.wade.notisbackend.model;

import java.util.List;

public class Notary {

	private Integer id;

	private String name;

	private String authorizationNumber;

	private String phoneNumber;

	private Address address;

	private Timetable timetable;

	private List<Service> services;

	public Notary() {
		super();
	}

	public Notary(Integer id, String name, String authorizationNumber, String phoneNumber, Address address,
			Timetable timetable, List<Service> services) {
		super();
		this.id = id;
		this.name = name;
		this.authorizationNumber = authorizationNumber;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.timetable = timetable;
		this.services = services;
	}

	public Notary(String name, String authorizationNumber, String phoneNumber, Address address, Timetable timetable,
			List<Service> services) {
		super();
		this.name = name;
		this.authorizationNumber = authorizationNumber;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.timetable = timetable;
		this.services = services;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAuthorizationNumber() {
		return authorizationNumber;
	}

	public void setAuthorizationNumber(String authorizationNumber) {
		this.authorizationNumber = authorizationNumber;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Timetable getTimetable() {
		return timetable;
	}

	public void setTimetable(Timetable timetable) {
		this.timetable = timetable;
	}

	public List<Service> getServices() {
		return services;
	}

	public void setServices(List<Service> services) {
		this.services = services;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Notary [id=");
		builder.append(id);
		builder.append(", name=");
		builder.append(name);
		builder.append(", authorizationNumber=");
		builder.append(authorizationNumber);
		builder.append(", phoneNumber=");
		builder.append(phoneNumber);
		builder.append(", address=");
		builder.append(address);
		builder.append(", timetable=");
		builder.append(timetable);
		builder.append(", services=");
		builder.append(services);
		builder.append("]");
		return builder.toString();
	}
}
