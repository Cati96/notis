package com.faculty.wade.notisbackend.queryes;

import com.faculty.wade.notisbackend.DTO.EntityDTO;
import com.faculty.wade.notisbackend.configuration.Global;
import com.faculty.wade.notisbackend.helper.EntityCreator;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.helper.RandomGenerator;
import com.faculty.wade.notisbackend.model.*;
import com.github.jsonldjava.utils.JsonUtils;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.w3c.dom.ls.LSOutput;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class SparkQLQuery {


    public static List<Notary> getAllNotaries() {
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?address ?country ?zipCode ?streetNr ?others ?locality ?documents WHERE { " +
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
                " ?address <ns1:country> ?country ." +
                " ?address <ns1:zipCode> ?zipCode ." +
                " ?address <ns1:streetNr> ?streetNr ." +
                " ?address <ns1:others> ?others ." +
                " ?address <ns1:locality> ?locality ." +
                " ?person <ns1:documents> ?documents ." +
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
            String country = (String) soln.getLiteral("country").getValue();
            String zipCode = (String) soln.getLiteral("zipCode").getValue();
            String streetNr = (String) soln.getLiteral("streetNr").getValue();
            String others = (String) soln.getLiteral("others").getValue();
            String locality = (String) soln.getLiteral("locality").getValue();
            String documentsLiteral = (String) soln.getLiteral("documents").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            Map<Integer, List<Document>> serviceIdToDocumentList = LiteralConvertor.convertFromDocumentsStringToMap(documentsLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            for (Service service : services) {
                service.setDocuments(serviceIdToDocumentList.get(service.getId()));
            }
            Address addressOnj = new Address(country, county, city, locality, street, streetNr, zipCode, others);

            Notary notary = new Notary(id, firstName + " " + lastName, "" + authorizationNumber, phone, addressOnj, schedule, services);
            notaries.add(notary);
        }
        qexec.close();
        return notaries;
    }

    public static List<Notary> getAllNotaries(String vcountry, String vcounty, String vcity) {
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/rdf.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?address ?country ?zipCode ?streetNr ?others ?documents WHERE { " +
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
                " ?address <ns1:country> ?country ." +
                " ?address <ns1:zipCode> ?zipCode ." +
                " ?address <ns1:streetNr> ?streetNr ." +
                " ?address <ns1:others> ?others ." +
                " ?person <ns1:documents> ?documents ." +
                " FILTER (?country = " + vcountry + " && ?county = " + vcounty + " && ?city = " + vcity + " ) " +
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
            String country = (String) soln.getLiteral("country").getValue();
            String zipCode = (String) soln.getLiteral("zipCode").getValue();
            String streetNr = (String) soln.getLiteral("streetNr").getValue();
            String others = (String) soln.getLiteral("others").getValue();
            String documentsLiteral = (String) soln.getLiteral("documents").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            Map<Integer, List<Document>> serviceIdToDocumentList = LiteralConvertor.convertFromDocumentsStringToMap(documentsLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            for (Service service : services) {
                service.setDocuments(serviceIdToDocumentList.get(service.getId()));
            }
            Address addressOnj = new Address(country, county, city, null, street, streetNr, zipCode, others);

            Notary notary = new Notary(id, firstName + " " + lastName, "" + authorizationNumber, phone, addressOnj, schedule, services);
            notaries.add(notary);
        }
        qexec.close();
        return notaries;
    }


    public static ResultSet returnAllByPhoneNumberAndAuthorisation(EntityDTO entityDTO) {
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
                " ?type rdfs:subClassOf ns1:Person ." +
                " ?person rdf:type ?type ." +
                " ?person ns1:authorizationNumber ?authorizationNumber ." +
                " ?person ns1:phone ?phone ." +
                " FILTER (?phone = " + entityDTO.getPhoneNumber() + " || ?authorizationNumber =" + entityDTO.getAuthorizationNumber() + " ) " +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        qexec.close();
        return results;

    }

    public static List<Translator> getAllTranslators() {
        Model model = ModelFactory.createDefaultModel();
        List<Translator> translators = new LinkedList<>();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?languages ?country ?zipCode ?streetNr ?others ?locality ?documents WHERE { " +
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
                " ?address <ns1:country> ?country ." +
                " ?address <ns1:zipCode> ?zipCode ." +
                " ?address <ns1:streetNr> ?streetNr ." +
                " ?address <ns1:others> ?others ." +
                " ?address <ns1:locality> ?locality ." +
                " ?person <ns1:documents> ?documents ." +
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

            String country = (String) soln.getLiteral("country").getValue();
            String zipCode = (String) soln.getLiteral("zipCode").getValue();
            String streetNr = (String) soln.getLiteral("streetNr").getValue();
            String others = (String) soln.getLiteral("others").getValue();
            String locality = (String) soln.getLiteral("locality").getValue();
            String documentsLiteral = (String) soln.getLiteral("documents").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            List<String> languages = LiteralConvertor.convertFromStringToLanguages(languagesLiteral);
            Map<Integer, List<Document>> serviceIdToDocumentList = LiteralConvertor.convertFromDocumentsStringToMap(documentsLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            for (Service service : services) {
                service.setDocuments(serviceIdToDocumentList.get(service.getId()));
            }
            Address addressOnj = new Address(country, county, city, locality, street, streetNr, zipCode, others);

            Translator translator = new Translator(id, firstName + " " + lastName, "" + authorizationNumber, phone, addressOnj, schedule, services, languages);
            translators.add(translator);
        }
        qexec.close();
        return translators;
    }

    public static List<Service> getServicesForNotaryWithId(Integer id) {
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/notary%20public\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:services> ?services ." +
                " FILTER (?id = " + id + " ) " +
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

    public static List<Service> getServicesForTranslatorWithId(Integer id) {
        List<com.faculty.wade.notisbackend.model.Service> services = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT  ?services WHERE { " +
                " ?person rdf:type \"https://www.merriam-webster.com/dictionary/translator\" ." +
                " ?person <ns1:id> ?id ." +
                " ?person <ns1:services> ?services ." +
                " FILTER (?id = " + id + " ) " +
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

    public static Integer addDefaultEntity(EntityDTO entityDTO, boolean isTranslator) {
        Model model = ModelFactory.createDefaultModel();
        EntityObject entityObject = EntityCreator.createEntityToBeStored(entityDTO, isTranslator);

        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
//     TO DO FIX QUERY
        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                "SELECT  ?authorizationNumber ?phone WHERE { " +
                " ?type rdfs:subClassOf ns1:Person ." +
                " ?person rdf:type ?type ." +
                " ?person ns1:authorizationNumber ?authorizationNumber ." +
                " ?person ns1:phone ?phone ." +
                " FILTER (?phone = " + entityDTO.getPhoneNumber() + " || ?authorizationNumber =" + entityDTO.getAuthorizationNumber() + " ) " +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        if (results.hasNext()) {
            qexec.close();
            return null;
        }
        qexec.close();
        addDefaultEntity(model, isTranslator, entityObject);


        return entityObject.getId();
    }

    public static Integer addEntity(EntityObject entityObject, boolean isTranslator) {
        Model model = ModelFactory.createDefaultModel();

        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
//     TO DO FIX QUERY
        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
                "SELECT  ?authorizationNumber ?phone WHERE { " +
                " ?type rdfs:subClassOf ns1:Person ." +
                " ?person rdf:type ?type ." +
                " ?person ns1:authorizationNumber ?authorizationNumber ." +
                " ?person ns1:phone ?phone ." +
                " FILTER (?phone = " + entityObject.getPhoneNumber() + " || ?authorizationNumber =" + entityObject.getAuthorizationNumber() + " ) " +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        if (results.hasNext()) {
            qexec.close();
            return null;
        }
        qexec.close();
        addDefaultEntity(model, isTranslator, entityObject);


        return entityObject.getId();
    }

    private static void addDefaultEntity(Model model, boolean isTranslator, EntityObject entityObject) {
        // create the resource
        String[] name = entityObject.getName().toUpperCase().split(" ");
        String lastName = name[name.length - 1];
        String firstName = "";
        for (int i = 0; i < name.length - 1; i++)
            firstName = firstName + " " + name[i];
        firstName = firstName.replace(" ", "");

        Resource notary = model.createResource("http://example.org/people/" + entityObject.getName().replace(" ", "_").toUpperCase());

        Property firstNameProperty = ResourceFactory.createProperty("ns1:", "firstName");
        Property lastNameProperty = ResourceFactory.createProperty("ns1:", "lastName");
        Property phoneProperty = ResourceFactory.createProperty("ns1:", "phone");
        Property idProperty = ResourceFactory.createProperty("ns1:", "id");
        Property authorizationNumberProperty = ResourceFactory.createProperty("ns1:", "authorizationNumber");
        Property scheduleProperty = ResourceFactory.createProperty("ns1:", "schedule");
        Property servicesProperty = ResourceFactory.createProperty("ns1:", "services");
        Property countyProperty = ResourceFactory.createProperty("ns1:", "county");
        Property cityProperty = ResourceFactory.createProperty("ns1:", "city");
        Property streetProperty = ResourceFactory.createProperty("ns1:", "street");
        Property countryProperty = ResourceFactory.createProperty("ns1:", "country");
        Property localityProperty = ResourceFactory.createProperty("ns1:", "locality");
        Property zipCodeProperty = ResourceFactory.createProperty("ns1:", "zipCode");
        Property othersProperty = ResourceFactory.createProperty("ns1:", "others");
        Property streetNumberProperty = ResourceFactory.createProperty("ns1:", "streetNr");
        Property addressProperty = ResourceFactory.createProperty("ns1:", "address");
        Property languagesProperty = ResourceFactory.createProperty("ns1:", "languages");
        Property documentsProperty = ResourceFactory.createProperty("ns1:", "documents");
        Resource addressResource = model.createResource();

        Literal firstNameLiteral = ResourceFactory.createStringLiteral(firstName);
        Literal lastNameLiteral = ResourceFactory.createStringLiteral(lastName);
        Literal phoneLiteral = ResourceFactory.createStringLiteral(entityObject.getPhoneNumber());
        Literal idLiteral = ResourceFactory.createTypedLiteral(entityObject.getId());

        Literal authorizationNumberLiteral = ResourceFactory.createTypedLiteral(entityObject.getAuthorizationNumber());
        Literal scheduleLiteral = ResourceFactory.createStringLiteral(entityObject.getTimetable());
        Literal servicesLiteral = ResourceFactory.createStringLiteral(entityObject.getServices());
        Literal countyLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getCounty());
        Literal cityLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getCity());
        Literal streetLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getStreet());
        Literal localityLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getLocality());
        Literal languagesLiteral = ResourceFactory.createStringLiteral(entityObject.getLanguages());
        Literal countryLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getCountry());
        Literal zipCodeLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getZipCode());
        Literal othersLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getOthers());
        Literal streetNumberLiteral = ResourceFactory.createStringLiteral(entityObject.getAddress().getStreetNumber());
        Literal documentsLiteral = ResourceFactory.createStringLiteral(entityObject.getDocuments());

        addressResource.addLiteral(countyProperty, countyLiteral);
        addressResource.addLiteral(cityProperty, cityLiteral);
        addressResource.addLiteral(streetProperty, streetLiteral);
        addressResource.addLiteral(countryProperty, countryLiteral);
        addressResource.addLiteral(zipCodeProperty, zipCodeLiteral);
        addressResource.addLiteral(othersProperty, othersLiteral);
        addressResource.addLiteral(streetNumberProperty, streetNumberLiteral);
        addressResource.addLiteral(localityProperty, localityLiteral);

        notary.addLiteral(firstNameProperty, firstNameLiteral);
        notary.addLiteral(lastNameProperty, lastNameLiteral);
        notary.addLiteral(phoneProperty, phoneLiteral);
        notary.addLiteral(idProperty, idLiteral);
        notary.addLiteral(authorizationNumberProperty, authorizationNumberLiteral);
        notary.addLiteral(scheduleProperty, scheduleLiteral);
        notary.addLiteral(servicesProperty, servicesLiteral);
        notary.addLiteral(documentsProperty, documentsLiteral);
        notary.addProperty(addressProperty, addressResource);
        if (isTranslator)
            notary.addProperty(languagesProperty, languagesLiteral);

        model.add(notary, RDF.type, entityObject.getEntityType());

        try {
            model.write(new FileOutputStream(Global.RDF_FILE_PATH), "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }


    public static Notary getNotary(Integer notaryId) {
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?address ?country ?zipCode ?streetNr ?others ?locality ?documents WHERE { " +
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
                " ?address <ns1:country> ?country ." +
                " ?address <ns1:zipCode> ?zipCode ." +
                " ?address <ns1:streetNr> ?streetNr ." +
                " ?address <ns1:others> ?others ." +
                " ?address <ns1:locality> ?locality ." +
                " ?person <ns1:documents> ?documents ." +
                " FILTER (?id = " + notaryId + " ) " +
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
            String country = (String) soln.getLiteral("country").getValue();
            String zipCode = (String) soln.getLiteral("zipCode").getValue();
            String streetNr = (String) soln.getLiteral("streetNr").getValue();
            String others = (String) soln.getLiteral("others").getValue();
            String locality = (String) soln.getLiteral("locality").getValue();
            String documentsLiteral = (String) soln.getLiteral("documents").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            Map<Integer, List<Document>> serviceIdToDocumentList = LiteralConvertor.convertFromDocumentsStringToMap(documentsLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            for (Service service : services) {
                service.setDocuments(serviceIdToDocumentList.get(service.getId()));
            }
            Address addressOnj = new Address(country, county, city, locality, street, streetNr, zipCode, others);

            Notary notary = new Notary(id, firstName + " " + lastName, "" + authorizationNumber, phone, addressOnj, schedule, services);
            qexec.close();
            return notary;
        }
        return null;
    }

    public static Translator getTranslator(Integer translatorId) {
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street ?languages ?country ?zipCode ?streetNr ?others ?locality ?documents WHERE { " +
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
                " ?address <ns1:country> ?country ." +
                " ?address <ns1:zipCode> ?zipCode ." +
                " ?address <ns1:streetNr> ?streetNr ." +
                " ?address <ns1:others> ?others ." +
                " ?address <ns1:locality> ?locality ." +
                " ?person <ns1:documents> ?documents ." +
                " FILTER (?id = " + translatorId + " ) " +
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

            String country = (String) soln.getLiteral("country").getValue();
            String zipCode = (String) soln.getLiteral("zipCode").getValue();
            String streetNr = (String) soln.getLiteral("streetNr").getValue();
            String others = (String) soln.getLiteral("others").getValue();
            String locality = (String) soln.getLiteral("locality").getValue();
            String documentsLiteral = (String) soln.getLiteral("documents").getValue();
            Timetable schedule = LiteralConvertor.convertFromStringToTimetable(scheduleLiteral);
            List<String> languages = LiteralConvertor.convertFromStringToLanguages(languagesLiteral);
            Map<Integer, List<Document>> serviceIdToDocumentList = LiteralConvertor.convertFromDocumentsStringToMap(documentsLiteral);
            List<Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            for (Service service : services) {
                service.setDocuments(serviceIdToDocumentList.get(service.getId()));
            }
            Address addressOnj = new Address(country, county, city, locality, street, streetNr, zipCode, others);

            Translator translator = new Translator(id, firstName + " " + lastName, "" + authorizationNumber, phone, addressOnj, schedule, services, languages);
            qexec.close();
            return translator;
        }
        return null;
    }

    public static boolean deleteEntity(String identification) {
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream(Global.RDF_FILE_PATH), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        Resource resource = model.getResource("http://example.org/people/" + identification);

        model.removeAll(resource, null, (RDFNode) null);

        try {
            model.write(new FileOutputStream(Global.RDF_FILE_PATH), "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
        return true;
    }

}