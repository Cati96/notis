package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Document;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.model.Translator;

@RestController
@RequestMapping("/test")
public class TestController {

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllNotaries")
	public List<Notary> getAllNotaries() {
		List<Notary> notaries = new ArrayList<>();
		Notary notary = null;
		for (int i = 0; i < 9; i++) {
			notary = new Notary();
			notary.setId(i);
			notary.setAddress(null);
			notary.setAuthorizationNumber("test" + i);
			notary.setName("test" + i);
			notary.setPhoneNumber("test" + i);
			notary.setServices(new ArrayList<>());
			notary.setTimetable(null);
			notaries.add(notary);
		}
		Service service = new Service(0, "Service Test 1", "Description Test 1", new ArrayList<>());
		List<Service> services = new ArrayList<>();
		services.add(service);

		notary = new Notary();
		notary.setId(10);
		notary.setAddress(
				new Address(0, "country-test", "county-test", "city-test", "street-test", "street-nr-test", ""));
		notary.setAuthorizationNumber("test" + 10);
		notary.setName("test" + 10);
		notary.setPhoneNumber("test" + 10);
		notary.setServices(services);
		notary.setTimetable(new Timetable(0, "monday-schedule", "tuesday-schedule", "wednesday-schedule",
				"thursday-schedule", "friday-schedule", "saturday-schedule", "sunday-schedule"));
		notaries.add(notary);

		return notaries;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllTranslators")
	public List<Translator> getAllTranslators() {
		List<Translator> translators = new ArrayList<>();
		List<Service> services = null;
		Translator translator = null;
		for (int i = 0; i < 19; i++) {
			translator = new Translator();
			translator.setId(i);
			translator.setAddress(new Address(i, "country-test" + i, "county-test" + i, "city-test" + i,
					"street-test" + i, "street-nr-test" + i, ""));
			translator.setAuthorizationNumber("test" + i);
			translator.setName("test" + i);
			translator.setPhoneNumber("test" + i);
			translator.setTimetable(new Timetable(i, "monday-schedule" + i, "tuesday-schedule" + i,
					"wednesday-schedule" + i, "thursday-schedule" + i, "friday-schedule" + i, "saturday-schedule" + i,
					"sunday-schedule" + i));
			translator.setLanguages(Arrays.asList("English", "German"));

			services = new ArrayList<>();
			Service service = null;
			for (int j = 0; j < 24; j++) {
				service = new Service(0, "Service Test" + j, "Description Test " + j, new ArrayList<>());
				services.add(service);
			}
			translator.setServices(services);
			translators.add(translator);
		}
		return translators;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllServices")
	public List<Service> getAllServices() {
		List<Service> services = new ArrayList<>();
		List<Document> documents = null;
		Service service = null;
		for (int i = 0; i < 19; i++) {
			service = new Service();
			service.setId(i);
			service.setType("Type" + i);
			service.setDescription("Description" + i);

			documents = new ArrayList<>();
			Document document = null;
			for (int j = 0; j < 4; j++) {
				document = new Document(j, "Type" + j, "Format" + j, "Template server link " + j, 12.0);
				documents.add(document);
			}
			service.setDocuments(documents);

			services.add(service);
		}
		return services;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllDocumentsByServiceId")
	public List<Document> getAllDocumentsByServiceId(@RequestParam("serviceId") Integer serviceId) {
		List<Document> documents = new ArrayList<>();
		Document document = null;
		for (int i = 0; i < 4; i++) {
			document = new Document(i, "Type" + i, "Format" + i, "Template server link " + i, 12.0);
			documents.add(document);
		}
		return documents;
	}
}
