package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import com.faculty.wade.notisbackend.service.NotaryService;
import com.faculty.wade.notisbackend.service.TranslatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Translator;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/addresses")
public class AddressController {
	@Autowired
	private NotaryService notaryService;
	@Autowired
	private TranslatorService translatorService;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForEntityType")
	public List<Address> getAllAddressesForEntityType(@RequestParam("entityType") String entityType) {
		List<Address> addresses = null;
		if (entityType.toLowerCase().equals("notary")) {
			addresses = new ArrayList<>();
			for (Notary notary : TemporaryData.notaries) {
				addresses.add(notary.getAddress());
			}

		} else if (entityType.toLowerCase().equals("translator")) {
			addresses = new ArrayList<>();
			for (Translator translator : TemporaryData.translators) {
				addresses.add(translator.getAddress());
			}
		}
		return addresses;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForEntityTypeAndCustomLocation")
	public List<Address> getAllAddressesForEntityTypeAndCustomLocation(@RequestParam("entityType") String entityType,
			@RequestParam("city") String city, @RequestParam("locality") String locality) {
		List<Address> addresses = null;
		if (entityType.toLowerCase().equals("notary")) {
			addresses = new ArrayList<>();
			for (Notary notary : TemporaryData.notaries) {
				Address address = notary.getAddress();
				if (address.getCity().equals(city) && address.getLocality().equals(locality)) {
					addresses.add(address);
				}
			}

		} else if (entityType.toLowerCase().equals("translator")) {
			addresses = new ArrayList<>();
			for (Translator translator : TemporaryData.translators) {
				Address address = translator.getAddress();
				if (address.getCity().equals(city) && address.getLocality().equals(locality)) {
					addresses.add(address);
				}
			}
		}
		return addresses;
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Address address) {
		Integer entityId = address.getId();

		if (entityId < 0) {
			Translator translator = translatorService.get(Math.abs(entityId));
			boolean isDeleted = translatorService.delete(translator);
			if (!isDeleted)
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
			translator.setAddress(address);
			translatorService.add(translator);
		} else {
			Notary notary = notaryService.get(entityId);
			boolean isDeleted = notaryService.delete(notary);
			if (!isDeleted)
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
			notary.setAddress(address);
			notaryService.add(notary);
		}
		return ResponseEntity.ok(address);
	}
}
