package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {
    public List<Service> getServicesForNotary(Integer id){
        return SparkQLQuery.getServicesForNotaryWithId(id);
    }
    public List<Service> getServicesForTranslator(Integer id){
        return SparkQLQuery.getServicesForTranslatorWithId(id);
    }

}
