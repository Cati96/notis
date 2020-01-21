package com.faculty.wade.notisbackend.queryes;

import com.faculty.wade.notisbackend.DTO.NotaryDTO;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.*;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;

import javax.xml.transform.Result;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;

public class SparkQLQuery {


    public static List<Notary> getAllNotaries(){
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?address WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/notary%20public\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:firstName> ?firstName ." +
                " ?person <ns1:lastName> ?lastName ." +
                " ?person <ns1:authorizationNumber> ?authorizationNumber ." +
                " ?person <ns1:phone> ?phone ." +
                " ?person <ns1:address> ?address ." +
                " ?person <ns1:schedule> ?schedule ." +
                " ?person <ns1:services> ?services ." +
                " ?address <ns1:county> ?county ." +
                " ?address <ns1:city> ?city ." +
                " ?address <ns1:street> ?street ." +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            Integer id = (Integer) soln.getLiteral("id").getValue();
            String firstName = (String) soln.getLiteral("firstName").getValue();
            String lastName = (String) soln.getLiteral("lastName").getValue();
            Integer authorizationNumber = (Integer) soln.getLiteral("authorizationNumber").getValue();
            String phone = (String) soln.getLiteral("phone").getValue();
            Resource address = soln.getResource("address");
            String scheduleLiteral = (String) soln.getLiteral("schedule").getValue();
            String servicesLiteral = (String) soln.getLiteral("services").getValue();
            String county = (String) soln.getLiteral("county").getValue();
            String city = (String) soln.getLiteral("city").getValue();
            String street = (String) soln.getLiteral("street").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            Address addressOnj = new Address("Romania",county, city,null,street,null,null,null);

            Notary notary = new Notary(id, firstName +" "+ lastName,""+authorizationNumber,phone,addressOnj,schedule,services);
            notaries.add(notary);
        }
        qexec.close();
        return notaries;
    }

    public static ResultSet returnAllByPhoneNumberAndAuthorisation(NotaryDTO notaryDTO){
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
//     TO DO FIX QUERY
        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                "SELECT  ?authorizationNumber ?phone WHERE { " +
                " ?type rdfs:subClassOf ns1:Person ."+
                " ?person rdf:type ?type ."+
                " ?person ns1:authorizationNumber ?authorizationNumber ." +
                " ?person ns1:phone ?phone ." +
                " FILTER (?phone = "+notaryDTO.getPhoneNumber()+" || ?authorizationNumber ="+notaryDTO.getAuthorizationNumber()+" ) "+
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        qexec.close();
        return results;

    }

    public static List<Translator> getAllTranslators(){
        Model model = ModelFactory.createDefaultModel();
        List<Translator> translators = new LinkedList<>();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?languages WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/translator\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:firstName> ?firstName ." +
                " ?person <ns1:lastName> ?lastName ." +
                " ?person <ns1:authorizationNumber> ?authorizationNumber ." +
                " ?person <ns1:phone> ?phone ." +
                " ?person <ns1:address> ?address ." +
                " ?person <ns1:schedule> ?schedule ." +
                " ?person <ns1:services> ?services ." +
                " ?person <ns1:languages> ?languages ." +
                " ?address <ns1:county> ?county ." +
                " ?address <ns1:city> ?city ." +
                " ?address <ns1:street> ?street ." +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        while (results.hasNext()) {
            QuerySolution soln = results.nextSolution();
            Integer id = (Integer) soln.getLiteral("id").getValue();
            String firstName = (String) soln.getLiteral("firstName").getValue();
            String lastName = (String) soln.getLiteral("lastName").getValue();
            Integer authorizationNumber = (Integer) soln.getLiteral("authorizationNumber").getValue();
            String phone = (String) soln.getLiteral("phone").getValue();
            String scheduleLiteral = (String) soln.getLiteral("schedule").getValue();
            String servicesLiteral = (String) soln.getLiteral("services").getValue();
            String county = (String) soln.getLiteral("county").getValue();
            String city = (String) soln.getLiteral("city").getValue();
            String street = (String) soln.getLiteral("street").getValue();
            String languagesLiteral = (String) soln.getLiteral("languages").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            List<String> languages = LiteralConvertor.convertFromStringToLanguages(languagesLiteral);
            List<com.faculty.wade.notisbackend.model.Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            Address addressOnj = new Address("Romania",county, city,null,street,null,null,null);

            Translator translator = new Translator(id, firstName +" "+ lastName,""+authorizationNumber,phone,addressOnj,schedule,services, languages);
            translators.add(translator);
        }
        qexec.close();
        return translators;
    }

    public static List<Service> getServicesForNotaryWithId(Integer id){
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/notary%20public\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:services> ?services ." +
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

    public static List<Service> getServicesForTranslatorWithId(Integer id){
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/translator\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:services> ?services ." +
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
