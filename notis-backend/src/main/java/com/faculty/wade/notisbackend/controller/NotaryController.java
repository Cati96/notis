package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import com.faculty.wade.notisbackend.DTO.NotaryDTO;
import com.faculty.wade.notisbackend.service.NotaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;

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
	public ResponseEntity<?> add(@RequestBody NotaryDTO notaryDTO){
		if(notaryDTO.getPhoneNumber().length()!=10)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone number");
		Notary notary = notaryService.add(notaryDTO);
		if(notary == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");

		return ResponseEntity.ok(notary);
	}
}
