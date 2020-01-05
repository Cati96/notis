package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Translator;

@RestController
@RequestMapping("/addresses")
public class AddressController {

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
}
