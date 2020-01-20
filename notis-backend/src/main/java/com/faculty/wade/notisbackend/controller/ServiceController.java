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
//			return new ArrayList<>();
		} else if (entityType.toLowerCase().equals("translator")) {
			for (Translator translator : TemporaryData.translators) {
				if (translator.getId().equals(entityId)) {
					return translator.getServices();
				}
			}
			return new ArrayList<>();
		} else {
			return null;
		}
	}
}
