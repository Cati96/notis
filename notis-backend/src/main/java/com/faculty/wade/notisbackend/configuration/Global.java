package com.faculty.wade.notisbackend.configuration;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

@Configuration
public class Global {

	public static String RDF_FILE_PATH = null;

	static {
		org.springframework.core.io.Resource r = new ClassPathResource("rdf.txt");
		InputStream is = null;
		try {
			is = r.getInputStream();
			File file = r.getFile();
			RDF_FILE_PATH = file.getPath();
			is.close();
			System.out.println("FULL PATH FOR RDF FILE: " + RDF_FILE_PATH);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
