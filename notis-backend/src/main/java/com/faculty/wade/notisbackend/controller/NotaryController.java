package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.service.NotaryService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/notaries")
public class NotaryController {
	@Autowired
	private NotaryService notaryService;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAll")
	public List<Notary> getAllNotaries() {
		return notaryService.getAll();
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

	@PostMapping
	public ResponseEntity<?> add(@RequestBody EntityDTO entityDTO) {
		if (entityDTO.getPhoneNumber().length() != 10)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone number");
		Notary notary = notaryService.add(entityDTO);
		if (notary == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");

		return ResponseEntity.ok(notary);
	}

	@DeleteMapping(value = "{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		Notary notary = notaryService.get(id);
		if (notary == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notary with id " + id + " was not found");
		boolean isDeleted = notaryService.delete(notary);
		if (!isDeleted)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
		return ResponseEntity.ok(notary);
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Notary notary) {
		if (notary == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notary was not found");
		boolean isDeleted = notaryService.delete(notary);
		if (!isDeleted)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
		notaryService.add(notary);
		return ResponseEntity.ok(notary);
	}

	// TO DO: implement on real
	@CrossOrigin(origins = "*")
	@PostMapping(value = "/getAllForSelectedServicesOffered")
	public Map<String, Notary> getAllNotariesForSelectedServicesOffered(@RequestBody List<String> servicesOffered) {
		Map<String, Notary> notariesAndMatchedServicesNumber = new HashMap<>();
		for (Notary notary : TemporaryData.notaries) {
			int matchedServicesNumber = 0;
			List<Service> notaryServices = notary.getServices();
			for (Service service : notaryServices) {
				if (servicesOffered.contains(service.getType())) {
					matchedServicesNumber++;
				}
			}
			if (matchedServicesNumber > 0) {
				notariesAndMatchedServicesNumber.put(notary.getId() + "<-->" + matchedServicesNumber, notary);
			}
		}
		return notariesAndMatchedServicesNumber;
	}
}
