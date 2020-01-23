package com.faculty.wade.notisbackend.service;

import com.faculty.wade.notisbackend.DTO.ServiceDTO;
import com.faculty.wade.notisbackend.helper.LiteralConvertor;
import com.faculty.wade.notisbackend.helper.RandomGenerator;
import com.faculty.wade.notisbackend.model.*;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;
import org.apache.jena.query.*;
import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.apache.jena.rdf.model.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    private NotaryService notaryService;
    @Autowired
    private TranslatorService translatorService;

    public List<Service> getServicesForNotary(Integer id) {
        return SparkQLQuery.getServicesForNotaryWithId(id);
    }

    public List<Service> getServicesForTranslator(Integer id) {
        return SparkQLQuery.getServicesForTranslatorWithId(id);
    }

    public Service add(ServiceDTO serviceDTO) {
        Integer idOfService = RandomGenerator.getRandomNumberInRange(10, Integer.MAX_VALUE);
        Service service = new Service(idOfService, serviceDTO.getType(), serviceDTO.getDescription(), null);
        Integer entityId = serviceDTO.getEntityId();
        if (entityId < 0) {
            Translator translator = translatorService.get(Math.abs(entityId));
            boolean isDeleted = translatorService.delete(translator);
            List<Service> services = translator.getServices();
            services.add(service);
            translator.setServices(services);
            translatorService.add(translator);
        } else {
            Notary notary = notaryService.get(entityId);
            boolean isDeleted = notaryService.delete(notary);
            List<Service> services = notary.getServices();
            services.add(service);
            notary.setServices(services);
            notaryService.add(notary);
        }
        return service;
    }

    public Service update(ServiceDTO serviceDTO) {
        Integer entityId = serviceDTO.getEntityId();
        Service service;
        if (entityId < 0) {
            Translator translator = translatorService.get(Math.abs(entityId));
            boolean isDeleted = translatorService.delete(translator);
            List<Service> services = translator.getServices();
            Optional<Service> serviceOptional = services.stream().filter(serv -> serv.getId() == serviceDTO.getId()).findFirst();
            if (!serviceOptional.isPresent())
                return null;
            service = serviceOptional.get();
            service.setType(serviceDTO.getType());
            service.setDescription(serviceDTO.getDescription());
            translator.setServices(services);
            translatorService.add(translator);
        } else {
            Notary notary = notaryService.get(entityId);
            boolean isDeleted = notaryService.delete(notary);
            List<Service> services = notary.getServices();
            Optional<Service> serviceOptional = services.stream().filter(serv -> serv.getId() == serviceDTO.getId()).findFirst();
            if (!serviceOptional.isPresent())
                return null;
            service = serviceOptional.get();
            service.setType(serviceDTO.getType());
            service.setDescription(serviceDTO.getDescription());
            notary.setServices(services);
            notaryService.add(notary);
        }
        return service;
    }

    public boolean delete(Integer serviceId, Integer entityId) {

        Service service;
        if (entityId < 0) {
            Translator translator = translatorService.get(Math.abs(entityId));
            boolean isDeleted = translatorService.delete(translator);
            List<Service> services = translator.getServices();
            services.removeIf(serv -> serv.getId() == serviceId);
            translator.setServices(services);
            translatorService.add(translator);
        } else {
            Notary notary = notaryService.get(entityId);
            boolean isDeleted = notaryService.delete(notary);
            List<Service> services = notary.getServices();
            services.removeIf(serv -> serv.getId() == serviceId);
            notary.setServices(services);
            notaryService.add(notary);
        }
        return true;
    }

}
