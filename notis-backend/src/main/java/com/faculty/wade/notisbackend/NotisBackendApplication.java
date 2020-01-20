package com.faculty.wade.notisbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.faculty.wade.notisbackend.configuration.TemporaryData;
import com.faculty.wade.notisbackend.model.Notary;

@SpringBootApplication
public class NotisBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotisBackendApplication.class, args);
	}

}
