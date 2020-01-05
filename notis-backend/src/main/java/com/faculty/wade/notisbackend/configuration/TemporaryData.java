package com.faculty.wade.notisbackend.configuration;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Document;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.model.Translator;

public class TemporaryData {

	public static List<Notary> notaries = new ArrayList<>();
	public static List<Translator> translators = new ArrayList<>();
	public static List<Service> notaryServices = new ArrayList<>();
	public static List<Service> translatorServices = new ArrayList<>();
	public static List<Document> documents = new ArrayList<>();
	public static List<Address> addresses = new ArrayList<>();
	public static Timetable timetable = new Timetable(0, "monday-schedule", "tuesday-schedule", "wednesday-schedule",
			"thursday-schedule", "friday-schedule", "saturday-schedule", "sunday-schedule");

	static {
		/*
		 * set addresses
		 */
		Address address = null;
		address = new Address();
		address.setId(1);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Petre Tutea");
		address.setStreetNumber("20");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(2);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Lac Cerbu Barnova");
		address.setStreetNumber("");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(3);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Visan");
		address.setStreet("Sfantul Ilie");
		address.setStreetNumber("95");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(4);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Bulevardul Stefan cel Mare si Sfant");
		address.setStreetNumber("1");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(5);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Palas");
		address.setStreetNumber("5C");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(6);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Bulevardul Socola");
		address.setStreetNumber("208");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(7);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Bulevardul Socola");
		address.setStreetNumber("");
		address.setOthers("-");
		addresses.add(address);

		address = new Address();
		address.setId(8);
		address.setCountry("Romania");
		address.setCounty("Romania");
		address.setCity("Iasi");
		address.setStreet("Pocreaca");
		address.setStreetNumber("");
		address.setOthers("-");
		addresses.add(address);

		/*
		 * set documents
		 */
		Document document = null;
		for (int i = 0; i < 3; i++) {
			document = new Document(i, "Type" + i, "Format" + i, null, 12.0);
			documents.add(document);
		}

		/*
		 * set services for notaries
		 */
		Service service = null;
		for (int i = 0; i < 13; i++) {
			service = new Service();
			service.setId(i);
			service.setType("Type" + i);
			service.setDescription("Description" + i);
			service.setDocuments(documents);
			notaryServices.add(service);
			translatorServices.add(service);
		}

		/*
		 * set services for translators
		 */
		for (int i = 0; i < 13; i++) {
			service = new Service();
			service.setId(i);
			service.setType("Type" + i);
			service.setDescription("Description" + i);
			service.setDocuments(documents);
			notaryServices.add(service);
			translatorServices.add(service);
		}

		/*
		 * set notaries and translators
		 */

		Notary notary = null;
		Translator translator = null;
		for (int i = 0; i < 9; i++) {
			notary = new Notary();
			notary.setId(i);
			notary.setAddress(addresses.get((int) (Math.random() * 8)));
			notary.setAuthorizationNumber("authorization" + i);
			notary.setName("Chilaboc Ecaterina " + i);
			notary.setPhoneNumber("phone " + i);
			notary.setServices(notaryServices);
			notary.setTimetable(timetable);
			notaries.add(notary);

			translator = new Translator();
			translator.setId(i);
			translator.setAddress(addresses.get((int) (Math.random() * 8)));
			translator.setAuthorizationNumber("authorization" + i);
			translator.setName("Chilaboc Ecaterina-Mihaela " + i);
			translator.setPhoneNumber("phone " + i);
			translator.setTimetable(timetable);
			translator.setLanguages(Arrays.asList("English", "German"));
			translator.setServices(translatorServices);
			translators.add(translator);

		}
	}
}
