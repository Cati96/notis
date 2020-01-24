package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.faculty.wade.notisbackend.model.Translator;
import com.faculty.wade.notisbackend.service.TranslatorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/translators")
public class TranslatorController {
	@Autowired
	private TranslatorService translatorService;

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAll")
	public List<Translator> getAllTranslators() {
		return translatorService.getAll();
	}

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

	@PostMapping
	public ResponseEntity<?> add(@RequestBody EntityDTO entityDTO) {
		if (entityDTO.getPhoneNumber().length() != 10)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid phone number");
		Translator translator = translatorService.add(entityDTO);
		if (translator == null)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Something went wrong");

		return ResponseEntity.ok(translator);
	}

	@DeleteMapping(value = "{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		Translator translator = translatorService.get(id);
		if (translator == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notary with id " + id + " was not found");
		boolean isDeleted = translatorService.delete(translator);
		if (!isDeleted)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
		return ResponseEntity.ok(translator);
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Translator translator) {
		if (translator == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Notary was not found");
		boolean isDeleted = translatorService.delete(translator);
		if (!isDeleted)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
		translatorService.add(translator);
		return ResponseEntity.ok(translator);
	}
}
