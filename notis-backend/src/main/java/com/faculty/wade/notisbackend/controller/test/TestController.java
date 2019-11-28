package com.faculty.wade.notisbackend.controller.test;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

	@CrossOrigin(origins = "*")
	@GetMapping(value = "/test")
	public String findAppointmentById() {
		return "Test. It works!";
	}
}
