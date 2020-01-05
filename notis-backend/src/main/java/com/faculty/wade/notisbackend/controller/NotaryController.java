package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;

@RestController
@RequestMapping("/notaries")
public class NotaryController {

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAll")
	public List<Notary> getAllNotaries() {
		return TemporaryData.notaries;
	}

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAllForAddressId")
	public List<Notary> getAllNotariesForAddressId(@RequestParam("addressId") Integer addressId) {
		List<Notary> notaries = new ArrayList<>();
		for (Notary notary : TemporaryData.notaries) {
			if (notary.getAddress().getId().equals(addressId)) {
				notaries.add(notary);
			}
		}
		return notaries;
	}
}
