package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Document;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Translator;

@RestController
@RequestMapping("/documents")
public class DocumentController {

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForEntityTypeAndServiceId")
	public List<Document> getAllDocumentsForEntityTypeAndServiceId(@RequestParam("entityType") String entityType,
			@RequestParam("serviceId") Integer serviceId) {
		if (entityType.toLowerCase().equals("notary")) {
			for (Notary notary : TemporaryData.notaries) {
				for (Service service : notary.getServices()) {
					if (service.getId().equals(serviceId)) {
						return service.getDocuments();
					}
				}
			}
			return new ArrayList<>();
		} else if (entityType.toLowerCase().equals("translator")) {
			for (Translator translator : TemporaryData.translators) {
				for (Service service : translator.getServices()) {
					if (service.getId().equals(serviceId)) {
						return service.getDocuments();
					}
				}
			}
			return new ArrayList<>();
		} else {
			return null;
		}
	}

	// TODO: implement on real
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAll")
	public List<Translator> getAllTranslators() {
		return TemporaryData.translators;
	}

	// TODO: implement on real
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForAddressId")
	public List<Translator> getAllTranslatorsForAddressId(@RequestParam("addressId") Integer addressId) {
		List<Translator> translators = new ArrayList<>();
		for (Translator translator : TemporaryData.translators) {
			if (translator.getAddress().getId().equals(addressId)) {
				translators.add(translator);
			}
		}
		return translators;
	}
}
