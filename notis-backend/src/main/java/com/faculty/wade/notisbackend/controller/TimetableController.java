package com.faculty.wade.notisbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.model.Translator;
import com.faculty.wade.notisbackend.service.NotaryService;
import com.faculty.wade.notisbackend.service.TranslatorService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/timetables")
public class TimetableController {
	@Autowired
	private NotaryService notaryService;
	@Autowired
	private TranslatorService translatorService;

	@PutMapping
	public ResponseEntity<?> update(@RequestBody Timetable timetable) {
		Integer entityId = timetable.getId();

		if (entityId < 0) {
			Translator translator = translatorService.get(Math.abs(entityId));
			boolean isDeleted = translatorService.delete(translator);
			if (!isDeleted)
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
			translator.setTimetable(timetable);
			translatorService.add(translator);
		} else {
			Notary notary = notaryService.get(entityId);
			boolean isDeleted = notaryService.delete(notary);
			if (!isDeleted)
				return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Something went wrong");
			notary.setTimetable(timetable);
			notaryService.add(notary);
		}
		return ResponseEntity.ok(timetable);
	}
}
