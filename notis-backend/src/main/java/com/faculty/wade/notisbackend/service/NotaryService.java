package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.model.Address;
import com.faculty.wade.notisbackend.model.Notary;
import com.faculty.wade.notisbackend.model.Timetable;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;

@Service
public class NotaryService {

    public NotaryService() {

    }

    public Notary findById(Integer id) {
        return null;
    }

    public List<Notary> getAll() {
        List<Notary> notaries = new LinkedList<>();
        Model model = ModelFactory.createDefaultModel();
        try {
            model.read(new FileInputStream("./rdf/output.txt"), null, "TTL");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

        String queryString = "PREFIX ns1: <http://xmlns.com/foaf/0.1/> " +
                "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " +
                "SELECT ?id ?person ?firstName ?lastName ?authorizationNumber ?phone ?schedule ?services ?county ?city ?street WHERE { " +
                " ?person rdf:type <https://www.merriam-webster.com/dictionary/notary%20public> ." +
                " ?person ns1:id ?id ." +
                " ?person ns1:firstName ?firstName ." +
                " ?person ns1:lastName ?lastName ." +
                " ?person ns1:authorizationNumber ?authorizationNumber ." +
                " ?person ns1:phone ?phone ." +
                " ?person ns1:address ?address ." +
                " ?person ns1:schedule ?schedule ." +
                " ?person ns1:services ?services ." +
                " ?address ns1:county ?county ." +
                " ?address ns1:city ?city ." +
                " ?address ns1:street ?street ." +
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
            List<com.faculty.wade.notisbackend.model.Service> services = LiteralConvertor.convertFromStringToServices(servicesLiteral);
            Address addressOnj = new Address("Romania",county, city,null,street,null,null,null);

            Notary notary = new Notary(id, firstName +" "+ lastName,""+authorizationNumber,phone,addressOnj,schedule,services);
            notaries.add(notary);
        }
        qexec.close();
        return notaries;
    }
}
