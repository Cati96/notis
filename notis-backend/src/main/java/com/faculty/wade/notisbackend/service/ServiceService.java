package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.model.Timetable;
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
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/output.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type <https://www.merriam-webster.com/dictionary/notary%20public> ." +
                " ?person ns1:id ?id ." +
                " ?person ns1:services ?services ." +
                " FILTER (?id = "+id+" ) "+
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            String servicesLiteral = (String) soln.getLiteral("services").getValue();
            services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
        }
        qexec.close();
        return services;
    }
    public List<Service> getServicesForTranslator(Integer id){
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/output.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type <https://www.merriam-webster.com/dictionary/translator> ." +
                " ?person ns1:id ?id ." +
                " ?person ns1:services ?services ." +
                " FILTER (?id = "+id+" ) "+
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            String servicesLiteral = (String) soln.getLiteral("services").getValue();
            services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
        }
        qexec.close();
        return services;
    }

}
