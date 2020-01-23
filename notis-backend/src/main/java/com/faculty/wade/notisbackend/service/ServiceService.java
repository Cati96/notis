package com.faculty.wade.notisbackend.service;

import java.util.List;

import com.faculty.wade.notisbackend.model.Service;
import com.faculty.wade.notisbackend.queryes.SparkQLQuery;

@org.springframework.stereotype.Service
public class ServiceService {

    public ServiceService() {

    }

    public List<Service> getServicesForNotary(Integer id) {
        return SparkQLQuery.getServicesForNotaryWithId(id);
    }

    public List<Service> getServicesForTranslator(Integer id) {
        return SparkQLQuery.getServicesForTranslatorWithId(id);
    }

}
