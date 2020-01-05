package com.faculty.wade.notisbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Translator;

@RestController
@RequestMapping("/translators")
public class TranslatorController {

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/getAll")
	public List<Translator> getAllTranslators() {
		return TemporaryData.translators;
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
}
