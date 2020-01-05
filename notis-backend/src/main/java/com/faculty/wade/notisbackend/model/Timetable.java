package com.faculty.wade.notisbackend.model;

public class Timetable {

	private Integer id;

	private String monday;

	private String tuesday;

	private String wednesday;

	private String thursday;

	private String friday;

	private String saturday;

	private String sunday;

	public Timetable() {
		super();
	}

	public Timetable(Integer id, String monday, String tuesday, String wednesday, String thursday, String friday,
			String saturday, String sunday) {
		super();
		this.id = id;
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		this.sunday = sunday;
	}

	public Timetable(String monday, String tuesday, String wednesday, String thursday, String friday, String saturday,
			String sunday) {
		super();
		this.monday = monday;
		this.tuesday = tuesday;
		this.wednesday = wednesday;
		this.thursday = thursday;
		this.friday = friday;
		this.saturday = saturday;
		this.sunday = sunday;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getMonday() {
		return monday;
	}

	public void setMonday(String monday) {
		this.monday = monday;
	}

	public String getTuesday() {
		return tuesday;
	}

	public void setTuesday(String tuesday) {
		this.tuesday = tuesday;
	}

	public String getWednesday() {
		return wednesday;
	}

	public void setWednesday(String wednesday) {
		this.wednesday = wednesday;
	}

	public String getThursday() {
		return thursday;
	}

	public void setThursday(String thursday) {
		this.thursday = thursday;
	}

	public String getFriday() {
		return friday;
	}

	public void setFriday(String friday) {
		this.friday = friday;
	}

	public String getSaturday() {
		return saturday;
	}

	public void setSaturday(String saturday) {
		this.saturday = saturday;
	}

	public String getSunday() {
		return sunday;
	}

	public void setSunday(String sunday) {
		this.sunday = sunday;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("Timetable [id=");
		builder.append(id);
		builder.append(", monday=");
		builder.append(monday);
		builder.append(", tuesday=");
		builder.append(tuesday);
		builder.append(", wednesday=");
		builder.append(wednesday);
		builder.append(", thursday=");
		builder.append(thursday);
		builder.append(", friday=");
		builder.append(friday);
		builder.append(", saturday=");
		builder.append(saturday);
		builder.append(", sunday=");
		builder.append(sunday);
		builder.append("]");
		return builder.toString();
	}
}
