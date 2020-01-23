package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import com.faculty.wade.notisbackend.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Translator;

@RestController
@RequestMapping("/services")
public class ServiceController {
	@Autowired
	private ServiceService serviceService;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForEntityTypeAndEntityId")
	public List<Service> getAllServicesForEntityTypeAndEntityId(@RequestParam("entityType") String entityType,
			@RequestParam("entityId") Integer entityId) {
		if (entityType.toLowerCase().equals("notary")) {
			return serviceService.getServicesForNotary(entityId);

		} else if (entityType.toLowerCase().equals("translator")) {
			return serviceService.getServicesForTranslator(entityId);
		} else {
			return null;
		}
	}

	// TODO : implement on real
	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllTypesForEntityType")
	public List<String> getAllServiceTypesForEntityType(@RequestParam("entityType") String entityType) {
		List<String> types = new ArrayList<>();
		if (entityType.toLowerCase().equals("notary")) {
			for (Notary notary : TemporaryData.notaries) {
				List<Service> services = notary.getServices();
				if (services != null) {
					for (Service service : services) {
						types.add(service.getType());
					}
				}
			}
			return types;
		} else if (entityType.toLowerCase().equals("translator")) {
			for (Translator translator : TemporaryData.translators) {
				List<Service> services = translator.getServices();
				if (services != null) {
					for (Service service : services) {
						types.add(service.getType());
					}
				}
			}
			return types;
		} else {
			return null;
		}
	}
}
