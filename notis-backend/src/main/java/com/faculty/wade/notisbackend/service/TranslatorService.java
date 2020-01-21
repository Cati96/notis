package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.model.Translator;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Service;

import javax.xml.transform.Result;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;

@Service
public class TranslatorService {

    public List<Translator> getAll() {
        return SparkQLQuery.getAllTranslators();
    }
}
