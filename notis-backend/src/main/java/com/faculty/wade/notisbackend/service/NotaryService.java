package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.DTO.NotaryDTO;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.helper.RandomGenerator;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Timetable;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.*;
import org.apache.jena.vocabulary.RDF;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.List;

@Service
public class NotaryService {

    public NotaryService() {

    }

    public Notary findById(Integer id) {
        return null;
    }

    public List<Notary> getAll() {
        return SparkQLQuery.getAllNotaries();
    }

    public Notary add(NotaryDTO notaryDTO) {
        Model model = ModelFactory.createDefaultModel();
        String[] name = notaryDTO.getName().toUpperCase().split(" ");
        String lastName = name[name.length - 1];
        String firstName = "";
        for (int i = 0; i < name.length - 1; i++)
            firstName = firstName + " " + name[i];
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
                " FILTER (?phone = " + notaryDTO.getPhoneNumber() + " || ?authorizationNumber =" + notaryDTO.getAuthorizationNumber() + " ) " +
                "}";
        Query query = QueryFactory.create(queryString);
        QueryExecution qexec = QueryExecutionFactory.create(query, model);
        ResultSet results = qexec.execSelect();
        if (results.hasNext()) {
            qexec.close();
            return null;
        }
        Integer id = RandomGenerator.getRandomNumberInRange(11111, Integer.MAX_VALUE);
        // create the resource
        Resource notary = model.createResource("http://example.org/people/" + notaryDTO.getName().replace(" ", "_"));

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
        Property addressProperty = ResourceFactory.createProperty("ns1:", "address");
        Resource addressResource = model.createResource();

        Literal firstNameLiteral = ResourceFactory.createStringLiteral(firstName);
        Literal lastNameLiteral = ResourceFactory.createStringLiteral(lastName);
        Literal phoneLiteral = ResourceFactory.createStringLiteral(notaryDTO.getPhoneNumber());
        Literal idLiteral = ResourceFactory.createTypedLiteral(id);

        Literal authorizationNumberLiteral = ResourceFactory.createTypedLiteral(notaryDTO.getAuthorizationNumber());
        Literal scheduleLiteral = ResourceFactory.createStringLiteral("['10:00 - 14:00 | 15:00 - 18:00', '8:30 - 13:00 | 14:00 - 19:00', '9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None]");
        Literal servicesLiteral = ResourceFactory.createStringLiteral("[['Contract', 'https://notariat-tineretului.net/contract/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Procure', 'https://notariat-tineretului.net/procura/']]");
        Literal countyLiteral = ResourceFactory.createStringLiteral("-");
        Literal cityLiteral = ResourceFactory.createStringLiteral("-");
        Literal streetLiteral = ResourceFactory.createStringLiteral("-");
//        model.
        addressResource.addLiteral(countyProperty, countyLiteral);
        addressResource.addLiteral(cityProperty, cityLiteral);
        addressResource.addLiteral(streetProperty, streetLiteral);
//        notary.addLiteral(add)

        notary.addLiteral(firstNameProperty, firstNameLiteral);
        notary.addLiteral(lastNameProperty, lastNameLiteral);
        notary.addLiteral(phoneProperty, phoneLiteral);
        notary.addLiteral(idProperty, idLiteral);
        notary.addLiteral(authorizationNumberProperty, authorizationNumberLiteral);
        notary.addLiteral(scheduleProperty, scheduleLiteral);
        notary.addLiteral(servicesProperty, servicesLiteral);
        notary.addProperty(addressProperty, addressResource);

        model.add(notary, RDF.type, "https://www.merriam-webster.com/dictionary/notary%20public");


        try {
            model.write(new FileOutputStream("./rdf/rdf.txt"), "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
//        model.write(System.out, "TTL") ;
        qexec.close();

        return getDefaulNotary(notaryDTO, id);
    }

    private Notary getDefaulNotary(NotaryDTO notaryDTO, Integer id) {
        String schedule = "['10:00 - 14:00 | 15:00 - 18:00', '8:30 - 13:00 | 14:00 - 19:00', '9:30 - 12:00 | 13:00 - 19:00', '9:00 - 13:00 | 14:00 - 19:30', '9:00 - 13:00 | 14:00 - 19:30', '9:30 - 12:00 | 13:00 - 19:00', None]";
        String services = "[['Contract', 'https://notariat-tineretului.net/contract/'], ['Divorce', 'https://notariat-tineretului.net/divort/'], ['Succession', 'https://notariat-tineretului.net/succesiune/'], ['Marriage agreement', 'https://notariat-tineretului.net/conventie-matrimoniala/'], ['Document Legalisation', 'https://notariat-tineretului.net/legalizari/'], ['Procure', 'https://notariat-tineretului.net/procura/']]";
        Address address = new Address("-", "-", "-", "-", "-", "-", "-", "-");
        Notary notary = new Notary(id, notaryDTO.getName(), "" + notaryDTO.getAuthorizationNumber(), notaryDTO.getPhoneNumber(), address, LiteralConvertor.convertFromStringToTimetable(schedule), LiteralConvertor.convertFromStringToServices(services));
        return notary;
    }


}
